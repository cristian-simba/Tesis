import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import useAuth from "../../../context/useAuth";
import { Spinner, Text, Badge } from "@radix-ui/themes";
import { useTheme } from '../../../context/ThemeContext'

const COLORS = ["#0088FE", "#00C49F", "#443eab"];

export default function UserPublicaciones() {
  const [data, setData] = useState([]);
  const user = useAuth();
  const token = user?.cookies?.auth?.token;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token) {
          console.error('Token no disponible');
          return;
        }
      
        const [res1, res2, res3] = await axios.all([
          axios.get('https://ropdat.onrender.com/api/publicacionesF'),
          axios.get('https://ropdat.onrender.com/api/moderadores', {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }),
          axios.get('https://ropdat.onrender.com/api/listar/usuarios', {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }),
        ]);
  
        const data1 = res1.data;
        const data2 = res2.data;
        const data3 = res3.data;
        
        if (Array.isArray(data1) && Array.isArray(data2) && Array.isArray(data3)) {
          const totalData1 = data1.length;
          const totalData2 = data2.length;
          const totalData3 = data3.length;
          setData([
            { name: 'Publicaciones', value: totalData1 },
            { name: 'Moderadores', value: totalData2 },
            { name: 'Usuarios', value: totalData3 },
          ]);
          setLoading(false);
        } else {
          console.error('Los datos devueltos por las APIs no son arrays');
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    
    fetchData(); // Llamada inicial al montar el componente
    
    const interval = setInterval(fetchData, 5000); // Llamada cada minuto
    
    return () => clearInterval(interval); // Limpia el intervalo cuando el componente se desmonta
  }, [token]);
  
  const CustomTooltip = ({ active, payload }) => {
    const { theme } = useTheme();
  
    if (active && payload && payload.length) {
      const tooltipStyle = theme === 'dark'
        ? { backgroundColor: '#191919', border: '1px solid #333333', padding: '10px', fontSize: '14px' }
        : { backgroundColor: '#FCFDFC', border: '1px solid #ccc', padding: '10px', fontSize: '14px'};
  
      const { name, value } = payload[0];
      
      return (
        <div style={tooltipStyle}>
          <p>{name}</p>
          <p>{`Cantidad: ${value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col justify-center items-center h-full">
      {loading ? (
        <Spinner />
      ) : data.length > 0 ? (
        <PieChart width={300} height={270}>
          <Pie
            data={data}
            innerRadius={50}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            label
            stroke="transparent" 
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: "14px" }}/>
        </PieChart>
      ) : (
        <Text>No hay datos disponibles</Text>
      )}
    </div>
  );
}
