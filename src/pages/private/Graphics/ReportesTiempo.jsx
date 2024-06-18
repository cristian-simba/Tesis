import React, { useEffect, useState } from 'react';
import { LineChart, CartesianGrid, XAxis, YAxis, Line, Tooltip, Legend } from "recharts";
import { Spinner } from '@radix-ui/themes';
import useAuth from "../../../context/useAuth";
import { useTheme } from '../../../context/ThemeContext';
import { getReportes } from '../../../api/reportes.api';

export default function ReportesTiempo() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useAuth();
  const token = user?.cookies?.auth?.token;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getReportes(token);
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
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    const interval = setInterval(fetchData, 5000); // Actualiza cada minuto

    if (token) {
      fetchData(); // Llamada inicial al montar el componente

      return () => clearInterval(interval); // Limpia el intervalo cuando el componente se desmonta
    }
  }, [token]);

  const CustomTooltip = ({ active, payload, label }) => {
    const { theme } = useTheme();
  
    if (active && payload && payload.length) {
      const tooltipStyle = theme === 'dark'
        ? { backgroundColor: '#191919', border: '1px solid #333333', padding: '10px', fontSize: '14px' }
        : { backgroundColor: '#FCFDFC', border: '1px solid #ccc', padding: '10px', fontSize: '14px' };
  
      return (
        <div style={tooltipStyle}>
          <p>{`Fecha: ${label}`}</p>
          <p>{`Número de Reportes: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  const CustomXAxis = (props) => {
    const defaultTick = { fontFamily: 'Arial', fontSize: 14 };
    return <XAxis tick={defaultTick} {...props} />;
  };
  
  const CustomYAxis = (props) => {
    const defaultTick = { fontFamily: 'Arial', fontSize: 14 };
    return <YAxis tick={defaultTick} {...props} />;
  };


  return (
    <div>
      {loading ? (
        <div className='flex flex-col justify-center items-center h-[200px]'>
         <Spinner />
       </div>
      ) : data.length > 0 ? (
        <div className="flex flex-col items-center justify-center h-full pr-10">
          <LineChart width={630} height={230} data={data}>
            <CartesianGrid strokeDasharray="3 2" />
            <XAxis dataKey="name"  tick={{ fontFamily: 'Arial', fontSize: 14 }} />
            <YAxis tick={{ fontFamily: 'Arial', fontSize: 14 }} />
            <Tooltip content={<CustomTooltip />}/>
            <Legend/>
            <Line type="monotone" dataKey="reportes" stroke="#8884d8" />
          </LineChart>
        </div>
      ) : (
        <div>No hay datos disponibles</div>
      )}
    </div>
  );
}
