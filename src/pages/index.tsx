import LoginForm from "../components/LoginForm";
import { useAuth } from "../hooks/useAuth";

export default function Home() {
  const { session } = useAuth();
  return !session && <LoginForm />;
}
