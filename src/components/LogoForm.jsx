import { ViewIcon } from "@chakra-ui/icons";
import { Box, Center, Flex, Image, Input } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { IMAGE_B_URL, IMAGE_C_URL } from '../constants/imageUrl';
const LogoForm = () => {

  const { type } = useSelector((state) => state.signatureType);

    return (
      <Flex w="100%" p={2} justifyContent="space-between" alignItems="center">
        <Box w="5%">
          <ViewIcon />
        </Box>
        <Box w="40%" textAlign="center">
          <Input borderRadius="20px" placeholder="官網連結" disabled />
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
            <Image
              src={type === 'B' ? IMAGE_B_URL : IMAGE_C_URL}
              boxSize={type === 'B' && 50}
            />
          </Center>
        </Box>
        <Box w="5%" />
      </Flex>
    );
}

export default LogoForm;