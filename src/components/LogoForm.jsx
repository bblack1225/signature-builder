import { ViewIcon } from "@chakra-ui/icons";
import { Box, Center, Flex, Input, Stack, Text } from "@chakra-ui/react";
import { useDropzone } from 'react-dropzone'
import { useSelector } from "react-redux";
import ImageDropzone from "./ImageDropzone";

const LogoForm = () => {

    const { type } = useSelector((state) => state.signatureType);
    const imageBURL = 'https://i.imgur.com/Yk2soxS.png';

    return (
      <Flex w="100%" p={2} justifyContent='space-between' alignItems='center'>
        <Box w='5%'><ViewIcon /></Box>
        <Box w='40%' textAlign='center'>
          <Input borderRadius='20px' placeholder="官網連結" />
        </Box>
        <Box w='40%'>
          <Center border="1px" borderColor="gray.200" borderRadius={20} bg='gray300' h='50px' textAlign='center'>
            {/* <Box > */}
              {/* <Input colWidth={50} colHeight={50} /> */}
            {/* </Box> */}
          </Center>
        </Box>
        <Box w='5%' />
      </Flex>
    );
}

export default LogoForm;