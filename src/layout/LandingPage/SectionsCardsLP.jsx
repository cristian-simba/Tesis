import React from 'react'
import { Grid, Heading, Text, Flex } from '@radix-ui/themes'
import SectionCard from '../../components/LandingPage/SectionCard'
import image from '../../assets/styleImg.webp'

function SectionsCardsLP() {
  return (
    <section  id='explorar'>
      <Flex direction='column' className='min-h-screen' justify='center' align='center' gap='2'>
      <Heading>Encuentra y comparte tu estilo ideal para cada dia</Heading>
      <Text className='mb-5'>Lorem ipsum dolor, </Text>
      <Grid columns='3' gapX='5' align='center' className=' px-28 pb-4 '>
        <SectionCard image={image} title={'Registrate'} text={'Registrate para que puedas usar nuestra aplicación web o móvil.'}/>
        <SectionCard image={image} title={'Descubre'} text={'Inicia sesion para descubrir todas las novedades de la moda.'}/>
        <SectionCard image={image} title={'Publica'} text={'Publica tus estilos de moda para inspirar a los demás usuarios.'}/>
      </Grid>
      </Flex>

    </section>
  )
}

export default SectionsCardsLP