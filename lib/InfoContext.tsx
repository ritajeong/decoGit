/* eslint-disable @typescript-eslint/no-empty-function */
import { ReactNode, createContext, useState, useContext, Dispatch, SetStateAction } from "react";
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
    github: boolean;
    keplr: Keplr | null;
    handleGithub: () => void;
    handleSignout: () => void;
    connectWallet: () => Promise<void>;
    setBech32Address: Dispatch<SetStateAction<string>>;
  }>(InfoContext as any);

export const InfoProvider = ({ children }: Props) => {
  const [login, setLogin] = useState<boolean>(false);
  const [github, setGithub] = useState<boolean>(false);
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

  return (
    <InfoContext.Provider
      value={{ login, keplr, github, handleGithub, handleSignout, connectWallet, setBech32Address }}
    >
      {children}
    </InfoContext.Provider>
  );
};
