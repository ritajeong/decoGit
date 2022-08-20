import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { Layout } from "../components/layout";
import { MainButton } from "../components/mainButton";
import { Keplr } from "@keplr-wallet/types";
import { getKeplrFromWindow } from "@keplr-wallet/stores";
import { chainInfo } from "../config/chain";

const KeyAccountAutoConnect = "account_auto_connect";

const Home: NextPage = () => {
  const [login, setLogin] = useState(false);
  const [github, setGithub] = useState(false);
  const [keplr, setKeplr] = useState<Keplr | null>(null);
  const [bech32Address, setBech32Address] = useState<string>("");

  const connectWallet = async () => {
    try {
      const newKeplr = await getKeplrFromWindow();
      if (!newKeplr) {
        throw new Error("Keplr extension not found");
      }

      await newKeplr.experimentalSuggestChain(chainInfo);
      await newKeplr.enable(chainInfo.chainId);

      localStorage?.setItem(KeyAccountAutoConnect, "true");
      setKeplr(newKeplr);

      setLogin(true); // TODO : change to global state
      console.log("login success");
    } catch (e) {
      alert(e);
    }
  };
  const handleSignout = () => {
    localStorage?.removeItem(KeyAccountAutoConnect);
    setKeplr(null);
    setLogin(false);
    setBech32Address("");
    console.log("logout success");
  };
  const handleGithub = () => {
    console.log("connected github");
    setGithub(true);
  };

  useEffect(() => {
    const shouldAutoConnectAccount = localStorage?.getItem(KeyAccountAutoConnect) != null;

    const geyKeySetAccountInfo = async () => {
      if (keplr) {
        const key = await keplr.getKey(chainInfo.chainId);
        setBech32Address(key.bech32Address);
      }
    };

    if (shouldAutoConnectAccount) {
      connectWallet();
    }
    geyKeySetAccountInfo();
  }, [keplr]);

  return (
    <>
      <Layout login={login} handleSignout={handleSignout} bech32Address={bech32Address} connectWallet={connectWallet}>
        <section className="z-0 flex flex-col items-center w-full h-screen pt-32">
          {/* center labtop image */}
          <div className="z-50 w-[320px] h-[200px] lg:w-[32vw] lg:h-[20vw] laptop shrink-0"></div>

          {/* state1 - after sign in, before connecting github */}
          {login && !github && (
            <>
              <div className="pt-16" />
              <MainButton onClick={handleGithub}>
                <p className="text-5xl font-black text-black uppercase">login with github</p>
              </MainButton>
            </>
          )}

          {/* state2 - after connecting github */}
          {login && github && (
            <>
              <div className="pt-16" />
              <MainButton onClick={handleGithub}>
                <p className="text-5xl font-black text-black uppercase">decorate!</p>
              </MainButton>
              <div className="z-50 flex justify-center h-40 gap-8 pt-16 w-80">
                <span className="bg-[url('/assets/sns/instagram.svg')] icon-sns"></span>
                <span className="bg-[url('/assets/sns/facebook.svg')] icon-sns"></span>
                <span className="bg-[url('/assets/sns/twitter.svg')] icon-sns"></span>
              </div>
            </>
          )}

          {!login && (
            <div className="main-sticker-container">
              {/* absolute sticker zone! */}
              <div className="main-sticker main-sticker-1" />
              <div className="main-sticker main-sticker-2" />
              <div className="main-sticker main-sticker-3" />
              <div className="main-sticker main-sticker-4" />
            </div>
          )}
        </section>
      </Layout>
    </>
  );
};

export default Home;
