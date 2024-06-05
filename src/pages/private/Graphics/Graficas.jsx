import React from 'react'
import UserPublicaciones from './UserPublicaciones'
import ReportesTiempo from './ReportesTiempo'
import EstadoUsuarios from './EstadoUsuarios'
import PublicacionesTiempo from './PublicacionesTiempo'
import { Flex, Text, Badge } from '@radix-ui/themes'
import { useTheme } from '../../../context/ThemeContext'

export default function Graficas() {

  const { theme, toggleTheme } = useTheme();

  return (
  <div className="grid grid-rows-2 grid-cols-3 h-[45rem] w-full gap-4">
    <div className={`flex flex-col justify-center items-center px-2 py-10 rounded-lg  ${theme === 'dark' ? 'bg-[#191919] border border-[#333333]'  : 'bg-[#FCFDFC] border border-gray-400'}`}>
      <Text className=' font-medium'>Publicaciones, Usuarios y Moderadores</Text>
      <UserPublicaciones />
      <Flex gap='2'>
        <Badge className='text-white bg-[#443eab]'>Usuarios</Badge>
        <Badge className='text-white bg-[#00c49f]'>Moderadores</Badge>
        <Badge className='text-white bg-[#0088fe]'>Publicaciones</Badge>
      </Flex>
    </div>
    <div className={`flex flex-col justify-center items-center col-span-2 px-2 py-10 rounded-lg ${theme === 'dark' ? 'bg-[#191919] border border-[#333333]'  : 'bg-[#FCFDFC]  border border-gray-400'}`}>
      <Text className='pb-5 font-medium'>Total de reportes los últimos 5 días</Text>
      <ReportesTiempo/>
      <Badge className='text-white bg-[#443eab]'>Reportes</Badge>
    </div>

    <div className={`flex flex-col justify-center items-center py-10 rounded-lg  ${theme === 'dark' ? 'bg-[#191919] border border-[#333333]'  : 'bg-[#FCFDFC]  border border-gray-400'}`}>
      <Text className='pb-5 font-medium'>Estado de cuenta de los usuarios</Text>
      <EstadoUsuarios />
      <Badge className='text-white bg-[#443eab]'>Cantidad</Badge>
    </div>
    <div className={`flex flex-col justify-center items-center col-span-2 px-2 py-10 rounded-lg ${theme === 'dark' ? 'bg-[#191919] border border-[#333333]'  : 'bg-[#FCFDFC]  border border-gray-400'}`}>
      <PublicacionesTiempo/>
    </div>
  </div>
  )
}


