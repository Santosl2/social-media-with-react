import { Session } from "@supabase/supabase-js";
import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../../utils/supabase";

export default async function verifyVoted(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (!id) {
    return res.status(404).redirect("/404");
  }

  const {
    user: { id: userId },
  } = await supabase.auth.api.getUserByCookie(req);

  const query = supabase.from("posts_likes");
  const { data } = await query
    .select("*")
    .filter("post_id", "eq", id)
    .filter("user_id", "eq", userId);

  switch (req.method) {
    case "POST":
      await query.insert([
        {
          post_id: id,
          user_id: userId,
        },
      ]);

      res.status(200).send({ voted: true });
      break;

    case "DELETE":
      // If contains, so delete
      if (data) {
        await query.delete().match({ post_id: id, user_id: userId });
        return res.status(204).send("");
      }
      break;

    case "GET":
      res.status(200).send({ voted: data.length > 0 });
      break;
    default:
      res.status(404).redirect("/404");
      break;
  }
}
