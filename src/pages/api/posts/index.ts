import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../utils/supabase";

export default async function posts(req: NextApiRequest, res: NextApiResponse) {
  const query = supabase.from("posts");

  switch (req.method) {
    case "POST":
      const { message } = req.body;
      const {
        user: { id: userId },
      } = await supabase.auth.api.getUserByCookie(req);

      if (!message || !userId) {
        return res.status(404).redirect("/404");
      }
      try {
        const { data } = await query.insert([
          {
            body: message,
            authorId: userId,
          },
        ]);

        res.status(201).send({ success: true, data });
      } catch {
        res.status(204).send({ success: false });
      }

      break;

    case "GET":
      const { data } = await query
        .select("*")
        .order("id", { ascending: false });

      res.send({ data });

      break;
  }
}
