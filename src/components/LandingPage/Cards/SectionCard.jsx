import React from 'react'
import { Card, Flex, Heading, Text, Inset, Button } from '@radix-ui/themes'

function SectionCard({image, title, text}) {
  return (
    <Card size='1' variant='surface' >
      <Flex direction='column' gap='2' justify='center'>
        <Inset 
          clip="padding-box" 
          side="top" 
          pb="current">
            <img src={image} alt="" style={{
              display: 'block',
              objectFit: 'cover',
              width: '100%',
              height: 175,
              backgroundColor: 'var(--gray-5)',
            }} />
          </Inset>
        <Heading size={{'initial': '2'}}>{title}</Heading>
        <Text size={{'sm':'1', 'md':'2'}} >{text}</Text>
        <Button
          radius='none' 
          className='hover:cursor-pointer'
          size={{'sm': '1', 'md': '2'}}
          >Ver más
        </Button>
      </Flex>
    </Card>
  )
}

export default SectionCard