import React from 'react';
import { Flex, Heading, Button } from '@radix-ui/themes';

function NavbarLP() {
  return (
    <nav className='fixed top-0 w-full  z-10 '>
      <Flex justify='between' className='py-6 px-12'>
        <Flex align='center'>
          <Heading>XD</Heading>
        </Flex>
        <Flex gap='5' align='center' className='text-sm'>
          <a href="/descargar" className='text-[#646464]'>Descargar</a>
          <a href="/caracteristicas" className='text-[#646464]'>Características</a>
          <a href="/iniciar-sesion" className='text-[#646464]'>Iniciar Sesión</a>
          <Button radius='none' className='hover:cursor-pointer'>Registrate</Button>
        </Flex>
      </Flex>
    </nav>
  );
}

export default NavbarLP;
