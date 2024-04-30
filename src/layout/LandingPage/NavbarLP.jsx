import React from 'react';
import { Flex, Heading, Button, Link } from '@radix-ui/themes';

function NavbarLP() {
  return (
    <nav className='fixed top-0 w-full z-10 bg-[#FCFCFC]'>
      <Flex justify='between' className='py-4 px-12'>
        <Flex justify='center' align='center' gap='5'>
          <a href="#inicio"><Heading>App Logo</Heading></a>
          <a href="/#ideas" className='text-[#646464] text-sm'>Explorar</a>
        </Flex>
        <Flex gap='2' align='center' className='text-sm'>
          <a href="/#info" className='text-[#646464] mr-3'>Info</a>
          <a href="/#descubrir" className='text-[#646464] mr-3'>Descubrir</a>
          <a href="/#novedades" className='text-[#646464] mr-3'>Novedades</a>
          
          <Button color='gray' variant='soft' radius='none' className='hover:cursor-pointer'>Iniciar Sesión</Button>
          
          <Button radius='none' className='hover:cursor-pointer'>Registrate</Button>
        </Flex>
      </Flex>
    </nav>
  );
}

export default NavbarLP;
