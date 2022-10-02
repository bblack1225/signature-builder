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
                    style={{ borderCollapse: 'collapse',border:'none' }}
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
                                  htmlWidth="300"
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
        <Td style={{ border: 'none' }}>
          <Table
            cellPadding="0"
            style={{ borderCollapse: 'collapse', border: 'none' }}
            cellSpacing="0"
          >
            <tbody>
              <tr>
                <td
                  bg="#fff"
                  style={{
                    margin: '0.1px',
                    padding: 0,
                    border: 'none',
                    verticalAlign: 'top',
                    // width: 300,
                    display: 'block',
                    borderCollapse: 'collapse',
                  }}
                >
                  <Link
                    href="https://www.reccessary.com/en"
                    style={{ border: 'none' }}
                  >
                    <Image
                      src={IMAGE_C_URL}
                      htmlWidth="300"
                      htmlHeight="21"
                      ml="0px"
                      display="block"
                    />
                  </Link>
                  <Table
                    cellPadding="0"
                    style={{ borderCollapse: 'collapse', border: 'none' }}
                    cellSpacing="0"
                  >
                    <tbody>
                      <tr>
                        <td
                          // 這裡沒有margin 0.1 會多出額外的margin ！！
                          style={{
                            margin: '0.1px',
                            padding: '0',
                            border: 'none',
                            verticalAlign: 'top',
                            width: '130',
                            borderCollapse: 'collapse',
                          }}
                        >
                          <Image
                            htmlWidth="18"
                            src={'https://i.imgur.com/ANllioi.png'}
                          />
                        </td>
                        <td
                          style={{
                            // paddingTop: '5px',
                            margin: '0.1px',
                            border: 'none',
                            borderCollapse: 'collapse',
                            // verticalAlign:'top'
                          }}
                        >
                          <Table
                            cellPadding="0"
                            cellSpacing="0"
                            style={{
                              borderCollapse: 'collapse',
                              border: 'none',
                            }}
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
                                          padding: '0px 0px 0px 0px',
                                          border: 'none',
                                          height:'25px',
                                          borderCollapse: 'collapse',
                                        }}
                                      >
                                        <Image
                                          htmlWidth="280"
                                          htmlHeight={
                                            info.columnName === '姓名' ? 24 : 15
                                          }
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
                                          padding: '3px 0 0 0',
                                          border: 'none',
                                          borderCollapse: 'collapse',
                                          display:'block'
                                          // height: '1',
                                        }}
                                      >
                                        <Link
                                          href={getLinkValue(
                                            info.type,
                                            info.value
                                          )}
                                          key={index}
                                          border="none"
                                          display="block"
                                        >
                                          <Image
                                            htmlWidth="280"
                                            htmlHeight="15"
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
                </td>
              </tr>
            </tbody>
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