import React from 'react';
import { Flex, Heading, Text, Button, Grid } from '@radix-ui/themes';
import image from '../../assets/styleImg.webp';
import { useWindowWidth } from '../../hooks/useWindowWidth';
import { IoIosArrowDown } from "react-icons/io";

function HomeLP() {
const windowWidth = useWindowWidth();

return (
    windowWidth > 768 ? (
        <section id='info'>
            <Grid columns='2' align='center' gap='5' className='px-28 min-h-screen'>
                <Flex direction='column' gap='6'>
                    <Heading size='8'>Haz que tus estilos luzcan perfectos </Heading>
                    <Text size={{'sm':'2', 'md':'3'}} className='text-[#646464]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut itaque, et enim ad reiciendis mollitia doloremque maxime voluptatibus ea vitae..✨   </Text>

                    <Flex gap='3'>
                    <Button color='gray' variant='soft' radius='none' size={{'md': '1', 'lg': '2'}} className='hover:cursor-pointer'>Registrate</Button>
                    <Button radius='none' size={{'md': '1', 'lg': '2'}} className='hover:cursor-pointer'>Descarga la aplicación</Button>
                    </Flex>
                </Flex>
            <Flex>
                <img src={image} alt="" className=' rounded-md ' />
            </Flex>
            </Grid>
            <Flex justify='center' align='center' className='mt-[-70px] py-5  hover:cursor-pointer'>
                <a href="#descubrir">
                <Text size={{'sm':'2', 'md':'3'}} className='font-bold pr-2'>Descubrir</Text>
                </a>
                <IoIosArrowDown />
            </Flex>
        </section>
        ) : (
            <section id='info'>
            <Flex align='center' gap='5' className='px-8 min-h-screen'>
                <Flex direction='column' gap='6'>
                    <Heading size='8'>Haz que tus estilos luzcan perfectos </Heading>
                    <img src={image} alt="" className=' rounded-md ' />
                    <Text size='3' className='text-[#646464]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut itaque, et enim ad reiciendis mollitia doloremque maxime voluptatibus ea vitae..✨   </Text>

                    <Flex gap='3'>
                    <Button color='gray' variant='soft' radius='none' className='hover:cursor-pointer'>Registrate</Button>
                    <Button radius='none' className='hover:cursor-pointer'>Descarga la aplicación</Button>
                    </Flex>
                </Flex>

            </Flex>
        </section>
        )
    );
}

export default HomeLP;
