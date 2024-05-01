import React from 'react'
import { Grid, Heading, Text, Flex } from '@radix-ui/themes'
import SectionCard from './Cards/SectionCard'
import image from '../../assets/styleImg.webp'
import { useWindowWidth } from '../../hooks/useWindowWidth';
import { IoIosArrowDown } from "react-icons/io";

function SectionsCardsLP() {
  const windowWidth = useWindowWidth();


  return (
    windowWidth > 768 ? (
    <section  id='descubrir'>
      <Flex direction='column' className='min-h-screen' justify='center' align='center' gap='2'>
        <Heading size={{'sm':'4', 'md': '5'}}>Descubre y comparte tu estilo ideal para cada día.</Heading>
        <Text size={{'sm':'2', 'md':'3'}} className='mb-5 text-[#646464]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, vero. Rerum reprehenderit quidem expedita</Text>

        <Grid columns='3' gapX='5' align='center' className=' px-28 pb-4'>

          <SectionCard 
            image={'https://media.gq.com.mx/photos/6165c414e1224bdb3d42c49b/3:2/w_1998,h_1332,c_limit/habitos-de-un-hombre-con-estilo-como-se-comporta.jpg'}
            title={'Registrate'} 
            text={'Regístrate para poder utilizar nuestra aplicación web o móvil.'}
          />

          <SectionCard 
            image={'https://audaces.com/wp-content/uploads/2023/08/estilo-elegante-estilos-de-moda-1024x683.jpg'} 
            title={'Explora'} 
            text={'Inicia sesion para descubrir todas las novedades en estilos.'}
            />

          <SectionCard 
            image={'https://media.gq.com.mx/photos/639ab651b258d7ba43866a37/4:3/w_2421,h_1816,c_limit/habitos-de-un-hombre-con-estilo-en-2023.jpg'} 
            title={'Publica'} 
            text={'Publica tus estilos para inspirar a otros usuarios.'}
            />
            
        </Grid>
      </Flex>
      <Flex justify='center' align='center' className='mt-[-70px] py-5 hover:cursor-pointer'>
            <a href="#novedades">
              <Text size='2' 
              className='font-bold pr-1'>
              Novedades
              </Text>
            </a>
            
            <IoIosArrowDown />
        </Flex>
    </section>
    ):(
      <section  id='descubrir'>
    <Flex direction='column' className='min-h-screen px-8' justify='center' align='center' gap='2'>
      <Heading size='6'>Descubre y comparte tu estilo ideal para cada día.</Heading>
      <Text size='3' className='mb-5 text-[#646464]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, vero. Rerum reprehenderit quidem expedita</Text>

      <Grid columns='1' gap='6' className='pb-4'>

        <SectionCard 
          image={'https://media.gq.com.mx/photos/6165c414e1224bdb3d42c49b/3:2/w_1998,h_1332,c_limit/habitos-de-un-hombre-con-estilo-como-se-comporta.jpg'}
          title={'Registrate'} 
          text={'Regístrate para poder utilizar nuestra aplicación web o móvil.'}
        />

        <SectionCard 
          image={'https://audaces.com/wp-content/uploads/2023/08/estilo-elegante-estilos-de-moda-1024x683.jpg'} 
          title={'Explora'} 
          text={'Inicia sesion para descubrir todas las novedades en estilos.'}
          />

        <SectionCard 
          image={'https://media.gq.com.mx/photos/639ab651b258d7ba43866a37/4:3/w_2421,h_1816,c_limit/habitos-de-un-hombre-con-estilo-en-2023.jpg'} 
          title={'Publica'} 
          text={'Publica tus estilos para inspirar a otros usuarios.'}
          />
          
      </Grid>
    </Flex>
    </section>)
  )
}

export default SectionsCardsLP