import './App.css';
import { Box, Button, ButtonGroup, Center, Flex } from '@chakra-ui/react';
import InputBox from './components/InputBox';
import OutputBox from './components/OutputBox';

function App() {
  return (
      <Box
        p="30"
        justifyContent={{ lg: 'space-around' }}
        mt="100px"
        minH="500px"
        display={{ lg: 'flex' }}
      >
        <InputBox />
        <OutputBox />
      </Box>
  );
}

export default App;
