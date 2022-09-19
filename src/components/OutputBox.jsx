import { CopyIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton, Image, Link, Table, Tbody, Td, Text, Tr } from "@chakra-ui/react";
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import { InfoType } from "../constants/InfoType";
import { completeSignature } from "../redux/createSignatureSlice";

export default function OutputBox(){
    const myBVal = '8px';
    const myCVal = '6px';

    const imageBURL = 'https://i.imgur.com/Yk2soxS.png';
    const imageCURL = 'https://i.imgur.com/U531d5c.png';
    const { typeBCol, typeCCol } = useSelector((state) => state.signatureImg);
    const { isCreate } = useSelector((state) => state.createSignature);
    const { type } = useSelector((state) => state.signatureType);
    const dispatch = useDispatch();

    const [copyValue, setCopyValue] = useState(type === 'B' ? typeBCol : typeCCol);
    const [isComplete, setIsComplete] = useState(false);
    const contentRef = useRef(null);

    const handleCopy = () => {
      const signatureTable = contentRef.current;
      let range, sel
      if(document.createRange && window.getSelection) {
        range = document.createRange();
        sel = window.getSelection();
        sel.removeAllRanges();
        try {
          range.selectNodeContents(signatureTable);
          sel.addRange(range);
        }catch(e) {
          range.selectNode(signatureTable);
          sel.addRange(range);
        }
        document.execCommand('copy');

      }
      sel.removeAllRanges();
    }

    useEffect(() => {
      const timer = setTimeout(() => {
          dispatch(completeSignature());
          setIsComplete(true)
        }, 1500)

      return () => clearTimeout(timer);
    },[isCreate]);

    useEffect(() => {
      const column = type === 'B' ? typeBCol : typeCCol;
      setCopyValue(column);
    }, [type, typeBCol, typeCCol]);

    const getLinkValue= (type, value) => {
      if(type === InfoType.PHONE){
        return `tel:${value}`
      }else if(type === InfoType.EMAIL){
        return `mailto:${value}`
      }else {
        return value;
      }
    }

    const typeBOutput = () => {
      return (
        <Td borderBottom="none">
          <Table cellPadding="0">
            <Tbody>
              <Tr>
                <Td borderBottom="none" p="0" valign="top" bg="#fff">
                  <Link href="https://www.infolink-group.com/">
                    <Image boxSize="90px" src={imageBURL} mr="5px" />
                  </Link>
                </Td>
                <Td borderLeft="1px solid #ccc" p="0" borderBottom="none">
                  {copyValue.map((info, index) =>
                    info.type === InfoType.NORMAL ? (
                      <Image
                        w="250px"
                        src={info.img}
                        key={index}
                        my={myBVal}
                        ml="10px"
                      />
                    ) : (
                      <Link
                        href={getLinkValue(info.type, info.value)}
                        key={index}
                      >
                        <Image w="250px" src={info.img} my={myBVal} ml="7px" />
                      </Link>
                    )
                  )}
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Td>
      );
    }

    const typeCOutput = () => {
      return (
        <Td borderBottom="none">
          <Table cellPadding="0">
            <Tbody>
              <Tr>
                <Td borderBottom="none" p="0" valign="top" bg="#fff">
                  <Link href="https://www.infolink-group.com/">
                    <Image src={imageCURL} w="300px" ml="0px" />
                  </Link>
                  <Flex>
                    <Box w="18px">
                      <Image w="20px" src={'https://i.imgur.com/ANllioi.png'} />
                    </Box>
                    <Box ml={myCVal}>
                      {copyValue.map((info, index) =>
                        info.type === InfoType.NORMAL ? (
                          <Image
                            w="250px"
                            src={info.img}
                            key={index}
                            my={myCVal}
                          />
                        ) : (
                          <Link
                            href={getLinkValue(info.type, info.value)}
                            key={index}
                          >
                            <Image w="250px" src={info.img} my={myCVal} />
                          </Link>
                        )
                      )}
                    </Box>
                  </Flex>
                  {/* </Td> */}
                  {/* <Td borderLeft="1px solid #ccc" p="0" borderBottom="none"> */}
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Td>
      );
    }
    
    return (
      <Box
        w={[300, 400, 500]}
        bg="#fff"
        minHeight="500px"
        m={{ md: '0 auto' }}
        mt={{ md: '50px', sm: '50px' }}
        border="1px solid #ccc"
      >
        {isCreate ? (
           <Flex justifyContent="center" alignItems="center" h="30%">
            <BeatLoader color="#1B4079" />
          </Flex> 
        ) : isComplete ? (
          <>
            <Table cellPadding="0" ref={contentRef}>
              <Tbody direction="row" height="150px" p="10px">
                <Tr>{type === 'B' ? typeBOutput() : typeCOutput()}</Tr>
              </Tbody>
            </Table>
            <Box textAlign="right" mr="20px">
              {/* <Tooltip hasArrow bg="gray.200" label={text}> */}
              <IconButton
                colorScheme="facebook"
                variant="outline"
                borderRadius="50"
                icon={<CopyIcon />}
                onClick={handleCopy}
              />
              {/* </Tooltip> */}
            </Box>
          </>
         ) : (
          <Text>Not Upload</Text>
        )}
      </Box>
    );
}