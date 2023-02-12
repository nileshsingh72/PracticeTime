import {
  Badge,
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Image,
  Input,
  Link,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAction } from "../redux/auth.action";

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const navigate = useNavigate();
  const myid = useSelector((state) => state.auth.id);
  const isAuth = useSelector((state) => state.auth.isAuth);
  console.log(isAuth);
  const [data, setData] = useState({});
  const [updatedata, setUpdatedata] = useState({
    name: "",
    image: "",
    age: "",
    contact: "",
  });
  const dispatch = useDispatch();
  const getinfo = async () => {
    try {
      let res = await axios.get(`http://localhost:9001/user/getinfo/${myid}`);
      console.log(res.data);
      setData(res.data.info);
    } catch (error) {
      console.error(error.message);
    }
  };

  console.log(myid);
  console.log(data);

  const handleLogout = () => {
    dispatch(logoutAction());
    navigate("/login");
  };
  const handlechange = (e) => {
    const { name, value } = e.target;
    setUpdatedata({ ...updatedata, [name]: value });
  };
  const handleUpdate = async () => {
    let res = await axios
      .patch(`http://localhost:9001/user/update/${myid}`, updatedata)
      .then(() => getinfo());
    onClose();
  };
  const handleModel = () => {
    setUpdatedata({ ...data });
    onOpen();
  };
  useEffect(() => {
    getinfo();
  }, []);

  return (
    <Center mt="120px" py={6}>
      <Stack
        borderWidth="1px"
        borderRadius="lg"
        w={{ sm: "100%", md: "540px" }}
        height={{ sm: "476px", md: "20rem" }}
        direction={{ base: "column", md: "row" }}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        padding={4}
      >
        <Flex flex={1} bg="blue.200">
          <Image objectFit="cover" boxSize="100%" src={data.image} />
        </Flex>
        <Stack
          flex={1}
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          p={1}
          pt={2}
        >
          <Heading fontSize={"2xl"} fontFamily={"body"}>
            {data.name}
          </Heading>
          <Text fontWeight={600} color={"gray.500"} size="sm" mb={4}>
            {data.email}
          </Text>
          <Text
            textAlign={"center"}
            color={useColorModeValue("gray.700", "gray.400")}
            px={3}
          >
            Age: {data.age}
          </Text>
          <Text
            textAlign={"center"}
            color={useColorModeValue("gray.700", "gray.400")}
            px={3}
          >
            Contact : {data.contact}
          </Text>

          <Stack
            width={"100%"}
            mt={"2rem"}
            direction={"row"}
            padding={2}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Button
              flex={1}
              fontSize={"sm"}
              rounded={"full"}
              _focus={{
                bg: "gray.200",
              }}
              onClick={handleLogout}
            >
              Logout
            </Button>
            <Button
              flex={1}
              fontSize={"sm"}
              rounded={"full"}
              bg={"green.400"}
              color={"white"}
              boxShadow={
                "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
              }
              _hover={{
                bg: "green.500",
              }}
              _focus={{
                bg: "green.500",
              }}
              onClick={() => handleModel()}
            >
              Edit
            </Button>
            <Modal
              initialFocusRef={initialRef}
              finalFocusRef={finalRef}
              isOpen={isOpen}
              onClose={onClose}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Update your profile</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={4}>
                  <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input
                      ref={initialRef}
                      placeholder="Name"
                      value={updatedata.name}
                      name="name"
                      type="text"
                      onChange={handlechange}
                    />
                  </FormControl>
                  <FormControl mt={3}>
                    <FormLabel>Image</FormLabel>
                    <Input
                      placeholder="Image url"
                      value={updatedata.image}
                      name="image"
                      onChange={handlechange}
                    />
                  </FormControl>
                  <HStack>
                    <Box>
                      <FormControl mt={3}>
                        <FormLabel>Age</FormLabel>
                        <Input
                          type="number"
                          name="age"
                          placeholder="Age"
                          value={updatedata.age}
                          onChange={handlechange}
                        />
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl mt={3}>
                        <FormLabel>Contact Number : </FormLabel>
                        <Input
                          placeholder="Contact"
                          type="number"
                          name="contact"
                          value={updatedata.contact}
                          onChange={handlechange}
                        />
                      </FormControl>
                    </Box>
                  </HStack>
                </ModalBody>

                <ModalFooter>
                  <Button onClick={handleUpdate} colorScheme="blue" mr={3}>
                    Update
                  </Button>
                  <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Stack>
        </Stack>
      </Stack>
    </Center>
  );
}
