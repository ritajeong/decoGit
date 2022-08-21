/* eslint-disable @typescript-eslint/no-empty-function */
import { ReactNode, createContext, useState, useContext, Dispatch, SetStateAction, useEffect } from "react";
import { Keplr } from "@keplr-wallet/types";
import { getKeplrFromWindow } from "@keplr-wallet/stores";
import { chainInfo } from "../config/chain";
import { useAddress } from "../hooks/useAddress";
import axios from "axios";

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
    githubInfo: { name: string; url: string };
    keplr: Keplr | null;
    handleGithub: () => void;
    handleSignout: () => void;
    connectWallet: () => Promise<void>;
    fetchGithub: () => Promise<void>;
  }>(InfoContext as any);

export const InfoProvider = ({ children }: Props) => {
  const [login, setLogin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [github, setGithub] = useState<boolean>(false);
  const [githubInfo, setGithubInfo] = useState<object>({ name: "", url: "" });
  const [keplr, setKeplr] = useState<Keplr | null>(null);

  const address = useAddress(keplr);

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
    setGithub(false);
    console.log("logout success");
  };
  const handleGithub = () => {
    axios
      .post("http://5.server.susuyo.ai:3030/api/accounts/" + address, { redirectTo: window.location.href })
      .then((res) => {
        if (!res.data.exists) {
          window.location.replace(res.data.redirectTo);
        }
      });
    setGithub(true);
    console.log("connected github");
  };
  const fetchGithub = async () => {
    const res = await axios.get("http://5.server.susuyo.ai:3030/api/accounts/" + address);
    setGithub(true);
    setGithubInfo({ name: res.data.name, url: res.data.avatar_url });
  };

  useEffect(() => {
    const shouldAutoConnectAccount = localStorage?.getItem(KeyAccountAutoConnect) != null;
    if (shouldAutoConnectAccount) {
      connectWallet();
    }
  }, [keplr]);

  return (
    <InfoContext.Provider
      value={{ loading, login, keplr, github, githubInfo, handleGithub, handleSignout, connectWallet, fetchGithub }}
    >
      {children}
    </InfoContext.Provider>
  );
};
