import React from 'react'
import { Grid , Flex, Heading, Text} from '@radix-ui/themes'
import image from  '../../assets/mobile.webp'
import { useWindowWidth } from "../../hooks/useWindowWidth";
import { DowloadButton} from "./Buttons/LandingBtns";
import { IoIosArrowDown } from "react-icons/io";

function SectionDownload() {

  const windowWidth = useWindowWidth();

  const headingText = "Descarga la aplicación";
  const paragraphText = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut itaque, et enim ad reiciendis mollitia doloremque maxime voluptatibus ea vitae..✨"

  return windowWidth > 768 ? (
    <div id='download'>
      <Grid columns="2" align="center" gap="5" className="px-28 min-h-screen">
      <Flex>
          <img src={image} alt="" className=" rounded-md " />
        </Flex>

        <Flex direction="column" gap="4" className="bg-white">
          <Heading size="8">{headingText}</Heading>
          <Text  className="text-[#646464]">
            {paragraphText}
          </Text>
                    
          <Text className='text-blue-700'>Terminos y condiciones</Text>

          <Flex gap="4">
            <DowloadButton text={"Descargar aplicación"} />
          </Flex>
        </Flex>
      </Grid>
      
      <Flex justify="center" align="center" className="mt-[-70px] py-5  hover:cursor-pointer"
      >
        <a href="#descubrir">
          <Text size={{ sm: "2", md: "3", lg:"5" }} className="font-bold pr-2">
            ¿Cómo funciona?
          </Text>
        </a>
        <IoIosArrowDown />
      </Flex>
    </div>
  ): (
    <div id="info">
      <Flex align="center" gap="5" className="px-8 min-h-96 ">
        <Flex direction="column" gap="6">
          <Heading size="7">{headingText}</Heading>

          <img src={image} alt="" className=" rounded-md " />

          <Text size="3" className="text-[#646464]">
            {paragraphText}
          </Text>

          <Flex gap="3" direction="column">
            <DowloadButton text={"Descargar aplicación"} />
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
}

export default SectionDownload