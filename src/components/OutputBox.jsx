import { Box, Center, Divider, Flex, Image, Img, Link, Stack, Table, Tbody, Td, Text, Textarea, Tr } from "@chakra-ui/react";

const OutputBox = () => {
  // const logoImg = require('../assets/images/logo.png');
  // const logo = URL.createObjectURL(logoImg);
  // console.log('logo', logo)
    return (
      <Box
        w={[300, 400, 500]}
        bg="#fff"
        minHeight="500px"
        m={{ md: '0 auto' }}
        mt={{ md: '50px', sm: '50px' }}
        border="1px solid #ccc"
      >
        {/* <Stack direction="row" height="200px" justifyContent="center" p="10px">
          <Image boxSize="100px" src={require('../assets/images/logo.png')} />
          <Box marginTop="10px !important" borderLeft="2px solid #ccc">
            <Image w="300px" src={require('../assets/images/name.png')} />
            <Image w="300px" src={require('../assets/images/title.png')} />
            <Image w="300px" src={require('../assets/images/cell.png')} />
            <Image w="300px" src={require('../assets/images/tel.png')} />
            <Image w="300px" src={require('../assets/images/mail.png')} />
            <Image w="300px" src={require('../assets/images/website.png')} />
          </Box>
        </Stack> */}
        <Table cellPadding="0">
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
                      <Td borderLeft="1px solid #ccc" p="0" borderBottom="none">
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
      </Box>
    );
}



export default OutputBox;