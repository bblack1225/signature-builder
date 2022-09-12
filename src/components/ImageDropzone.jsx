import { Box, Flex, Image, Input, Text } from "@chakra-ui/react";
import { useCallback } from "react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

const defaultWidth = 200;

function ImageDropzone({ colHeight, colWidth}){

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
      <Flex
        {...getRootProps({ className: 'dropzone' })}
        w={selectedImage ? colWidth : defaultWidth}
        h={colHeight}
        alignItems="center"
        justifyContent="center"
      >
        <Input {...getInputProps()} />
        <Box>
          {selectedImage ? (
            <Image src={selectedImage} alt="image" />
          ) : (
            <Text fontSize="sm">Upload or Drag here</Text>
          )}
        </Box>
      </Flex>
    );
}

export default ImageDropzone;