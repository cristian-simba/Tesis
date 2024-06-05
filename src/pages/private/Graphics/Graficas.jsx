import React from 'react'
import UserPublicaciones from './UserPublicaciones'
import ReportesTiempo from './ReportesTiempo'
import { Card, Flex, Text, Badge } from '@radix-ui/themes'
import { useTheme } from '../../../context/ThemeContext'

export default function Graficas() {

  const { theme, toggleTheme } = useTheme();

  return (
  <div className="grid grid-rows-2 grid-cols-3 h-[35rem] w-full gap-5">
    <div className={`flex flex-col justify-center items-center px-2 py-10 rounded-lg  ${theme === 'dark' ? 'bg-[#191919] border border-[#333333]'  : 'bg-gray-50 border border-gray-400'}`}>
      <Text className='pb-5'>Total de Publicaciones, Usuarios y Moderadores</Text>
      <UserPublicaciones />
      <Flex gap='2'>
        <Badge className='text-white bg-[#0088fe]'>Publicaciones</Badge>
        <Badge className='text-white bg-[#00c49f]'>Moderadores</Badge>
        <Badge className='text-white bg-[#ffbb28]'>Usuarios</Badge>
      </Flex>
    </div>
    <div className={`flex flex-col justify-center items-center col-span-2 px-2 py-10 rounded-lg ${theme === 'dark' ? 'bg-[#191919] border border-[#333333]'  : 'bg-gray-50 border border-gray-400'}`}>

      <Text className='pb-5'>Total de reportes los últimos 5 días</Text>
      <ReportesTiempo/>
      <Badge className='text-white bg-[#443eab]'>Reportes</Badge>
    </div>
    <div className="flex justify-center items-center">
      <p>XD</p>
    </div>
    <div className="flex justify-center items-center">
      <p>XD</p>
    </div>
  </div>
  )
}


