import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import { Spinner } from "@radix-ui/themes";
import { useTheme } from '../../../context/ThemeContext';

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

const TemporadasTop = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/publicacionesF/`);
        const publicaciones = response.data;

        if (publicaciones.length > 0) {
          // Contar la frecuencia de cada estilo
          const styleCounts = publicaciones.reduce((acc, curr) => {
            const estilo = curr.estilo.temporada || "Otros"; // Si no hay estilo, se considera "Otros"
            acc[estilo] = (acc[estilo] || 0) + 1;
            return acc;
          }, {});

          // Convertir a un formato compatible con Recharts
          const chartData = Object.keys(styleCounts).map((estilo) => ({
            name: estilo,
            value: styleCounts[estilo],
          }));

          // Ordenar los datos por frecuencia descendente
          chartData.sort((a, b) => b.value - a.value);

          // Tomar los primeros 5 estilos
          setData(chartData.slice(0, 5));
        } else {
          setData([]); // No hay datos disponibles
        }

        setLoading(false); // Finaliza la carga
      } catch (error) {
        console.error("Error al obtener datos:", error);
        setLoading(false); // Finaliza la carga en caso de error
      }
    };

    const interval = setInterval(fetchData, 5000); // Actualiza cada minuto
    fetchData(); // Llamada inicial al montar el componente

    return () => clearInterval(interval); // Limpia el intervalo cuando el componente se desmonta
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    const { theme } = useTheme();
  
    if (active && payload && payload.length) {
      const tooltipStyle = theme === 'dark'
        ? { backgroundColor: '#191919', border: '1px solid #333333', padding: '10px', fontSize: '14px' }
        : { backgroundColor: '#FCFDFC', border: '1px solid #ccc', padding: '10px', fontSize: '14px' };
  
      return (
        <div style={tooltipStyle}>
          <p>{`Cantidad: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="flex flex-col justify-center items-center h-full">
      {loading ? (
        <Spinner size={32} />
      ) : data.length > 0 ? (
        <PieChart width={350} height={270}>
          <Pie
            data={data}
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}` }
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            stroke="transparent"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />}/>
          <Legend wrapperStyle={{ fontSize: "14px" }}/>
        </PieChart>
      ) : (
        <p>No hay datos disponibles</p>
      )}
    </div>
  );
};

export default TemporadasTop;
