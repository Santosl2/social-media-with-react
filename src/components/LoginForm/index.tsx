import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { BaseSyntheticEvent, FormEvent, useRef, useState } from "react";
import { supabase } from "../../utils/supabase";

export default function LoginForm(): JSX.Element {
  const email = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  async function handleSubmit(e: BaseSyntheticEvent) {
    e.preventDefault();

    setIsLoading(true);

    console.log(email.current.value);

    try {
      const { error } = await supabase.auth.signIn({
        email: email.current.value,
      });

      if (error) {
        toast({
          title: error.status,
          description: error.message,
          variant: "left-accent",
          status: "error",
          duration: 9000,
          isClosable: true,
        });

        return;
      }

      toast({
        title: error.status,
        description: "Check your email for the login link!",
        variant: "left-accent",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch {
    } finally {
      setIsLoading(false);
      e.target.reset();
    }
  }

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
            to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
          </Text>
        </Stack>
        <form onSubmit={handleSubmit}>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel htmlFor="email">Email address</FormLabel>
                <Input type="email" id="email" ref={email} />
              </FormControl>
              <Stack spacing={10}>
                <Button
                  isLoading={isLoading}
                  loadingText="Submitting"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  type="submit"
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </form>
      </Stack>
    </Flex>
  );
}
