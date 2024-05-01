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
        px={{'initial': '4', 'sm': '8', 'md': '9'}} 
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
              <Button color='gray' variant='soft' radius='none' size={{'sm': '1', 'md': '2'}} className='hover:cursor-pointer'>Entrar como invitado</Button>
              <Button radius='none' size={{'sm': '1', 'md': '2'}} className='hover:cursor-pointer'>Descargar aplicación</Button>
            </>
          ) : (
            <Button onClick={toggleMenu} color="gray" variant="outline" className='hover:cursor-pointer'><IoIosMenu size='1.5em'/></Button>
          )}
        </Flex>
      </Flex>

      {isMenuOpen && (
        <Box position='absolute' top='100%' left='0' right='0' bg='white' py='4' px='6' className='bg-white' boxShadow='0 2px 4px rgba(0, 0, 0, 0.1)' transition='transform 0.1s ease-in-out' transform='translateY(0)'>
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
