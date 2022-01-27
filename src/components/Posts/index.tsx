import { Post } from "../../pages/dashboard";
import {
  useColorModeValue,
  Text,
  Heading,
  Avatar,
  Box,
  Flex,
  Link,
} from "@chakra-ui/react";

export function Posts({ authorId, body, created_at }: Post): JSX.Element {
  return (
    <Box
      bg={useColorModeValue("white", "gray.800")}
      boxShadow={"2xl"}
      rounded={"md"}
      p={"1rem"}
      overflow={"hidden"}
    >
      <Flex justify={"flex-start"} alignItems={"center"} p={"md"}>
        <Avatar
          size={"lg"}
          src={
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
          }
          alt={"Author"}
          css={{
            border: "2px solid white",
          }}
          marginRight={"1rem"}
        />
        <Flex flexDir={"column"}>
          <Heading fontSize={"2xl"} fontFamily={"body"}>
            Lindsey James
          </Heading>
          <Text color={useColorModeValue("gray.700", "gray.400")}>{body}</Text>
        </Flex>
      </Flex>
    </Box>
  );
}
