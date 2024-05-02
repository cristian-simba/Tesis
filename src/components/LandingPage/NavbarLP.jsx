import React, { useState } from 'react';
import { Flex, Heading, Button, Box } from '@radix-ui/themes';
import { Link } from 'react-router-dom';
import { useWindowWidth } from '../../hooks/useWindowWidth';
import { IoIosMenu } from "react-icons/io";

function NavbarLP() {
  const windowWidth = useWindowWidth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className='fixed top-0 w-full z-10 bg-[#FCFCFC]'>
      <Flex justify='between' 
        px={{'initial': '5', 'sm': '8', 'md': '9'}} 
        py='4'
      >
        <Flex justify='center' align='center' gap='5'>
          <a href="#info">
            <Heading>App Logo</Heading>
          </a>
        </Flex>

        <Flex gap='3' align='center' className='md:text-xs lg:text-sm'>
          {windowWidth > 768 ? (
            <>
              <a href="/#info" className='text-[#646464] cursor-pointer'>Información</a>
              <a href="/#descubrir" className='text-[#646464] cursor-pointer'>Descubrir</a>
              <a href="/#novedades" className='text-[#646464] cursor-pointer'>Noticias</a>

              <Button radius='none' className='hover:cursor-pointer'>Descargar aplicación</Button>
            </>
          ) : (
            <button onClick={toggleMenu}
            className='hover:cursor-pointer'><IoIosMenu size='1.5em'/></button>
          )}
        </Flex>
      </Flex>

      {isMenuOpen && (
        <Box position='absolute' top='100%' left='0' right='0' py='4' px='6' 
        className='bg-white' >
          <Flex direction='column' gap='2'>
            <a href="/#info" className='text-[#646464]'>Información</a>
            <a href="/#descubrir" className='text-[#646464]'>Descubrir</a>
            <a href="/#novedades" className='text-[#646464]'>Noticias</a>
            <Button color='gray' variant='soft' radius='none' className='hover:cursor-pointer'>Entrar como invitado</Button>
            <Button radius='none' className='hover:cursor-pointer'>Descargar aplicación </Button>
          </Flex>
        </Box>
      )}
    </nav>
  );
}

export default NavbarLP;
