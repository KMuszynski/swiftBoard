import { Container, Flex } from "@chakra-ui/react";

import Logo from "./logo";
import NavbarMenu from "./menu";

const Navbar = () => {
  return (
    <Flex py={4} minH="60px" boxShadow="lg">
      <Container maxW="container.xl">
        <Flex align="center" justify="space-between">
          <Logo />
          <NavbarMenu />
        </Flex>
      </Container>
    </Flex>
  );
};

export default Navbar;
