import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabase";

export default async function loadAllPosts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await supabase

    .from("posts")
    .select("*")
    .order("id", { ascending: false });

  return res.send(data);
}
