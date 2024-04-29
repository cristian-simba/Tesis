import React from 'react';
import { Flex, Heading, Button, Link } from '@radix-ui/themes';

function NavbarLP() {
  return (
    <nav className='fixed top-0 w-full z-10 bg-[#FCFCFC]'>
      <Flex justify='between' className='py-4 px-12'>
        <Flex align='center'>
          <a href="#inicio"><Heading>App Logo</Heading></a>
        </Flex>
        <Flex gap='5' align='center' className='text-sm'>
          <a href="/#inicio" className='text-[#646464] '>Inicio</a>
          <a href="/#descubrir" className='text-[#646464] '>Descubrir</a>
          <a href="/#novedades" className='text-[#646464] '>Novedades</a>
          <a href="/iniciar-sesion" className='text-[#646464]'>Iniciar Sesión</a>
          <Button radius='none' className='hover:cursor-pointer'>Registrate</Button>
        </Flex>
      </Flex>
    </nav>
  );
}

export default NavbarLP;
