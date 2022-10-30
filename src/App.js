import './App.css';
import { Box, Button, Flex } from '@chakra-ui/react';
import InputBox from './components/InputBox';
import { useSelector } from 'react-redux';
import OutputBoxC from './components/OutputBoxC';
import OutputBoxB from './components/OutputBoxB';

function App() {

  const { type } = useSelector((state) => state.signatureType);
  
  return (
    <Box
      p="30"
      justifyContent={{ lg: 'space-around' }}
      mt="50px"
      minH="500px"
      display={{ lg: 'flex' }}
    >
      <InputBox />
      {/* <Box> */}
        {/* <Flex justifyContent="center" mt={{lg: 0, md:20, sm: '20'}}>
          <Box px={3}>
            <Button>Gmail</Button>
          </Box>
          <Box px={3}>
            <Button>Apple Mail</Button>
          </Box>
          <Box px={3}>
            <Button>Outlooks</Button>
          </Box>
          <Box px={3}>
            <Button>Default</Button>
          </Box>
        </Flex> */}
        <Box
          w={[300, 400, 500]}
          bg="#fff"
          minHeight="500px"
          m={{ md: '0 auto' }}
          mt={{ md: '50px', sm: '50px' }}
          border="1px solid #ccc"
        >
          {type === 'B' ? <OutputBoxB /> : <OutputBoxC />}
        </Box>
      {/* </Box> */}
    </Box>
  );
}

export default App;
