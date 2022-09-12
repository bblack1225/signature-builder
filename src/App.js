import './App.css';
import { Box } from '@chakra-ui/react';
import InputBox from './components/InputBox';
import OutputBox from './components/OutputBox';

function App() {
  return (
      <Box
        p="30"
        justifyContent={{ lg: 'space-around' }}
        mt="50px"
        minH="500px"
        display={{ lg: 'flex' }}
      >
        <InputBox />
        <OutputBox />
      </Box>
  );
}

export default App;
