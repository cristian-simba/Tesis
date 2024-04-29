import React from 'react'
import { Grid, Heading, Text, Flex } from '@radix-ui/themes'
import SectionCard from '../../components/LandingPage/SectionCard'
import image from '../../assets/styleImg.webp'

function SectionsCardsLP() {
  return (
    <section  id='caracteristicas' className='min-h-screen'>
      
      <Grid columns='3' gapX='5' align='center' className=' px-28 pb-4 min-h-screen'>

        <SectionCard image={image} title={'Registrate'} text={'Registrate para que puedas usar nuestra aplicación web o móvil.'}/>
        <SectionCard image={image} title={'Descubre'} text={'Inicia sesion para descubrir todas las novedades de la moda.'}/>
        <SectionCard image={image} title={'Publica'} text={'Publica tus estilos de moda para inspirar a los demás usuarios.'}/>
      </Grid>
      <Flex justify='center' align='center' className='mt-[-70px] py-5 hover:cursor-pointer'>
            <a href="#explorar"><Text size='2' className='font-bold pr-1'>Explora</Text></a>
            
            <svg  width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6H11L7.5 10.5L4 6Z" fill="currentColor"></path></svg>
        </Flex>
    </section>
  )
}

export default SectionsCardsLP