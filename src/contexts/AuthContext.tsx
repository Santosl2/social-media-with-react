import { AuthChangeEvent, Session } from "@supabase/supabase-js";
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { api } from "../services/api";
import { supabase } from "../utils/supabase";

type ContextProps = {
  session: Session;
  logOut(): void;
};

export const AuthContext = createContext({} as ContextProps);

export function AuthProvider({ children }) {
  const [session, setSession] = useState<Session>();
  const isAuth = !!session;

  const logOut = useCallback(() => {}, []);

  useEffect(() => {
    setSession(supabase.auth.session());

    async function apiRequest(
      event: AuthChangeEvent,
      newSession: Session | null
    ) {
      await api.post("/auth", {
        event,
        session: newSession,
      });
    }

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        await apiRequest(_event, session);
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ logOut, session }}>
      {children}
    </AuthContext.Provider>
  );
}
