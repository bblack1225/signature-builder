import { Box, Center, Flex, Input, Stack, Text } from "@chakra-ui/react";
import { useDropzone } from 'react-dropzone'

const LogoForm = () => {

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
      accept: {
        'image/jpeg': [],
        'image/png': [],
      },
    });

    const files = acceptedFiles.map((file) => {
     return ( <li key={file.path}>
        {file.path} - {file.size} bytes
      </li> )}
    );

    return (
      <Flex w="100%" p={4} justifyContent='space-between' alignItems='center'>
        <Box w='30%'>LOGO</Box>
        <Box w='70%'>
          <Center border="1px" borderColor="gray.200" borderRadius={20} bg='white' h='50px' textAlign='center'>
            <Box {...getRootProps({ className: 'dropzone' })}>
              <Input {...getInputProps()} size='lg' />
              <Text>Upload or drag Here....</Text>
            </Box>
            {/* <aside>
              <ul>{files}</ul>
            </aside> */}
          </Center>
        </Box>
      </Flex>
    );
}

export default LogoForm;