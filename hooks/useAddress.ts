import { Keplr } from "@keplr-wallet/types";
import { useEffect, useState } from "react";
import { chainInfo } from "../config/chain";


export function useAddress(keplr: Keplr | null) {
  const [bech32Address, setBech32Address] = useState<string>("");

  useEffect(() => {
    const getKeySetAccountInfo = async () => {
      if (keplr) {
        const key = await keplr.getKey(chainInfo.chainId);
        setBech32Address(key.bech32Address);
      }
    };
    getKeySetAccountInfo();
  }, [keplr]);

  return bech32Address
}