import React from 'react'
import { Card, Flex, Heading, Text, Inset } from '@radix-ui/themes'

function SectionCard({image, title, text}) {
  return (
    <Card size='1' variant='surface'>
      <Flex direction='column' gap='5' justify='center'  >
      <Inset clip="padding-box" side="top" pb="current">
        <img src={image} alt="" style={{
          display: 'block',
          objectFit: 'cover',
          width: '100%',
          height: 200,
          backgroundColor: 'var(--gray-5)',
        }} />
        </Inset>
        <Heading size='4'>{title}</Heading>
        <Text size="3">{text}</Text>
      </Flex>
    </Card>
  )
}

export default SectionCard