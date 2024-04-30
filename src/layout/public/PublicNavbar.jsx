import React from 'react';
import { Flex, Heading, Button } from '@radix-ui/themes';
import { Link } from 'react-router-dom';

function PublicNavbar() {
  return (
    <nav className='fixed top-0 w-full z-10 bg-[#FCFCFC]'>
      <Flex justify='between' className='py-4 px-12'>
        <Flex justify='center' align='center' gap='5'>
          <Link to="/"><Heading>App Logo</Heading></Link>
            <input 
                type="text" 
                className=" border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full text-sm px-5 py-2" 
                placeholder="Buscar ideas de estilos"
            />

        </Flex>

        <Flex gap='2' align='center' className='text-sm'>
          
          <Button color='gray' variant='soft' radius='none' className='hover:cursor-pointer'>Iniciar Sesión</Button>
          
          <Button radius='none' className='hover:cursor-pointer'>Registrate</Button>
        </Flex>
      </Flex>
    </nav>
  );
}

export default PublicNavbar;
