import { Flex, Heading, Text } from '@radix-ui/themes'

export default function NoEncontrado() {
  return (
    <Flex justify='center' align='center' direction='column' className='min-h-screen px-10' gap='4'>
      <img src="https://static.vecteezy.com/system/resources/previews/007/162/540/non_2x/error-404-page-not-found-concept-illustration-web-page-error-creative-design-modern-graphic-element-for-landing-page-infographic-icon-free-vector.jpg" alt="" className='w-[400px]'/>
      <Heading>Página no encontrada</Heading>
      <Text className='text-center'>Puede que la página que busques haya sido eliminada o la dirección no exista</Text>
    </Flex>
  )
}

