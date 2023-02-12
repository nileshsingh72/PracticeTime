import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAction } from "../redux/auth.action";
const iState = {
  email: "",
  password: "",
};
export default function Login() {
  const [data, setData] = useState(iState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const isAuth = useSelector((state) => state.auth.isAuth);
  console.log(isAuth);
  const handleChange = (event) => {
    const { name, value } = event.target;

    setData({
      ...data,
      [name]: value,
    });
  };

  const handleClick = () => {
    setData(iState);
    dispatch(loginAction(data))
      .then((res) => {
        if (res) {
          toast({
            title: "Account created.",
            description: "login done !",
            status: "success",
            duration: 2500,
            isClosable: true,
          });
          navigate("/");
        } else {
          toast({
            title: "Account created.",
            description: "Try again !.",
            status: "error",
            duration: 2500,
            isClosable: true,
          });
        }
      })
      .catch((err) => {
        toast({
          title: "Account created.",
          description: err.message,
          status: "error",
          duration: 2500,
          isClosable: true,
        });
        console.log(err.message);
      });
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
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            Login here... ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                name="email"
                value={data.email}
                onChange={handleChange}
                type="email"
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                name="password"
                value={data.password}
                onChange={handleChange}
                type="password"
              />
            </FormControl>
            <Stack spacing={5}>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={handleClick}
              >
                Sign in
              </Button>
              <Stack pt={4}>
                <Text align={"center"}>
                  Want to create one ?{" "}
                  <Link href="/signup" color={"blue.400"}>
                    Signup
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
