import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Posts } from "../components/Posts";
import { useAuth } from "../hooks/useAuth";
import { supabase } from "../utils/supabase";

export type Post = {
  id?: string;
  body: string;
  authorId: string;
  created_at: string;
};

export default function Dashboard(): JSX.Element {
  const { session } = useAuth();
  const [posts, setPosts] = useState<Post[]>();

  useEffect(() => {
    supabase
      .from("posts")
      .select("*")
      .order("id", { ascending: false })
      .then((response) => {
        const { data } = response;

        setPosts(data);
      });

    listenRealTimePosts((newMessage: Post) => {
      setPosts((prev) => [...prev, newMessage]);
    });
  }, []);

  function listenRealTimePosts(newMessage) {
    supabase
      .from("posts")
      .on("INSERT", (data) => {
        const { new: newPost } = data;

        newMessage(newPost as Post);
      })
      .subscribe();
  }

  return (
    <>
      <Header />

      <Box maxWidth={"1100px"} margin={"0 auto"} p={"1rem"}>
        {posts?.map((items) => {
          return (
            <Posts
              key={items.id}
              id={items.id}
              body={items.body}
              authorId={items.authorId}
              created_at={items.created_at}
            />
          );
        })}
      </Box>
    </>
  );
}
