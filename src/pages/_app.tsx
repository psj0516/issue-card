import type { AppProps } from "next/app";
import { AlertContextProvider } from "@/contexts/AlertContext";
import globalStyles from "@/styles/globalStyles";
import { Global } from "@emotion/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Global styles={globalStyles} />
      <AlertContextProvider>
        <Component {...pageProps} />;
      </AlertContextProvider>
    </>
  );
}
