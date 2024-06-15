import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import useAuth from "../../../context/useAuth";
import { Spinner, Text, Badge } from "@radix-ui/themes";
import { useTheme } from '../../../context/ThemeContext'

const COLORS = ["#0088FE", "#00C49F", "#443eab"];

export default function UserPubliTodos() {
  const [data, setData] = useState([]);
  const user = useAuth();
  const token = user?.cookies?.auth?.token;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      console.error('Token no disponible');
      return;
    }
  
    axios.all([
      axios.get('https://ropdat.onrender.com/api/publicaciones'),
      axios.get('https://ropdat.onrender.com/api/listar/usuarios', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }),
    ])
    .then(axios.spread((res1, res2) => {
      const data1 = res1.data;
      const data2 = res2.data;
      console.log(data1, data2);
      if (Array.isArray(data1) && Array.isArray(data2)) {
        const totalData1 = data1.length;
        const totalData2 = data2.length;
        setData([
          { name: 'Publicaciones', value: totalData1 },
          { name: 'Usuarios', value: totalData2 },
        ]);
        setLoading(false); // Cambia el estado de carga a falso cuando se reciben los datos
      } else {
        console.error('Los datos devueltos por las APIs no son arrays');
        setLoading(false); // Cambia el estado de carga a falso si hay un error
      }
    }))
    .catch(err => {
      console.error(err);
      setLoading(false); // Cambia el estado de carga a falso si hay un error
    });
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
      {loading ? ( // Muestra el spinner si está cargando
        <Spinner />
      ) : data.length > 0 ? ( // Muestra el gráfico si hay datos disponibles
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
          <Legend wrapperStyle={{ fontSize: "14px" }} />
        </PieChart>
      ) : ( // Muestra un mensaje si no hay datos disponibles
        <Text>No hay datos disponibles</Text>
      )}
    </div>
  );
}
