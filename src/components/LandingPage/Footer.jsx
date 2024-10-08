import React from 'react'
import { Flex, Heading, Text, Button } from '@radix-ui/themes';


function Footer() {
  return (
    <footer>
        <Flex justify='center' gap='9' className='bg-[#111111] text-white py-3 px-12'>
            <Flex direction='column' gap='1' align='center'>
                <Heading size='3'>FashionGEC</Heading>
                <Text size='1'>Quito, Ecuador</Text>
                <Text size='1'>© Derechos reservados 2024</Text>
            </Flex>
        </Flex>

    </footer>
  )
}

export default Footer