import { CopyIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton, Image, Link, Table, Tbody, Td, Tr } from "@chakra-ui/react";
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import { IMAGE_B_URL, IMAGE_C_URL } from '../constants/imageUrl';
import { InfoType } from "../constants/InfoType";
import { resetState } from "../redux/createSignatureSlice";

export default function OutputBox(){
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
        <Td style={{ border: 'none' }}>
          <Table
            cellPadding="0"
            style={{ borderCollapse: 'collapse', border: 0 }}
            cellSpacing="0"
          >
            <tbody>
              <tr>
                <td
                  style={{
                    margin: '0.1px',
                    padding: '0px 5px 0px 0px',
                    border: 'none',
                    verticalAlign: 'top',
                    display: 'block',
                    width: '90',
                    borderCollapse: 'collapse',
                  }}
                >
                  <Link href="https://www.infolink-group.com/" border="none">
                    <Image htmlWidth="90" src={IMAGE_B_URL} display="block" />
                  </Link>
                </td>
                <td
                  style={{
                    padding: 0,
                    border: 'none',
                    borderLeft: '1px solid #ccc',
                  }}
                >
                  <Table
                    cellPadding="0"
                    cellSpacing="0"
                    role="presentation"
                    border="0"
                    style={{ borderCollapse: 'collapse' }}
                  >
                    <tbody>
                      {copyValue.map(
                        (info, index) =>
                          info.img &&
                          (info.type === InfoType.NORMAL ? (
                            <tr key={index}>
                              <td
                                style={{
                                  margin: '0.1px',
                                  padding: '0px 0px 3px 10px',
                                  border: 'none',
                                  borderCollapse: 'collapse',
                                  height: '23',
                                }}
                              >
                                <Image
                                  htmlWidth="300px"
                                  htmlHeight={info.columnName === '姓名' ? '21':'18'}
                                  src={info.img}
                                  key={index}
                                />
                              </td>
                            </tr>
                          ) : (
                            <tr key={index}>
                              <td
                                style={{
                                  margin: '0.1px',
                                  padding: '3px 0px 0px 7px',
                                  border: 'none',
                                  borderCollapse: 'collapse',
                                  height: '23',
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
                                  />
                                </Link>
                              </td>
                            </tr>
                          ))
                      )}
                    </tbody>
                  </Table>
                </td>
              </tr>
            </tbody>
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
            <Box ref={contentRef}>
              <Table
                cellPadding="0"
                ref={contentRef}
                style={{
                  borderCollapse: 'collapse',
                  border: 0,
                  minHeight: '200px',
                }}
                cellSpacing="0"
              >
                <tbody>
                  <tr>{type === 'B' ? typeBOutput() : typeCOutput()}</tr>
                </tbody>
              </Table>
            </Box>
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
        ) : (
          <Flex justifyContent="center" alignItems="center" h="30%">
            <BeatLoader color="#1B4079" />
          </Flex>
        )}
      </Box>
    );
}