import React from 'react'
import { Flex, Heading, Text, Button, Grid } from '@radix-ui/themes';
import image from '../../assets/styleImg.webp'

function HomeLP() {
    return (
        <section id='info'>
            <Grid columns='2' align='center' gap='5' className='px-28 min-h-screen'>
                <Flex direction='column' gap='6'>
                    <Heading size='8'>Haz que tus estilos luzcan perfectos </Heading>
                    <Text size='3' className='text-[#646464]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut itaque, et enim ad reiciendis mollitia doloremque maxime voluptatibus ea vitae..✨   </Text>

                    <Flex gap='3'>

                        <Button color='gray' variant='soft' radius='none' className='hover:cursor-pointer'>Registrate</Button>

                        <Button radius='none' className='hover:cursor-pointer'>Descarga la aplicación</Button>
                    </Flex>
                </Flex>
                <Flex>
                    <img src={image} alt="" className=' rounded-md ' />
                </Flex>
            </Grid>
            <Flex justify='center' align='center' className='mt-[-70px] py-5 hover:cursor-pointer'>
                <a href="#descubrir">
                    <Text size='2'
                        className='font-bold pr-1'>
                        Descubrir
                    </Text>
                </a>

                <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6H11L7.5 10.5L4 6Z" fill="currentColor"></path></svg>
            </Flex>
        </section>
    )
}

export default HomeLP