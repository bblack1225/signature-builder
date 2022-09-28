import { CopyIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton, Image, Link, Table, Tbody, Td, Text, Tr } from "@chakra-ui/react";
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import { IMAGE_B_URL, IMAGE_C_URL } from '../constants/imageUrl';
import { InfoType } from "../constants/InfoType";
import { resetState } from "../redux/createSignatureSlice";

export default function OutputBox(){
    const myBVal = '8px';
    const myCVal = '6px';

    const { typeBCol, typeCCol } = useSelector((state) => state.signatureImg);
    const { isCreate, isDone } = useSelector((state) => state.createSignature);
    const { type } = useSelector((state) => state.signatureType);
    const dispatch = useDispatch();

    const [copyValue, setCopyValue] = useState(type === 'B' ? typeBCol : typeCCol);
    const [isComplete, setIsComplete] = useState(true);
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
      if(isCreate){
        setIsComplete(false);
      }
    },[isCreate]);

    useEffect(() => {
      if(isDone){
        setIsComplete(true);
        dispatch(resetState());
      }
    },[isDone])

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
        <Td border="none">
          <Table
            cellPadding="0"
            style={{ borderCollapse: 'collapse' }}
            border="0"
          >
            <Tbody>
              <tr>
                <td
                  style={{
                    margin: 0,
                    padding: 0,
                    border: 'none',
                    paddingLeft: 7,
                    verticalAlign: 'top',
                    display: 'block',
                    width: 90,
                  }}
                >
                  <Link href="https://www.infolink-group.com/" border="none">
                    <Image htmlWidth="80" src={IMAGE_B_URL} display="block" />
                  </Link>
                </td>
                <td
                  style={{ margin: 0, padding: 0, border: 'none',borderLeft:"1px solid #ccc" }}
                >
                  <Table
                    cellPadding="0"
                    style={{ borderCollapse: 'collapse' }}
                    border="0"
                  >
                    {copyValue.map(
                      (info, index) =>
                        info.img &&
                        (info.type === InfoType.NORMAL ? (
                          <tr>
                            <td
                              style={{
                                margin: 0,
                                padding: 0,
                                border: 'none',
                                paddingLeft: 7,
                              }}
                            >
                              <Image
                                htmlWidth="300"
                                htmlHeight="18"
                                src={info.img}
                                key={index}
                                mt={myBVal}
                              />
                            </td>
                          </tr>
                        ) : (
                          <tr>
                            <td
                              style={{
                                margin: 0,
                                padding: 0,
                                border: 'none',
                                paddingLeft: 7,
                              }}
                            >
                              <Link
                                href={getLinkValue(info.type, info.value)}
                                key={index}
                                border="none"
                                display="block"
                              >
                                <Image
                                  htmlWidth="300"
                                  htmlHeight="18"
                                  src={info.img}
                                  mt={myBVal}
                                />
                              </Link>
                            </td>
                          </tr>
                        ))
                    )}
                  </Table>
                </td>
              </tr>
            </Tbody>
          </Table>
        </Td>
      );
    }

    const typeCOutput = () => {
      return (
        <Td borderBottom="none">
          <Table cellPadding="0" >
            <Tbody>
              <Tr>
                <Td borderBottom="none" p="0" valign="top" bg="#fff">
                  <Link href="https://www.reccessary.com/en">
                    <Image src={IMAGE_C_URL} w="300px" ml="0px" display='block' />
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
        {isComplete ? (
         <>
            <Table cellPadding="0" ref={contentRef} minH='200px' style={{'borderCollapse':"collapse"}} border='0' cellSpacing='0'>
              <Tbody direction="row" height="150px" p="10px">
                <Tr>{type === 'B' ? typeBOutput() : typeCOutput()}</Tr>
              </Tbody>
            </Table>
            <Box textAlign="right" mr="20px">
              <IconButton
                colorScheme="facebook"
                variant="outline"
                borderRadius="50"
                icon={<CopyIcon />}
                onClick={handleCopy}
              />
            </Box>
          </>
        ) :  (
           <Flex justifyContent="center" alignItems="center" h="30%">
            <BeatLoader color="#1B4079" />
          </Flex>
        )}
      </Box>
    );
}