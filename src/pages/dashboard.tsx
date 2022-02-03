import { Box } from "@chakra-ui/react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Posts } from "../components/Posts";
import withAuth from "../hocs/withAuth";
import { useAuth } from "../hooks/useAuth";
import { api } from "../services/api";
import { supabase } from "../utils/supabase";

export type Post = {
  id?: string;
  body: string;
  authorId: string;
  created_at: string;
};

type Props = {
  postsData: {
    data: Post[];
  };
};

export default function Dashboard({ postsData }: Props): JSX.Element {
  const { session } = useAuth();

  return (
    <>
      <Header />

      <Box maxWidth={"1100px"} margin={"0 auto"} p={"1rem"}>
        {postsData.data?.map((items) => {
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

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  let loadPosts: Post[];

  try {
    const { data } = await api.get<Post[]>("/loadAllPosts");
    loadPosts = data;
  } catch {}

  return {
    props: {
      postsData: loadPosts,
    },
  };
};
