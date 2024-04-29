import React from 'react'
import { Grid, Flex, Heading, Text, Button } from '@radix-ui/themes'
import image from '../../assets/styleSection.webp'
function SectionsLP() {
  return (
    <section id=''>
      <Grid columns='2' align='center' justify='center' className=' px-28 pb-4 min-h-screen '>
        <Flex>
          <img src={image} className='max-h-96 rounded-2xl' alt="" />
        </Flex>
        <Flex direction='column'  gap='5'>
          <Heading>Explora las últimas tendencias de moda.</Heading>
          <Text size='3'>Descubre las tendencias más recientes en moda con nuestra aplicación móvil y web. Explora una amplia gama de estilos, desde lo clásico hasta lo moderno.</Text>
          <Button radius='none' className='w-1/2'>Explorar</Button>
        </Flex>
      </Grid>

    </section>
  )
}

export default SectionsLP