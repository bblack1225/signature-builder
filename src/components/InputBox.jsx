import { Box, Divider, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { setSignatureType } from "../redux/signatureTypeSlice";
import InfoForm from "./InfoForm";
import LogoForm from "./LogoForm";
import OutputBox from "./OutputBox";

const InputBox = () => {

    const dispatch = useDispatch();
    const handleTabChange = (index) => {
 const type = index == 0 ? 'B' : 'C';
 dispatch(setSignatureType(type));
     
    }

    return (
      <Box
        w={[400, 500, 600]}
        bg="gray.50"
        boxShadow="md"
        mb={{ md: 10 }}
        m={{ md: '0 auto' }}
      >
        <Tabs size="lg" onChange={handleTabChange}>
          <TabList bg="#e6edf5" borderRadius="10px">
            <Tab
              w="50%"
              _selected={{ color: 'white', bg: 'blue.700' }}
              borderRadius="10px"
            >
              InfoLink
            </Tab>
            <Tab
              w="50%"
              _selected={{ color: 'white', bg: 'blue.700' }}
              borderRadius="10px"
            >
              RECC
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel minH="600px">
              <LogoForm />
              <Divider />
              <InfoForm />
            </TabPanel>
            <TabPanel minH="600px">
              <LogoForm />
              <Divider />
              <InfoForm />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    );
}

export default InputBox;