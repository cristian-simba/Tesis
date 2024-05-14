import React from 'react'
import { Grid , Flex, Heading, Text, Strong} from '@radix-ui/themes'
import { useWindowWidth } from "../../hooks/useWindowWidth";
import { RxGithubLogo } from "react-icons/rx";
import { RxLinkedinLogo } from "react-icons/rx";
import cristianIMG from "../../assets/developers/cristian.webp"
import erickImg from "../../assets/developers/erick.jfif"
import gilmarImg from "../../assets/developers/gilmar.jfif"

function SectionGroup() {
  const windowWidth = useWindowWidth();

  const headingText = "Equipo de Desarrollo";

  const data = [
    {
      imgSrc: gilmarImg,
      name: "Gilmar Morales",
      description: "Estoy aprendiendo a desarrollar software e interesado en la programación. Busco colaborar con diferentes empresas para mejorar la efectividad de sus sistemas.",
      work: "Desarrollador Móvil",
      githubLink: "https://github.com/Morales-Gilmar-Vladimir",
      linkedinLink: "https://www.linkedin.com/in/gilmar-morales-b93659241/"
    },
    {
      imgSrc: erickImg,
      name: "Erick Ruiz",
      description: "Estoy interesado en la programación, hacking y las inteligencias artificiales. Busco colaborar en empresas donde pueda aplicar todos los conocimientos aprendidos en mi carrera.",
      work: "Desarrollador Backend",
      githubLink: "https://github.com/Ruizerick26",
      linkedinLink: "https://www.linkedin.com/in/rcee0234134/"
    },
    {
      imgSrc: cristianIMG,
      name: "Cristian Simba",
      description: "Manejo diferentes lenguajes de programación y bases de datos, pero estoy aprendiendo más de este mundo. Busco colaborar con diferentes empresas para mejorar mis habilidades.",
      work: "Desarrollador Frontend",
      githubLink: "https://github.com/cristian-simba",
      linkedinLink: "https://linkedin.com/in/cristian-simba-b59739242"
    }
  ];

  return windowWidth > 768 ? (
    <div id='equipo' className='px-28 pt-20 min-h-screen'>
      <Heading size='8' className='bg-white'>{headingText}</Heading>
      <Grid rows="3" align="center" gapY='5' className="py-10">
        {data.map((item, index) => (
          <Flex key={index} gap='5' align='center' className='pb-2 border-b-2 bg-white'>
            <Flex>
              <img src={item.imgSrc} alt='img' className='w-[200px] rounded-full' />
            </Flex>
            <Flex direction='column' gap='2'>
              <Text size='4'><Strong>{item.name}</Strong></Text>
              <Text className='font-medium'>{item.work}</Text>
              <Text>{item.description}</Text>
              <Flex gap='3'>
                <a href={item.githubLink} target='blank_'>
                  <RxGithubLogo size='20' className='hover:cursor-pointer' />
                </a>
                <a href={item.linkedinLink} target='blank_'>
                  <RxLinkedinLogo size='20' className='hover:cursor-pointer' />
                </a>
              </Flex>
            </Flex>
          </Flex>
        ))}
      </Grid>
    </div>
  ) : (
    <div id='equipo' className='px-8 pt-20 min-h-screen'>
    <Heading size='8' className='bg-white' >{headingText}</Heading>
    <Grid rows="3" align="center" gapY='5' className="pt-10">
      {data.map((item, index) => (
        <Flex key={index} gap='4' align='center' className='pb-2 border-b-2 border-gray-300 rounded-lg bg-white'>
          <Flex>
            <img src={item.imgSrc} className='w-28 rounded-full' />
          </Flex>
          <Flex direction='column' gap='2'>
            <Text size='4'><Strong>{item.name}</Strong></Text>
            <Text>{item.work}</Text>
            <Flex gap='3'>
              <a href={item.githubLink} target='blank_'>
                <RxGithubLogo size='20' className='hover:cursor-pointer' />
              </a>
              <a href={item.linkedinLink} target='blank_'>
                <RxLinkedinLogo size='20' className='hover:cursor-pointer' />
              </a>
            </Flex>
          </Flex>
        </Flex>
      ))}
    </Grid>
  </div>
  );
}

export default SectionGroup