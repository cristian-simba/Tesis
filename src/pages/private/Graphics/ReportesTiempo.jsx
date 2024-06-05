import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, CartesianGrid, XAxis, YAxis, Line, Tooltip } from "recharts";
import { Spinner } from '@radix-ui/themes';
import useAuth from "../../../context/useAuth";

const getReportes = (token) => {
  const url = `${import.meta.env.VITE_BACKEND_URL}/moderador/reportes`;
  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  };
  return axios.get(url, options);
};

export default function ReportesTiempo() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useAuth();
  const token = user?.cookies?.auth?.token;

  useEffect(() => {
    if (!token) {
      console.error('Token no disponible');
      setLoading(false);
      return;
    }

    getReportes(token)
      .then(response => {
        const reportes = response.data;

        // Agrupar reportes por día
        const groupedReports = reportes.reduce((acc, report) => {
          const date = new Date(report.createdAt).toISOString().split('T')[0]; // Formato YYYY-MM-DD
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        }, {});

        // Obtener los últimos 5 días
        const lastFiveDays = Array.from({ length: 5 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - i);
          return date.toISOString().split('T')[0];
        }).reverse();

        // Formatear los datos para el gráfico
        const formattedData = lastFiveDays.map(date => ({
          name: date,
          reportes: groupedReports[date] || 0
        }));

        setData(formattedData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      {loading ? (
        <Spinner />
      ) : data.length > 0 ? (
        <LineChart width={700} height={200} data={data}>
          <CartesianGrid strokeDasharray="3 2" />
          <XAxis dataKey="name" axisLine={{ stroke: '#000000' }} tick={{ fontFamily: 'Arial', fontSize: 14 }} />
          <YAxis axisLine={{ stroke: '#000000' }} tick={{ fontFamily: 'Arial', fontSize: 14 }} />
          <Tooltip />
          <Line type="monotone" dataKey="reportes" stroke="#8884d8" />
        </LineChart>
      ) : (
        <div>No hay datos disponibles</div>
      )}
    </div>
  );
}
