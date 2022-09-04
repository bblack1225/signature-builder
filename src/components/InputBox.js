import { Box, Divider, Tab, TabList, TabPanel, TabPanels, Tabs, theme } from "@chakra-ui/react";
import LogoForm from "./LogoForm";

const InputBox = () => {

    const theme = {
        colors: {
            blue: {
                700: ''
            }
        }
    }

    return (
      <Box w={[300,400,500]} bg="gray.50" boxShadow="md" mb={{md: 10}} m={{md: '0 auto'}}>
        <Tabs size="lg">
          <TabList bg="#e6edf5" borderRadius="10px">
            <Tab
              w="50%"
              _selected={{ color: 'white', bg: 'blue.700' }}
              borderRadius="10px"
            >
              Type B
            </Tab>
            <Tab
              w="50%"
              _selected={{ color: 'white', bg: 'blue.700' }}
              borderRadius="10px"
            >
              Type C
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <LogoForm />
              <Divider />
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    );
}

export default InputBox;