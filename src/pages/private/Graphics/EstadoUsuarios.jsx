import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
import useAuth from "../../../context/useAuth";
import { getUsers } from '../../../api/usuarios.api';
import { Badge, Spinner } from '@radix-ui/themes';
import { useTheme } from '../../../context/ThemeContext';

export default function EstadoUsuarios() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true); 
  const user = useAuth();
  const token = user?.cookies?.auth?.token;

  useEffect(() => {
    getUsers(token)
      .then(response => {
        const userStates = {
          Activos: 0,
          Restringidos: 0,
          Bloqueados: 0
        };
        response.data.forEach(user => {
          if (user.bloqueo) userStates.Bloqueados++;
          else if (user.restriccion) userStates.Restringidos++;
          else userStates.Activos++;
        });
        const userDataArray = Object.keys(userStates).map(state => ({
          estado: state,
          Cantidad: userStates[state]
        }));
        setUserData(userDataArray);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al obtener los datos de usuarios:', error.message);
        setLoading(false);
      });
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    const { theme } = useTheme();
  
    if (active && payload && payload.length) {
      const tooltipStyle = theme === 'dark'
        ? { backgroundColor: '#191919', border: '1px solid #333333', padding: '10px', fontSize: '14px' }
        : { backgroundColor: '#FCFDFC', border: '1px solid #ccc', padding: '10px', fontSize: '14px' };
  
      return (
        <div style={tooltipStyle}>
          <p>{`Usuarios ${label}`}</p>
          <p>{`Cantidad: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      {loading ? (
        <div className='flex flex-col justify-center items-center h-[200px]'>
          <Spinner />
        </div>
      ) : userData.length > 0 ? (
      <div className="flex flex-col justify-center items-center h-full pr-14">
      <BarChart width={350} height={200} data={userData}>
        <CartesianGrid strokeDasharray="" />
        <XAxis dataKey="estado" tick={{ fontFamily: 'Arial', fontSize: 14 }}/>
        <YAxis tick={{ fontFamily: 'Arial', fontSize: 14 }}/>
        <Tooltip content={<CustomTooltip />}/>
        <Bar
          dataKey="Cantidad"
          fill="#8884d8"
          barSize={50} 
          background={{ fill: '#f0f0f0' }}     
        />      
      </BarChart>
      </div>
      ):(
        <div>No hay datos disponibles</div>
      )}
  </div>
  );
}
  