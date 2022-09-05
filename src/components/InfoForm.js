import { Box, Button, Center, Divider, Flex, FormControl, FormLabel, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Stack, Text, useDisclosure } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { InfoType } from '../constants/InfoType';
import { DeleteIcon, AddIcon, ViewIcon, PhoneIcon } from '@chakra-ui/icons';


function InfoForm(){

const [infos, setInfos] = useState([
  {
    id: 1,
    type: InfoType.NORMAL,
    columnName: '姓名',
    img: '',
    icon: InfoType.NORMAL.icon,
  },
  {
    id: 2,
    type: InfoType.NORMAL,
    columnName: '職稱',
    img: '',
    icon: InfoType.NORMAL.icon,
  },
  {
    id: 3,
    type: InfoType.PHONE,
    columnName: '手機',
    img: '',
    icon: InfoType.PHONE.icon,
  },
  {
    id: 4,
    type: InfoType.PHONE,
    columnName: '公司電話',
    img: '',
    icon: InfoType.PHONE.icon,
  },
  {
    id: 5,
    type: InfoType.EMAIL,
    columnName: 'Email',
    img: '',
    icon: InfoType.EMAIL.icon,
  },
  {
    id: 6,
    type: InfoType.WEBSITE,
    columnName: '公司官網',
    img: '',
    icon: InfoType.WEBSITE.icon,
  },
]);

const [insertForm, setInsertForm] = useState({
    columnName:'',
    columnType:''
})

const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
  accept: {
    'image/jpeg': [],
    'image/png': [],
  },
  maxFiles:1
});

const { isOpen, onOpen, onClose } = useDisclosure();

const initialRef = useRef(null);
const finalRef = useRef(null);

const files = acceptedFiles.map((file) => {
    console.log(file)
  return (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  );
});

const handleDeleteColumn = (id) => {
    setInfos((prev) => prev.filter(info => info.id !== id));
}

const handleInsertForm = () => {

    const colInfo = Object.values(InfoType).find(type => type.value === insertForm.columnType);
    
    const form = {
        id: new Date(),
        type:insertForm.columnType,
        columnName:insertForm.columnName,
        img:'',
        icon:colInfo.icon
    }
    setInfos((prev) => [...prev, form]);
    setInsertForm({
      columnName: '',
      columnType: '',
    });
    onClose();
}


// TODO modal打開後 背景顏色沒變
  return (
    <>
      <Flex flexDir="column">
        {infos.map((info) => (
          <Box key={info.id}>
            <Flex
              w="100%"
              p={2}
              justifyContent="space-between"
              alignItems="center"
            >
              <Box w="5%">{info.icon}</Box>
              <Box w="30%" textAlign="center">
                {info.columnName}
              </Box>
              <Box w="60%">
                <Center
                  border="1px"
                  borderColor="gray.200"
                  borderRadius={20}
                  bg="white"
                  h="50px"
                  textAlign="center"
                >
                  <Box {...getRootProps({ className: 'dropzone' })}>
                    <Input {...getInputProps()} size="lg" />
                    <Text>Upload Here</Text>
                    {/* <Text>{files}</Text> */}
                  </Box>
                  {/* <aside>
                    <ul>{files}</ul>
                  </aside> */}
                </Center>
              </Box>
              <Box w="5%">
                <IconButton
                  bg="transparent"
                  aria-label="Delete button"
                  icon={<DeleteIcon />}
                  onClick={() => handleDeleteColumn(info.id)}
                />
              </Box>
            </Flex>
            <Divider />
          </Box>
        ))}
        <Flex justifyContent="flex-end" mt="30px" alignItems="center">
          <Button
            rightIcon={<AddIcon />}
            colorScheme="blue"
            variant="ghost"
            onClick={onOpen}
          >
            新增欄位
          </Button>
          <Input type='file' />
        </Flex>
      </Flex>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>新增欄位</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Input
                ref={initialRef}
                placeholder="欄位名稱"
                onChange={(e) =>
                  setInsertForm((prev) => ({
                    ...prev,
                    columnName: e.target.value,
                  }))
                }
              />
            </FormControl>

            <FormControl mt={4}>
              <Select
                placeholder="欄位種類"
                onChange={(e) =>
                  setInsertForm((prev) => ({
                    ...prev,
                    columnType: e.target.value,
                  }))
                }
              >
                {Object.keys(InfoType).map((key) => {
                  return (
                    <option key={key} value={InfoType[key].value}>
                      {InfoType[key].label}
                    </option>
                  );
                })}
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleInsertForm}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default InfoForm;
