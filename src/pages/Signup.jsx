import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const iState = {
  name: "",
  image: "",
  age: "",
  contact: "",
  email: "",
  password: "",
};
export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState(iState);
  const toast = useToast();
  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;

    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSignup = async () => {
    console.log(data);
    setData(iState);
    try {
      let res = await axios.post("http://localhost:9001/user/signup", data);
      if (res.data.status) {
        toast({
          title: "Account created.",
          description: res.data.message,
          status: "success",
          duration: 2500,
          isClosable: true,
        });
        navigate("/login");
      } else {
        toast({
          title: "Something went wrong !.",
          description: res.data.message,
          status: "error",
          duration: 2500,
          isClosable: true,
        });
        console.log(res.data);
      }
    } catch (error) {
      toast({
        title: "Something went wrong !.",
        description: error.message,
        status: "error",
        duration: 2500,
        isClosable: true,
      });
      console.log(error.message);
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>Full Name</FormLabel>
                  <Input
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    type="text"
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Image url</FormLabel>
                  <Input
                    name="image"
                    value={data.image}
                    onChange={handleChange}
                    type="url"
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="age" isRequired>
              <FormLabel>Age</FormLabel>
              <Input
                name="age"
                value={data.age}
                onChange={handleChange}
                type="number"
              />
            </FormControl>
            <FormControl id="contact" isRequired>
              <FormLabel>Contact</FormLabel>
              <Input
                name="contact"
                value={data.contact}
                onChange={handleChange}
                type="number"
              />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                name="email"
                value={data.email}
                onChange={handleChange}
                type="email"
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={handleSignup}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <Link href="/login" color={"blue.400"}>
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
