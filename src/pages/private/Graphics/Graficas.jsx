import React from 'react'
import UserPublicaciones from './UserPublicaciones'
import UserPubliTodos from './UserPubliTodos'
import ReportesTiempo from './ReportesTiempo'
import EstadoUsuarios from './EstadoUsuarios'
import PublicacionesTop from './PublicacionesTop'
import TemporadasTop from './TemporadasTop'
import { Flex, Text, Badge } from '@radix-ui/themes'
import { useTheme } from '../../../context/ThemeContext'
import Totales from './Totales'
import TotalesTodos from './TotalesTodos'
import useAuth from '../../../context/useAuth'

export default function Graficas() {

  const auth = useAuth();
  const { theme } = useTheme();

  return (
  <div className="grid grid-rows-2 grid-cols-3 h-[45rem] w-full gap-4">
    <div className='flex '>
    {auth.cookies.auth._id === import.meta.env.VITE_MODERADOR_ID ? (
        <>
           <Totales />
        </>
      ) : <TotalesTodos />}
     
    </div>
    <div className={`flex flex-col justify-center items-center col-span-2 px-2 py-10 rounded-lg ${theme === 'dark' ? 'bg-[#191919] border border-[#333333]'  : 'bg-[#FCFDFC]  border border-gray-400'}`}>
      <Text className='pb-5 font-medium'>Total de reportes</Text>
      <ReportesTiempo/>
    </div>

    <div className={`flex flex-col justify-center items-center px-2 py-10 rounded-lg  ${theme === 'dark' ? 'bg-[#191919] border border-[#333333]'  : 'bg-[#FCFDFC] border border-gray-400'}`}>
 
      {auth.cookies.auth._id === import.meta.env.VITE_MODERADOR_ID ? (
        <>
          <Text className=' font-medium pb-5'>Temporadas con más publicaciones</Text>
          <TemporadasTop />
        </>
      ) :
      <>
        <Text className=' font-medium pb-5'>Usuarios y Publicaciones</Text>
        <TemporadasTop />
      </> 
      }


    </div>

    <div className={`flex flex-col justify-center items-center py-10 rounded-lg  ${theme === 'dark' ? 'bg-[#191919] border border-[#333333]'  : 'bg-[#FCFDFC]  border border-gray-400'}`}>
      <Text className='pb-5 font-medium'>Estado de cuenta de los usuarios</Text>
      <EstadoUsuarios />
    </div>

    <div className={`flex flex-col justify-center items-center py-10 rounded-lg  ${theme === 'dark' ? 'bg-[#191919] border border-[#333333]'  : 'bg-[#FCFDFC]  border border-gray-400'}`}>
      <Text className='pb-2 font-medium'>Los 5 estilos más publicados</Text>
      <PublicacionesTop />
    </div>

  </div>
  )
}


