import "../styles/globals.css";
import "../styles/main.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { InfoProvider } from "../lib/InfoContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>decoGit</title>
        <meta name="author" content="decoGit" />
        <meta name="description" content="Decorate your git profile" />
        {/* <link rel="icon" href="/assets/head-icon.svg" /> */}
      </Head>
      <InfoProvider>
        <Component {...pageProps} />
      </InfoProvider>
    </>
  );
}

export default MyApp;
