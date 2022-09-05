import { Box } from "@chakra-ui/react";

const OutputBox = () => {

    return (
      <Box w={[300, 400, 500]} bg="#e6edf5" minHeight='500px' m={{md: '0 auto'}} mt={{md: '50px', sm: '50px'}}>
        <Box>This is output box</Box>
      </Box>
    );
}



export default OutputBox;