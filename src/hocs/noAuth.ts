import { GetServerSideProps } from "next";
import { supabase } from "../utils/supabase";

const noAuth: (inner?: GetServerSideProps) => GetServerSideProps = (inner) => {
  return async (context) => {
    const { req } = context;
    const { user } = await supabase.auth.api.getUserByCookie(req);

    if (user) {
      return { props: {}, redirect: { destination: "/dashboard" } };
    }

    if (inner) {
      return inner(context);
    }

    return { props: {} };
  };
};

export default noAuth;
