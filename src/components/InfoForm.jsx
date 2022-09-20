import { Box, Button, Center, Divider, Flex, FormControl, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useDisclosure } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { InfoType } from '../constants/InfoType';
import { DeleteIcon, AddIcon, CheckIcon } from '@chakra-ui/icons';
import { useEffect } from 'react';
import ImageDropzone from './ImageDropzone';
import { useDispatch, useSelector } from 'react-redux';
import { deleteColumn, insertColumn, updateColumn } from '../redux/signatureImgSlice';
import { completeSignature, createSignature } from '../redux/createSignatureSlice';

export default function InfoForm(){

const { typeBCol, typeCCol } = useSelector((state) => state.signatureImg);
const { type } = useSelector((state) => state.signatureType);
const dispatch = useDispatch();

const [infos, setInfos] = useState([]);

const [insertForm, setInsertForm] = useState({
    columnName:'',
    columnType:''
})

const { isOpen, onOpen, onClose } = useDisclosure();

const initialRef = useRef(null);
const finalRef = useRef(null);

useEffect(() => {
  const column = type === 'B' ? typeBCol : typeCCol;
  setInfos(column);
}, [type, typeBCol, typeCCol]);


const handleDeleteColumn = (id) => {
    const data = {id, type};
    dispatch(deleteColumn(data))
}

const handleInsertForm = () => {

    const colInfo = Object.values(InfoType).find(type => type.value === insertForm.columnType);
    
    const form = {
      id: new Date(),
      type: insertForm.columnType,
      columnName: insertForm.columnName,
      img: '',
      icon: colInfo.icon,
      value: colInfo?.linkVal
    };
    const data = { type, form};
    dispatch(insertColumn(data))
    setInsertForm({
      columnName: '',
      columnType: '',
    });
    onClose();
}

// 左側input框值改變
const handleColValueChange = (e, id) => {
  const data = { form: { value: e.target.value }, id, type };
  dispatch(updateColumn(data));
};

// const handleCreateSignature = () => {
//   dispatch(createSignature())
//   setTimeout(() => {
//     dispatch(completeUploadSignatureImage());
//   },500)
// }

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
              <Box w="40%" textAlign="center">
                <Input
                  bg="white"
                  borderRadius={20}
                  placeholder={info.columnName}
                  type={info.type === InfoType.PHONE ? 'tel' : 'text'}
                  disabled={info.isDisabled}
                  onChange={(e) => handleColValueChange(e, info.id)}
                />
              </Box>
              <Box w="40%">
                <Center
                  border="1px"
                  borderColor="gray.200"
                  borderRadius={20}
                  bg={info.type === InfoType.WEBSITE ? 'gray300' : 'white'}
                  h="50px"
                  textAlign="center"
                  _hover={info.type === InfoType.WEBSITE ? { cursor: 'not-allowed' } : {cursor: 'pointer'}}
                >
                  {info.type === InfoType.WEBSITE ? (
                    <Image src={info.img} alt='img' />
                  ) : (
                    <ImageDropzone
                      colWidth={200}
                      colHeight={50}
                      colId={info.id}
                    />
                  )}
                </Center>
              </Box>
              <Box w="5%">
                <IconButton
                  bg="transparent"
                  aria-label="Delete button"
                  icon={<DeleteIcon />}
                  onClick={(e) => handleDeleteColumn(info.id)}
                />
              </Box>
            </Flex>
            <Divider />
          </Box>
        ))}
        <Flex justifyContent="space-between" mt="30px" alignItems="center">
          <Box>
            <Button
              rightIcon={<AddIcon />}
              colorScheme="blue"
              variant="ghost"
              onClick={onOpen}
            >
              新增欄位
            </Button>
          </Box>
          {/* <Box>
            <Button
              rightIcon={<CheckIcon />}
              colorScheme="blue"
              variant="ghost"
              onClick={handleCreateSignature}
            >
              製作簽名檔
            </Button>
          </Box> */}
        </Flex>
      </Flex>
      {/* )} */}
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