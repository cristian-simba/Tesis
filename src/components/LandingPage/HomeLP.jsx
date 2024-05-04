import React from "react";
import { Flex, Heading, Text, Button, Grid } from "@radix-ui/themes";
import image from "../../assets/styleImg.webp";
import { useWindowWidth } from "../../hooks/useWindowWidth";
import { IoIosArrowDown } from "react-icons/io";
import { DowloadButton, InvitateButton } from "./Buttons/LandingBtns";

function HomeLP() {
  const windowWidth = useWindowWidth();

  const headingText = "Haz que tus estilos luzcan perfectos";
  const paragraphText =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut itaque, et enim ad reiciendis mollitia doloremque maxime voluptatibus ea vitae..✨";

  return windowWidth > 768 ? (
    <section id="info">
      <Grid columns="2" align="center" gap="5" className="px-28 min-h-screen">
        <Flex direction="column" gap="6" className="bg-white">
          <Heading size="8">{headingText}</Heading>

          <Text className="text-[#646464]">
            {paragraphText}
          </Text>

          <Flex gap="4">
            <InvitateButton text={"Entrar como invitado"} />
            <DowloadButton text={"Descargar aplicación"} />
          </Flex>
        </Flex>

        <Flex>
          <img src={image} alt="" className=" rounded-md " />
        </Flex>
      </Grid>

      <Flex justify="center" align="center" className="mt-[-70px] py-5  hover:cursor-pointer"
      >
        <a href="#download">
          <Text size={{ sm: "2", md: "3", lg:"5"  }} className="font-bold pr-2">
            Nuestra aplicación
          </Text>
        </a>
        <IoIosArrowDown />
      </Flex>
    </section>
  ) : (
    <section id="info">
      <Flex align="center" gap="5" className="px-8 min-h-screen ">
        <Flex direction="column" gap="6">
          <Heading size="8">{headingText}</Heading>

          <img src={image} alt="" className=" rounded-md " />

          <Text size="3" className="text-[#646464]">
            {paragraphText}
          </Text>

          <Flex gap="3" direction="column">
            <InvitateButton text={"Entrar como invitado"} />
            <DowloadButton text={"Descargar aplicación"} />
          </Flex>
        </Flex>
      </Flex>
    </section>
  );
}

export default HomeLP;
