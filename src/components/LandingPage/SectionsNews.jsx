import React from 'react'
import { Grid, Flex, Heading, Text, Button } from '@radix-ui/themes'
import image from '../../assets/styleSection.webp'
function SectionsNews() {
  return (
    <section id='noticias'>
      <Grid columns='1' align='center' justify='center' className='px-28 pb-4 min-h-screen '>

        <Flex direction='column'  gap='5'>
          <Heading size='8'>Las últimas tendencias de moda.</Heading>
          <Text size='3' >Aqui se consume la API de moda</Text>
        </Flex>
      </Grid>

    </section>
  )
}

export default SectionsNews