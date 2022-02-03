import LoginForm from "../components/LoginForm";
import noAuth from "../hocs/noAuth";

export default function Home() {
  return <LoginForm />;
}

export const getServerSideProps = noAuth();
