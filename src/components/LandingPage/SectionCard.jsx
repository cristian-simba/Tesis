import React from 'react'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'

function SectionCard({image, title, text}) {
  return (
    <Card size='1' variant='surface'>
      <Flex direction='column' gap='5' justify='center' className='p-2' >
        <img src={image} className='rounded-lg' alt="" />
        <Heading size='4'>{title}</Heading>
        <Text size="3">{text}</Text>
      </Flex>
    </Card>
  )
}

export default SectionCard