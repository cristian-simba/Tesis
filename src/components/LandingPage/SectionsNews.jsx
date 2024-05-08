import { useState, useEffect } from 'react'
import { Grid, Flex, Heading, Text, Button } from '@radix-ui/themes'
import { getNoticias } from '../../api/moda.api'
import { useWindowWidth } from "../../hooks/useWindowWidth";

function SectionsNews() {

  const windowWidth = useWindowWidth();
  const [noticias, setNoticias] = useState([])

  useEffect(() => {
    const loadNoticias = async () => {
      const response = await getNoticias()
      setNoticias(response.value)
      
    }
    loadNoticias()
    console.log(noticias)
  }, [])

  return  windowWidth > 768 ? (
    <section id='noticias'>
      <Grid align='center' justify='center' className='px-28 pb-4 pt-8 min-h-screen '>
        <Flex direction='column' gap='5' className='bg-white'>
          <Heading size='8'>Las últimas noticias de la moda.</Heading>
            <Grid gap='5'>
            {noticias.map((noticia, index) => (
              <Flex gap='5' key={index}>
                {/* <Flex>
                  <img src={noticia.image.thumbnail.contentUrl} alt={noticia.name} className='rounded-lg w-max' />
                </Flex> */}
                <Flex direction='column' gap='3' className=''>
                  <Heading size='4'>{noticia.name}</Heading>
                  <Text>{noticia.description}</Text>
                  <a href={noticia.url} target='_blank'>
                    <Button className='hover:cursor-pointer'>
                      Leer más
                    </Button>
                  </a>
                </Flex>
              </Flex>
            ))}
            </Grid>
        </Flex>     
      </Grid>
    </section>
  ) : (
    <section id='noticias'>
      <Grid className='min-h-96 px-8 py-20'>
        <Flex direction='column' gap='5' className='bg-white'>
          <Heading size='7'>Las últimas noticias de la moda.</Heading>
            <Grid gap='5'>
            {noticias.map((noticia, index) => (
              <Flex gap='5' key={index}>
                {/* <Flex>
                  <img src={noticia.image.thumbnail.contentUrl} alt={noticia.name} className='rounded-lg w-max' />
                </Flex> */}
                <Flex direction='column' gap='3' className=''>
                  <Heading size='4'>{noticia.name}</Heading>
                  <Text>{noticia.description}</Text>
                  <a href={noticia.url} target='_blank'>
                    <Button className='hover:cursor-pointer'>
                      Leer más
                    </Button>
                  </a>
                </Flex>
              </Flex>
            ))}
            </Grid>
        </Flex>     
      </Grid>
    </section>
  )
}

export default SectionsNews