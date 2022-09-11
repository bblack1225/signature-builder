import { Box, Flex, Image, Input, Text } from "@chakra-ui/react";
import { useCallback } from "react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

function ImageDropzone(){

    const [selectedImage, setSelectImage] = useState("");

    const onDrop = useCallback(acceptedFiles => {
        console.log('acceptedFiles', acceptedFiles);
        const imageUrl = URL.createObjectURL(acceptedFiles[0]);
        setSelectImage(imageUrl);
    },[])

    const { getRootProps, getInputProps } = useDropzone({ 
        onDrop,
        multiple: false
    })

    return (
      <Box {...getRootProps({ className: 'dropzone' })} w="200px" h="50px">
          <Input {...getInputProps()} />
        {selectedImage && <Image src={selectedImage} alt="image" />}
        {/* :<Box mt='20px'><Text>Upload or Drag here</Text></Box> */}
      </Box>
    );
}

export default ImageDropzone;