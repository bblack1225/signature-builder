import { Box, Flex, Image, Input, Text } from "@chakra-ui/react";
import { useCallback } from "react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { updateColumn } from "../redux/signatureImgSlice";

const defaultWidth = 200;

function ImageDropzone({ colHeight, colWidth, colId}){

    const clientId = 'a67c5935c9a0611';

    const { type } = useSelector((state) => state.signatureType);
    const dispatch = useDispatch();

    const [selectedImage, setSelectImage] = useState("");

     const onDrop = useCallback((acceptedFiles) => {
        const formData = new FormData();
        formData.append('image', acceptedFiles[0]);
        fetch('https://api.imgur.com/3/image/', {
          method: 'POST',
          headers: {
            Authorization: `Client-ID ${clientId}`,
          },
          body: formData,
        })
          .then((res) => res.json())
          .then((res) => {
            const img = res.data.link;
            setSelectImage(img);
              const data = {
                form: { img },
                type,
                id: colId,
              };
              dispatch(updateColumn(data));
          });
     }, [type]);

    const { getRootProps, getInputProps } = useDropzone({ 
        onDrop,
        multiple: false
    })

    return (
      <>
        <Flex
          {...getRootProps({ className: 'dropzone' })}
          w={selectedImage ? colWidth : defaultWidth}
          h={colHeight}
          alignItems="center"
          justifyContent="center"
        >
          <Input {...getInputProps()} />
          <Flex w='100%' justifyContent='center'>
            {selectedImage ? (
              <Image
                src={selectedImage}
                alt="image"
                referrerPolicy="no-referrer"
              />
            ) : (
              <Text fontSize="sm">Upload or Drag here</Text>
            )}
          </Flex>
        </Flex>
      </>
    );
}

export default ImageDropzone;