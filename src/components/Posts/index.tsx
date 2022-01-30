import { Post } from "../../pages/dashboard";
import {
  useColorModeValue,
  Text,
  Heading,
  Avatar,
  Box,
  Flex,
  Badge,
} from "@chakra-ui/react";
import { Heart } from "./Heart";

export function Posts({ authorId, body, created_at }: Post): JSX.Element {
  return (
    <Box
      bg={useColorModeValue("white", "gray.800")}
      boxShadow={"2xl"}
      rounded={"md"}
      p={"1rem"}
      overflow={"hidden"}
    >
      <Flex justify={"flex-end"}>
        <Heart />
      </Flex>
      <Flex justify={"flex-start"} alignItems={"center"} p={"md"}>
        <Avatar
          size={"lg"}
          name="Matheus Filype"
          alt={"Author"}
          marginRight={"1rem"}
        />
        <Flex flexDir={"column"}>
          <Heading fontSize={"2xl"} fontFamily={"body"}>
            Lindsey James{" "}
            <Badge ml="1" colorScheme="green">
              New
            </Badge>
          </Heading>
          <Text color={useColorModeValue("gray.700", "gray.400")}>{body}</Text>
        </Flex>
      </Flex>
    </Box>
  );
}
