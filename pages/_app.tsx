import "../styles/globals.css";
import "../styles/main.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { InfoProvider } from "../lib/InfoContext";
import { SnackbarProvider } from "../components/snackbar/SnackbarContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>decoGit</title>
        <meta name="author" content="decoGit" />
        <meta name="description" content="Decorate your git profile" />
        <link rel="icon" href="/assets/icon-deco.svg" />
      </Head>
      <SnackbarProvider>
        <InfoProvider>
          <Component {...pageProps} />
        </InfoProvider>
      </SnackbarProvider>
    </>
  );
}

export default MyApp;
