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
import { useEffect, useState } from "react";
import { api } from "../../services/api";

type VotedResponse = {
  voted: boolean;
};

export function Posts({ id, authorId, body, created_at }: Post): JSX.Element {
  // verify user voted
  const [isVoted, setIsVoted] = useState(false);

  async function updateVote() {
    setIsVoted((prev) => !prev);

    try {
      if (!isVoted) {
        await api.post(`/posts/voted/${id}`);
        return;
      }

      await api.delete(`/posts/voted/${id}`);
    } catch {
      return false;
    }
  }

  async function verifyUserVoted() {
    try {
      const { data } = await api.get<VotedResponse>(`/posts/voted/${id}`);
      return data.voted;
    } catch {
      return false;
    }
  }

  useEffect(() => {
    verifyUserVoted()
      .then((response) => {
        setIsVoted(response);
      })
      .catch(() => {
        setIsVoted(false);
      });
  }, []);

  return (
    <Box
      bg={useColorModeValue("white", "gray.800")}
      boxShadow={"2xl"}
      rounded={"md"}
      p={"1rem"}
      overflow={"hidden"}
      marginBottom={"1rem"}
    >
      <Flex justify={"flex-end"}>
        <Heart onClick={updateVote} voted={isVoted} />
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
            Matheus Filype{" "}
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
