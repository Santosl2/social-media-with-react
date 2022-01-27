import { Session } from "@supabase/supabase-js";
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { supabase } from "../utils/supabase";

type ContextProps = {
  session: Session;
  logOut(): void;
};

export const AuthContext = createContext({} as ContextProps);

export function AuthProvider({ children }) {
  const [session, setSession] = useState<Session>();

  const logOut = useCallback(() => {}, []);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ logOut, session }}>
      {children}
    </AuthContext.Provider>
  );
}
