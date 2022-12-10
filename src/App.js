import { Box } from '@chakra-ui/react';
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
    </Box>
  );
}

export default App;
