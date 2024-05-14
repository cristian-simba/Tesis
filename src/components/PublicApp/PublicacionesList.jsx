import React from 'react';
import { Dialog, Text, Flex, Heading } from "@radix-ui/themes";
import Masonry from '@mui/lab/Masonry';
import { useWindowWidth } from '../../hooks/useWindowWidth';
import { RxCross2 } from "react-icons/rx";
import {DowloadButton} from '../LandingPage/Buttons/LandingBtns';
import { GrDownload } from "react-icons/gr";

function PublicacionesList({ publicaciones }) {

  const windowWidth = useWindowWidth();
  const headingText = 'FashionGEC'
  const paragraphText = 'Explora todas las funciones disponibles en la aplicación móvil. Publica, reacciona y guarda las publicaciones que te gusten.'

  return windowWidth > 768 ? (
    <Masonry columns={5} spacing={2} className='px-16'>
      {publicaciones.map(publicacion => (
        <Dialog.Root key={publicacion._id}>

        <Dialog.Trigger>
          <div className='hover:cursor-pointer'>
            <img src={publicacion.imagen.secure_url} className='rounded-lg mb-2' />   
            <Text>{publicacion.descripcion}</Text>
          </div>
        </Dialog.Trigger>

          <Dialog.Content maxWidth="400px">
            <Flex justify='end'>
              <Dialog.Close>
                <RxCross2 size='20' className='hover:cursor-pointer' />
              </Dialog.Close>
            </Flex>
            <Flex align='center' justify='center' direction='column' gap='5'>
                <Heading size='8'>
                  {headingText}
                </Heading>
                <GrDownload size='100' color='#202020'/>
                <Text size='3'className='pb-4 text-center'>
                  {paragraphText}
                </Text>
            </Flex>

            <Flex justify='center'>
              <DowloadButton text='Descargar aplicación' />
            </Flex>
          </Dialog.Content>
        </Dialog.Root>
      ))}
    </Masonry>
  ): (
    <Masonry columns={2} spacing={0.9} className='px-5'>
    {publicaciones.map(publicacion => (
      <Dialog.Root>

      <Dialog.Trigger>
        <div key={publicacion._id} className='hover:cursor-pointer'>
          <img src={publicacion.imagen.secure_url} className='rounded-lg mb-2' />   
          <Text>{publicacion.descripcion}</Text>
        </div>
      </Dialog.Trigger>

        <Dialog.Content maxWidth="400px">
          <Flex justify='end'>
            <Dialog.Close>
              <RxCross2 size='20' className='hover:cursor-pointer' />
            </Dialog.Close>
          </Flex>
          <Flex align='center' justify='center' direction='column' gap='5'>
              <Heading size='8'>
                {headingText}
              </Heading>
              <GrDownload size='100' color='#202020'/>
              <Text size='2' className='pb-4 text-center'>
                {paragraphText}
              </Text>
          </Flex>

          <Flex justify='center'>
            <DowloadButton text='Descargar aplicación' />
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    ))}
  </Masonry>
  )
}

export default PublicacionesList;
