import { ViewIcon } from "@chakra-ui/icons";
import { Box, Center, Flex, Input, Stack, Text } from "@chakra-ui/react";
import { useDropzone } from 'react-dropzone'
import ImageDropzone from "./ImageDropzone";

const LogoForm = () => {

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
      accept: {
        'image/jpeg': [],
        'image/png': [],
      },
    });

    return (
      <Flex w="100%" p={2} justifyContent='space-between' alignItems='center'>
        <Box w='5%'><ViewIcon /></Box>
        <Box w='40%' textAlign='center'>
          <Input borderRadius='20px' placeholder="官網連結" />
        </Box>
        <Box w='40%'>
          <Center border="1px" borderColor="gray.200" borderRadius={20} bg='white' h='50px' textAlign='center'>
            <Box {...getRootProps({ className: 'dropzone' })}>
              <ImageDropzone colWidth={50} colHeight={50} />
            </Box>
          </Center>
        </Box>
        <Box w='5%' />
      </Flex>
    );
}

export default LogoForm;