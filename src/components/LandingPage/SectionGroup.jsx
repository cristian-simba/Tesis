import React from 'react'
import { Grid , Flex, Heading, Text, Strong} from '@radix-ui/themes'
import { useWindowWidth } from "../../hooks/useWindowWidth";
import { RxGithubLogo } from "react-icons/rx";
import { RxLinkedinLogo } from "react-icons/rx";
import cristianIMG from "../../assets/developers/cristian.webp"

function SectionGroup() {
  const windowWidth = useWindowWidth();

  const headingText = "Equipo de Desarrollo";

  const data = [
    {
      imgSrc: "https://www.elmueble.com/medio/2024/03/18/perro-de-raza-pitbull_62fd02b2_240318130402_900x900.jpg",
      name: "Gilmar Morales",
      description: "Des 1",
      work: "Desarrollador Móvil",
      githubLink: "/1",
      linkedinLink: "/1"
    },
    {
      imgSrc: "https://www.elmueble.com/medio/2024/03/18/perro-de-raza-pitbull_62fd02b2_240318130402_900x900.jpg",
      name: "Erick Ruiz",
      description: "Des 2",
      work: "Desarrollador Backend",
      githubLink: "/2",
      linkedinLink: "/2"
    },
    {
      imgSrc: cristianIMG,
      name: "Cristian Simba",
      description: "",
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
          <Flex key={index} gap='5' align='center' className='pb-2 border-b-2  bg-white'>
            <Flex>
              <img src={item.imgSrc} alt='img' className='w-32 rounded-full' />
            </Flex>
            <Flex direction='column' gap='2'>
              <Text size='4'><Strong>{item.name}</Strong></Text>
              <Text>{item.work}</Text>
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