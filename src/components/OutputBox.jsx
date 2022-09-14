import { CopyIcon } from "@chakra-ui/icons";
import { Box, Button, Center, Divider, Flex, IconButton, Image, Img, Link, Stack, Table, Tbody, Td, Text, Textarea, Tooltip, Tr } from "@chakra-ui/react";
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { useDispatch, useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import { InfoType } from "../constants/InfoType";
import { completeSignature } from "../redux/createSignatureSlice";

export default function OutputBox(){
    const { typeBCol, typeCCol, logoForm } = useSelector((state) => state.signatureImg);
    const { isCreate } = useSelector((state) => state.createSignature);
    const { type } = useSelector((state) => state.signatureType);
    const dispatch = useDispatch();

    const [copyValue, setCopyValue] = useState(type === 'B' ? typeBCol : typeCCol);
    const [isCopied, setIsCopied] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const contentRef = useRef(null);

    const handleCopy = () => {
      const signatureTable = contentRef.current;
      console.log('signatureTable', signatureTable);
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
    
    // const displayImageView = () => {
    //    return ({
    //     copyValue.map((col) => {(
    //       col.type === InfoType.NORMAL 
    //         ? <Image
    //                  w="250px"
    //                  src={col.img}/> 
    //                  :
    //                 <Link href={col.type === InfoType.PHONE ? `tel:${col.value}`
    //                         : col.type === InfoType.EMAIL ? `mailto:${col.value}` : `${col.value}`}>
    //                 </Link> )}
    //    })
    // }

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
                <Tr>
                  <Td borderBottom="none">
                    <Table cellPadding="0">
                      <Tbody>
                        <Tr>
                          <Td borderBottom="none" p="0" valign="top">
                            <Link href="https://www.infolink-group.com/">
                              <Image boxSize="90px" src={logoForm.img} />
                            </Link>
                          </Td>
                          <Td
                            borderLeft="1px solid #ccc"
                            p="0"
                            borderBottom="none"
                          >
                            {copyValue.map((info, index) => (
                                info.type === InfoType.WEBSITE ? (
                                <Link href={info.value}  key={index}>
                                  <Image w="250px" src={info.img} />
                                </Link>
                                ) : info.type === InfoType.PHONE ? (
                                <Link href={`tel:${info.value}`} key={index}>
                                  <Image w="250px" src={info.img} />
                                </Link>
                                ) : info.type === InfoType.EMAIL ? (
                                <Link href={`mailto:${info.value}`} key={index}>
                                  <Image w="250px" src={info.img} />
                                </Link>
                                ): (
                                <Image w="250px" src={info.img} key={index} />)
                            ))}
                            {/* <Image
                              w="250px"
                              src={require('../assets/images/name.png')}
                            />
                            <Image
                              w="250px"
                              src={require('../assets/images/titlecopy.png')}
                            />
                            <Link href="tel:0919775622">
                              <Image
                                w="250px"
                                src={require('../assets/images/cellcopy.png')}
                              />
                            </Link>
                            <Link>
                              <Image
                                w="250px"
                                src={require('../assets/images/tel.png')}
                              />
                            </Link>
                            <Link href="mailto:black60137@gmail.com">
                              <Image
                                w="250px"
                                src={require('../assets/images/mail.png')}
                              />
                            </Link>
                            <Image
                              w="250px"
                              src={require('../assets/images/website.png')}
                            /> */}
                          </Td>
                        </Tr>
                      </Tbody>
                    </Table>
                  </Td>
                </Tr>
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