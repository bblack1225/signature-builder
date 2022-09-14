import { Box, Button, Flex, Image, Input, Text } from "@chakra-ui/react";
import { useCallback } from "react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { updateColumn, updateLogoColumn } from "../redux/signatureImgSlice";

const defaultWidth = 200;

function ImageDropzone({ colHeight, colWidth, colId}){

    const clientId = 'a67c5935c9a0611';

    const { type } = useSelector((state) => state.signatureType);

    const dispatch = useDispatch();

    const [selectedImage, setSelectImage] = useState("");

    // const onDrop = useCallback(acceptedFiles => {
    //     const img = URL.createObjectURL(acceptedFiles[0]);
    //     uploadApi(acceptedFiles[0]);
    //     setTest(acceptedFiles[0]);
    //     setSelectImage(img);
    //     if(colId){
    //         const data = {
    //         form: { img },
    //         type,
    //         id: colId,
    //         };
    //         dispatch(updateColumn(data));
    //     }else {
    //         dispatch(updateLogoColumn({ img }));
    //     }
        
    // },[])

     const onDrop = useCallback((acceptedFiles) => {
        const formData = new FormData();
        formData.append('image', acceptedFiles[0]);
        fetch('https://api.imgur.com/3/image/', {
          method: 'POST',
          headers: {
            Authorization: 'Client-ID a67c5935c9a0611',
          },
          body: formData,
        })
          .then((res) => res.json())
          .then((res) => {
            console.log('data', res.data);
            console.log('data.link', res.data.link);
            const img = res.data.link;
            console.log('img', img);
            setSelectImage(img);
            if (img) {
              const data = {
                form: { img },
                type,
                id: colId,
              };
              dispatch(updateColumn(data));
            } else {
                console.log('???')
              dispatch(updateLogoColumn({ img }));
            }
          });
    //    const img = URL.createObjectURL(acceptedFiles[0]);
    //    uploadApi(acceptedFiles[0]);
    //    setTest(acceptedFiles[0]);
    //    setSelectImage(img);
    //    if (colId) {
    //      const data = {
    //        form: { img },
    //        type,
    //        id: colId,
    //      };
    //      dispatch(updateColumn(data));
    //    } else {
    //      dispatch(updateLogoColumn({ img }));
    //    }
     }, []);


    

    const uploadApi = (file) => {
        const formData = new FormData();
        console.log('test file:', file);
        formData.append('image', file);
        fetch('https://api.imgur.com/3/image/', {
          method: 'POST',
          headers: {
            Authorization: 'Client-ID adcc986603d8507',
          },
          body: formData,
        })
          .then((res) => res.json())
          .then((data) => setSelectImage(data.li));
    }

    const { getRootProps, getInputProps } = useDropzone({ 
        onDrop,
        multiple: false
    })

    return (
      <>
        {' '}
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
              <Image
                src={selectedImage}
                alt="image"
                referrerPolicy="no-referrer"
              />
            ) : (
              <Text fontSize="sm">Upload or Drag here</Text>
            )}
          </Box>
        </Flex>
      </>
    );
}

export default ImageDropzone;