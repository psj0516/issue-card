import type { AppProps } from "next/app";
import { AlertContextProvider } from "@/contexts/AlertContext";
import globalStyles from "@/styles/globalStyles";
import { Global } from "@emotion/react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import Layout from "@/components/shared/Layout";
import Navbar from "@/components/shared/Navbar";
import styled from "@emotion/styled";

const client = new QueryClient({});

export default function App({ Component, pageProps: { dehydratedState, session, ...pageProps } }: AppProps) {
  return (
    <>
      <Layout>
        <Global styles={globalStyles} />
        <QueryClientProvider client={client}>
          <Hydrate state={dehydratedState}>
            <AlertContextProvider>
              <Container>
                <Navbar />
                <Component {...pageProps} />
              </Container>
            </AlertContextProvider>
          </Hydrate>
        </QueryClientProvider>
      </Layout>
    </>
  );
}

const Container = styled.div`
  padding: 20px 40px;

  @media (min-width: 1600px) {
    padding: 20px 80px;
  }

  @media (max-width: 480px) {
    padding: 20px 20px;
  }
`;
