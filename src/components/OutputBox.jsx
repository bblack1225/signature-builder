import { CopyIcon } from "@chakra-ui/icons";
import { Box, Button, Center, Divider, Flex, IconButton, Image, Img, Link, Stack, Table, Tbody, Td, Text, Textarea, Tooltip, Tr } from "@chakra-ui/react";
import { useRef } from "react";
import { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";

export default function OutputBox(){
    const { typeBCol, typeCCol } = useSelector((state) => state.signatureImg);
    const { isCreate } = useSelector((state) => state.createSignature);
    const { type } = useSelector((state) => state.signatureType);
    const [copyValue, setCopyValue] = useState(type === 'B' ? typeBCol : typeCCol);
    const [isCopied, setIsCopied] = useState(false);
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
          <BeatLoader color="#1B4079" />
        ) : (
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
                              <Image
                                boxSize="100px"
                                src={require('../assets/images/logo.png')}
                              />
                            </Link>
                          </Td>
                          <Td
                            borderLeft="1px solid #ccc"
                            p="0"
                            borderBottom="none"
                          >
                            <Image
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
                            />
                          </Td>
                        </Tr>
                      </Tbody>
                    </Table>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
            <Box textAlign='right' mr='20px'>
              <Tooltip label="複製" fontSize="md" bg="gray.100">
                <IconButton
                variant='outline'
                bg='gray.200'
                borderRadius='50'
                  icon={<CopyIcon />}
                  onClick={handleCopy}
                />
              </Tooltip>
            </Box>
          </>
        )}
      </Box>
    );
}