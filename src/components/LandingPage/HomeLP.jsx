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
  "Explora las últimas tendencias y encuentra tu estilo perfecto. Descubre estilos clásicos hasta las últimas novedades, nuestra aplicación ofrece una amplia gama de opciones para cada ocasión ✨";

  return windowWidth > 768 ? (
    <div id="info">
      <Grid columns="2" align="center" gap="5" className="px-28 min-h-screen">
        <Flex direction="column" gap="6" className="bg-white">
          <Heading size="8">{headingText}</Heading>

          <Text className="text-[#646464]" >
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
          <Text  className="font-bold pr-2">
            Nuestra aplicación
          </Text>
        </a>
        <IoIosArrowDown />
      </Flex>
    </div>
  ) : (
    <div id="info">
      <Flex align="center" gap="5" className="px-8 min-h-screen ">
        <Flex direction="column" gap="6">
          <Heading size="8">{headingText}</Heading>

          <img src={image} alt="" className=" rounded-md " />

          <Text size="3" className="text-[#646464] bg-white">
            {paragraphText}
          </Text>

          <Flex gap="3" direction="column" className="bg-white">
            <InvitateButton text={"Entrar como invitado"} />
            <DowloadButton text={"Descargar aplicación"} />
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
}

export default HomeLP;
