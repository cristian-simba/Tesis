import { useState, useEffect } from 'react';
import { getModeradores } from '../../../api/moderador.api';
import { getUsers } from '../../../api/usuarios.api';
import { getPublicaciones } from '../../../api/publicaciones.api';
import { getReportes } from '../../../api/reportes.api';
import { useTheme } from '../../../context/ThemeContext'
import { Text, Spinner } from '@radix-ui/themes';
import { LuUsers2, LuImage, LuMail } from 'react-icons/lu';
import { GrUserPolice } from "react-icons/gr";
import useAuth from '../../../context/useAuth';

export default function Totales() {
  const [moderadores, setModeradores] = useState(0);
  const [usuarios, setUsuarios] = useState(0);
  const [publicaciones, setPublicaciones] = useState(0);
  const [reportes, setReportes] = useState(0);
  const [loadingModeradores, setLoadingModeradores] = useState(true);
  const [loadingUsuarios, setLoadingUsuarios] = useState(true);
  const [loadingPublicaciones, setLoadingPublicaciones] = useState(true);
  const [loadingReportes, setLoadingReportes] = useState(true);
  const { theme } = useTheme();
  const user = useAuth();
  const token = user?.cookies?.auth?.token;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const moderadoresResponse = await getModeradores(token);
        const usuariosResponse = await getUsers(token);
        const publicacionesResponse = await getPublicaciones(token);
        const reportesResponse = await getReportes(token);

        setModeradores(moderadoresResponse.data.length);
        setLoadingModeradores(false);

        setUsuarios(usuariosResponse.data.length);
        setLoadingUsuarios(false);

        setPublicaciones(publicacionesResponse.data.length);
        setLoadingPublicaciones(false);

        setReportes(reportesResponse.data.length);
        setLoadingReportes(false);
      } catch (error) {
        console.error('Error al obtener datos:', error);
        setLoadingModeradores(false);
        setLoadingUsuarios(false);
        setLoadingPublicaciones(false);
        setLoadingReportes(false);
      }
    };

    if (token) {
      fetchData(); // Llamada inicial al montar el componente

      const interval = setInterval(fetchData, 5000); // Llamada cada minuto

      return () => clearInterval(interval); // Limpia el intervalo cuando el componente se desmonta
    }
  }, [token]);

  return (
    <div className={`grid grid-cols-2 gap-4 w-full`}>
      <div className={`flex flex-col gap-3 px-4 py-5 rounded-lg ${theme === 'dark' ? 'bg-[#191919] border border-[#333333]' : 'bg-[#FCFDFC] border border-gray-400'}`}>
        {loadingModeradores ? (
          <div className='flex justify-center items-center h-full'>
            <Spinner />
          </div>
        ) : (
          <>
            <GrUserPolice size={36} className='mb-1'/>
            <Text size='2' className='font-medium'>Total de Moderadores</Text>
            <Text className='mt-[-5px]'>{moderadores}</Text>
          </>
        )}
      </div>

      <div className={`flex flex-col  gap-2 px-4 py-5 rounded-lg ${theme === 'dark' ? 'bg-[#191919] border border-[#333333]' : 'bg-[#FCFDFC] border border-gray-400'}`}>
        {loadingUsuarios ? (
          <div className='flex justify-center items-center h-full'>
            <Spinner />
          </div>
        ) : (
          <>
            <LuUsers2 size={40} className='mb-1'/>
            <Text size='2' className='font-medium'>Total de Usuarios</Text>
            <Text>{usuarios}</Text>
          </>
        )}
      </div>

      <div className={`flex flex-col gap-2 px-4 py-5 rounded-lg ${theme === 'dark' ? 'bg-[#191919] border border-[#333333]' : 'bg-[#FCFDFC] border border-gray-400'}`}>
        {loadingPublicaciones ? (
          <div className='flex justify-center items-center h-full'>
            <Spinner />
          </div>
        ) : (
          <>
            <LuImage size={40} className='mb-1'/>
            <Text size='2' className='font-medium'>Total de Publicaciones</Text>
            <Text>{publicaciones}</Text>
          </>
        )}
      </div>

      <div className={`flex flex-col  gap-2 px-4 py-5 rounded-lg ${theme === 'dark' ? 'bg-[#191919] border border-[#333333]' : 'bg-[#FCFDFC] border border-gray-400'}`}>
        {loadingReportes ? (
          <div className='flex justify-center items-center h-full'>
            <Spinner />
          </div>
        ) : (
          <>
            <LuMail size={40} className='mb-1'/>
            <Text size='2' className='font-medium'>Total de Reportes</Text>
            <Text>{reportes}</Text>
          </>
        )}
      </div>
    </div>
  );
}
