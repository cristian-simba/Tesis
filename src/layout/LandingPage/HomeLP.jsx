import React from 'react'
import { Flex, Heading, Text, Button } from '@radix-ui/themes';
import image from '../../assets/styleImg.webp'

function HomeLP() {
  return (
    <section>
        <Flex justify='center' align='center' gap='5' className='px-24 min-h-screen'>
            <Flex direction='column' gap='6'>
                <Heading size='8'>Haz que tus estilos luzcan perfectos </Heading>
                <Text size='3' className='text-[#646464]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut itaque, et enim ad reiciendis mollitia doloremque maxime voluptatibus ea vitae..✨   </Text>

                <Flex gap='3'>
                    <Button color='gray' variant='soft' radius='none' className='hover:cursor-pointer'>Registrate</Button>
                    <Button radius='none' className='hover:cursor-pointer'>Descarga la aplicación</Button>
                </Flex>
            </Flex>
            <Flex>
                <img src={image} alt="" className=' rounded-md' />
            </Flex>
            
        </Flex>

    </section>
  )
}

export default HomeLP