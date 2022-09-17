import { ViewIcon } from "@chakra-ui/icons";
import { Box, Center, Flex, Image, Input, Stack, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { selectSignatureType } from "../redux/signatureTypeSlice";

const LogoForm = () => {

  const type = useSelector(selectSignatureType);

    const imageBURL = 'https://i.imgur.com/Yk2soxS.png';
    const imageCURL = 'https://i.imgur.com/U531d5c.png';

    return (
      <Flex w="100%" p={2} justifyContent="space-between" alignItems="center">
        <Box w="5%">
          <ViewIcon />
        </Box>
        <Box w="40%" textAlign="center">
          <Input borderRadius="20px" placeholder="官網連結" />
        </Box>
        <Box w="40%">
          <Center
            border="1px"
            borderColor="gray.200"
            borderRadius={20}
            bg="gray300"
            h="50px"
            textAlign="center"
          >
            <Image src={type === 'B' ? imageBURL : imageCURL} boxSize={type === 'B' && 50} />
          </Center>
        </Box>
        <Box w="5%" />
      </Flex>
    );
}

export default LogoForm;