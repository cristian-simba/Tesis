import React from "react";
import { Grid, Heading, Text, Flex } from "@radix-ui/themes";
import SectionCard from "./Cards/SectionCard";
import { useWindowWidth } from "../../hooks/useWindowWidth";
import { IoIosArrowDown } from "react-icons/io";
import ImgCard1 from '../../assets/ImgCards/ImgCard1.webp'
import ImgCard2 from '../../assets/ImgCards/ImgCard2.webp'
import ImgCard3 from '../../assets/ImgCards/ImgCard3.webp'

function SectionsCardsLP() {
  const windowWidth = useWindowWidth();

  const headingText = "Descubre y comparte tu estilo ideal para cada día";
  const paragraphText =
  "Explora una variedad de estilos y encuentra la inspiración perfecta para cada día con nuestra aplicación.";

  const data = [
    {
      image: ImgCard1,
      title: "Descarga la aplicación",
      text: "Descarga la aplicación para disfrutar de todas las funcionalidades."
    },
    {
      image: ImgCard2,
      title: "Registrate",
      text: "Regístrate para interactuar con las publicaciones que te gusten.",
    },
    {
      image: ImgCard3,
      title: "Comparte tu estilo",
      text: "Únete y comparte tus estilos favoritos para inspirar a otros.",
    },
  ];

  return windowWidth > 768 ? (
    <section id="descubrir">
      <Flex
        direction="column"
        className="min-h-screen py-20"
        justify="center"
        align="center"
        gap="2"
      >
        <Heading className="bg-white">{headingText}</Heading>
        <Text className="mb-5 text-[#646464] bg-white">
          {paragraphText}
        </Text>

        <Grid columns="3" gapX="5" align="center" className=" px-28 pb-4">
          {data.map((card, index) => (
            <SectionCard
              key={index}
              image={card.image}
              title={card.title}
              text={card.text}
            />
          ))}
        </Grid>
      </Flex>
      <Flex justify='center' align='center' className='mt-[-60px] hover:cursor-pointer'>
          <a href="#noticias">
            <Text className="font-bold pr-2">
              Ultimas noticias de moda
            </Text>
          </a>

          <IoIosArrowDown />
        </Flex>
    </section>
  ) : (
    <section id="descubrir">
      <Flex
        direction="column"
        className="min-h-96 pt-20 px-8"
        justify="center"
        align="center"
        gap="2"
      >
        <Heading size="6" className="bg-white">{headingText}</Heading>
        <Text size="3" className="mb-5 text-[#646464] bg-white">
          {paragraphText}
        </Text>

        <Grid columns="1" gap="4" className="pb-4">
          {data.map((card, index) => (
            <SectionCard
              key={index}
              image={card.image}
              title={card.title}
              text={card.text}
            />
          ))}
        </Grid>
      </Flex>
    </section>
  );
}

export default SectionsCardsLP;
