import React, { useEffect, useState } from 'react';
import { LineChart, CartesianGrid, XAxis, YAxis, Line, Tooltip, Legend } from "recharts";
import { Spinner } from '@radix-ui/themes';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAuth from "../../../context/useAuth";
import { useTheme } from '../../../context/ThemeContext';
import { getReportes } from '../../../api/reportes.api';

export default function ReportesTiempo() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const user = useAuth();
  const token = user?.cookies?.auth?.token;
  const maxDate = new Date(); // Current date

  useEffect(() => {
    const fetchData = async () => {
      if (!startDate || !endDate) return;

      try {
        setLoading(true);
        const response = await getReportes(token);
        const reportes = response.data;

        // Filter reports based on date range
        const filteredReports = reportes.filter(report => {
          const reportDate = new Date(report.createdAt);
          return reportDate >= startDate && reportDate <= endDate;
        });

        // Group reports by day
        const groupedReports = filteredReports.reduce((acc, report) => {
          const date = new Date(report.createdAt).toISOString().split('T')[0];
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        }, {});

        // Generate all dates in the range
        const allDates = [];
        const currentDate = new Date(startDate);
        while (currentDate <= endDate) {
          allDates.push(currentDate.toISOString().split('T')[0]);
          currentDate.setDate(currentDate.getDate() + 1);
        }

        // Format data for the chart
        const formattedData = allDates.map(date => ({
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

    if (token && startDate && endDate) {
      fetchData();
    }
  }, [token, startDate, endDate]);

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

  return (
    <div>
      <div className="mb-4 flex items-center ml-20">
        <label className="mr-2">Fecha de inicio:</label>
        <DatePicker
          selected={startDate}
          onChange={date => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          maxDate={endDate || maxDate}
          placeholderText='dd/mm/yyyy'
          className="mr-4 shadow-inner"
        />
        <label className="mr-2">Fecha de fin:</label>
        <DatePicker
          selected={endDate}
          onChange={date => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          maxDate={maxDate}
          placeholderText='dd/mm/yyyy'
          className=' shadow-inner'
        />
      </div>
      {loading ? (
        <div className='flex flex-col justify-center items-center h-[200px]'>
          <h2 className='pb-5'>Escoge las fechas para mostrar la gráfica</h2>
         <Spinner />
       </div>
      ) : data.length > 0 ? (
        <div className="flex flex-col items-center justify-center h-full pr-10">
          <LineChart width={630} height={230} data={data}>
            <CartesianGrid strokeDasharray="3 2" />
            <XAxis dataKey="name" tick={{ fontFamily: 'Arial', fontSize: 14 }} />
            <YAxis tick={{ fontFamily: 'Arial', fontSize: 14 }} />
            <Tooltip content={<CustomTooltip />}/>
            <Legend/>
            <Line type="monotone" dataKey="reportes" stroke="#8884d8" />
          </LineChart>
        </div>
      ) : (
        <div>No hay datos disponibles para el rango de fechas seleccionado</div>
      )}
    </div>
  );
}