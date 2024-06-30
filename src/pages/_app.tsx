import type { AppProps } from "next/app";
import { AlertContextProvider } from "@/contexts/AlertContext";
import globalStyles from "@/styles/globalStyles";
import { Global } from "@emotion/react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import Layout from "@/components/shared/Layout";
import Navbar from "@/components/shared/Navbar";

const client = new QueryClient({});

export default function App({ Component, pageProps: { dehydratedState, session, ...pageProps } }: AppProps) {
  return (
    <>
      <Layout>
        <Global styles={globalStyles} />
        <QueryClientProvider client={client}>
          <Hydrate state={dehydratedState}>
            <AlertContextProvider>
              <Navbar />
              <Component {...pageProps} />
            </AlertContextProvider>
          </Hydrate>
        </QueryClientProvider>
      </Layout>
    </>
  );
}
