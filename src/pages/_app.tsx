import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/dist/shared/lib/router/router";
import { AuthProvider } from "../contexts/AuthContext";
import theme from "../theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthProvider>
  );
}

export default MyApp;
