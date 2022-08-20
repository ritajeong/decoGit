/* eslint-disable @typescript-eslint/no-empty-function */
import { ReactNode, createContext, useState, useContext, Dispatch, SetStateAction, useEffect } from "react";
import { Keplr } from "@keplr-wallet/types";
import { getKeplrFromWindow } from "@keplr-wallet/stores";
import { chainInfo } from "../config/chain";

interface Props {
  children: ReactNode;
}

const KeyAccountAutoConnect = "account_auto_connect";

export const InfoContext = createContext({});

export const useInfo = () =>
  useContext<{
    login: boolean;
    loading: boolean;
    github: boolean;
    keplr: Keplr | null;
    handleGithub: () => void;
    handleSignout: () => void;
    connectWallet: () => Promise<void>;
  }>(InfoContext as any);

export const InfoProvider = ({ children }: Props) => {
  const [login, setLogin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [github, setGithub] = useState<boolean>(false);
  const [keplr, setKeplr] = useState<Keplr | null>(null);

  const connectWallet = async () => {
    setLoading(true);
    try {
      const newKeplr = await getKeplrFromWindow();
      if (!newKeplr) {
        setLoading(false);
        throw new Error("Keplr extension not found");
      }

      await newKeplr.experimentalSuggestChain(chainInfo);
      await newKeplr.enable(chainInfo.chainId);

      localStorage?.setItem(KeyAccountAutoConnect, "true");
      setKeplr(newKeplr);

      setLoading(false);
      setLogin(true); // TODO : change to global state
      console.log("login success");
    } catch (e) {
      setLoading(false);
      alert(e);
    }
  };
  const handleSignout = () => {
    localStorage?.removeItem(KeyAccountAutoConnect);
    setKeplr(null);
    setLogin(false);
    console.log("logout success");
  };
  const handleGithub = () => {
    console.log("connected github");
    setGithub(true);
  };

  useEffect(() => {
    const shouldAutoConnectAccount = localStorage?.getItem(KeyAccountAutoConnect) != null;
    if (shouldAutoConnectAccount) {
      connectWallet();
    }
  }, [keplr]);

  return (
    <InfoContext.Provider
      value={{ login, keplr, github, handleGithub, handleSignout, connectWallet }}
    >
      {children}
    </InfoContext.Provider>
  );
};
