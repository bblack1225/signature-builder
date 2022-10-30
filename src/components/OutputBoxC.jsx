import { CopyIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  IconButton,
  Image,
  Link,
  Table,
  Td,
} from '@chakra-ui/react';
import React, { useRef } from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import { IMAGE_C_URL } from '../constants/imageUrl';
import { InfoType } from '../constants/InfoType';
import { resetState } from '../redux/createSignatureSlice';

export default function OutputBoxC() {
  const { typeCCol } = useSelector((state) => state.signatureImg);
  const { isCreate, isDone } = useSelector((state) => state.createSignature);
  const dispatch = useDispatch();

  const [isComplete, setIsComplete] = useState(true);
  const contentRef = useRef(null);

  const handleCopy = () => {
    const signatureTable = contentRef.current;
    let range, sel;
    if (document.createRange && window.getSelection) {
      range = document.createRange();
      sel = window.getSelection();
      sel.removeAllRanges();
      try {
        range.selectNodeContents(signatureTable);
        sel.addRange(range);
      } catch (e) {
        range.selectNode(signatureTable);
        sel.addRange(range);
      }
      document.execCommand('copy');
    }
    sel.removeAllRanges();
  };

  useEffect(() => {
    if (isCreate) {
      setIsComplete(false);
    }
  }, [isCreate]);

  useEffect(() => {
    if (isDone) {
      setIsComplete(true);
      dispatch(resetState());
    }
  }, [isDone]);

  const getLinkValue = (type, value) => {
    if (type === InfoType.PHONE) {
      return `tel:${value}`;
    } else if (type === InfoType.EMAIL) {
      return `mailto:${value}`;
    } else {
      return value;
    }
  };


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
                          borderCollapse: 'collapse',
                        }}
                      >
                        <Image
                          htmlWidth="20"
                          src={'https://i.imgur.com/ANllioi.png'}
                        />
                      </td>
                      <td
                        style={{
                          margin: '0.1',
                          border: 'none',
                          borderCollapse: 'collapse',
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
                            {typeCCol.map(
                              (info, index) =>
                                info.img &&
                                (info.type === InfoType.NORMAL ? (
                                  <tr key={index}>
                                    <td
                                      style={{
                                        margin: '0.1',
                                        padding:'0px',
                                        border: 'none',
                                        height:
                                          info.columnName === '姓名' ? 32 : 21,
                                        borderCollapse: 'collapse',
                                      }}
                                    >
                                      <Image
                                        htmlWidth={
                                          info.columnName === '姓名' ? 280 : 300
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
                                        padding:'0px',
                                        border: 'none',
                                        borderCollapse: 'collapse',
                                        display: 'block',
                                        height:21
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
                                            htmlWidth="300"
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
  };

  return (
    <>
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
                <tr>{typeCOutput()}</tr>
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
    </>
  );
}
