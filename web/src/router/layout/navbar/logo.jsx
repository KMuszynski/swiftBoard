import { Box, Flex, Heading, Icon, Stack } from "@chakra-ui/react";
import { HiOutlineBuildingLibrary } from "react-icons/hi2";
import { Link } from "react-router-dom";

import { HOME } from "@/router/paths";

const Logo = () => (
  <Flex as={Link} to={HOME} align="center" gap={2}>
    <Icon as={HiOutlineBuildingLibrary} boxSize={16} />
    <Box alignSelf="stretch" w="2px" bg="black" _dark={{ bg: "white" }} />
    <Stack spacing={-2}>
      <Heading size="lg">SwiftBoard</Heading>
    </Stack>
  </Flex>
);

export default Logo;
