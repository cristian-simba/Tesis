import React, { useState } from "react";
import { Flex, Heading, Button, Box } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import { useWindowWidth } from "../../hooks/useWindowWidth";
import { IoIosMenu } from "react-icons/io";
import { DowloadButton, InvitateButton } from "../LandingPage/Buttons/LandingBtns";

function PublicNavbar() {
  const windowWidth = useWindowWidth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const data = [
    { href: "/#info", text: "Información" },
    { href: "/#descubrir", text: "Descubrir" },
    { href: "/#noticias", text: "Noticias" },
  ];

  return (
    <nav className="fixed top-0 w-full z-10 bg-[#FCFCFC] ">
      <Flex justify="between" px={{ initial: "5", sm: "8", md: "9" }} py="4">
        <Flex justify="center" align="center" gap="5">
          <Link to="/">
            <Heading>App Logo</Heading>
          </Link>
        </Flex>

        <Flex
          gap="3"
          align="center"
          className="md:text-xs lg:text-sm text-[#646464]"
        >
          {windowWidth > 768 ? (
            <>
              {data.map((item, index) => (
                <a key={index} href={item.href} className="cursor-pointer">
                  {item.text}
                </a>
              ))}
              <DowloadButton text={"Descargar aplicación"} />
            </>
          ) : (
            <button onClick={toggleMenu} className="hover:cursor-pointer">
              <IoIosMenu size="1.5em" />
            </button>
          )}
        </Flex>
      </Flex>

      {isMenuOpen && (
        <Box
          position="absolute"
          top="100%"
          left="0"
          right="0"
          py="4"
          px="6"
          className="bg-white"
        >
          <Flex direction="column" gap="2" className="text-[#646464]">
            {data.map((item, index) => (
              <a key={index} href={item.href}>
                {item.text}
              </a>
            ))}
            <DowloadButton text={"Descargar aplicación"} />
          </Flex>
        </Box>
      )}
    </nav>
  );
}

export default PublicNavbar;
