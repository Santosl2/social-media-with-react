import LoginForm from "../components/LoginForm";
import noAuth from "../hocs/noAuth";
import { useAuth } from "../hooks/useAuth";

export default function Home() {
  const { session } = useAuth();
  return <LoginForm />;
}

export const getServerSideProps = noAuth();
