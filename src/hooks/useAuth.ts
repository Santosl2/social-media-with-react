import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) throw new Error("Error useAuth hook");

  return ctx;
}
