import { SigningStargateClient, StargateClient } from "@cosmjs/stargate";
import { Keplr } from "@keplr-wallet/types";
import { chainInfo } from "../config/chain";
import { useEffect, useState } from "react";

export function useSigningClient(keplr: Keplr | null) {
  const [client, setClient] = useState<SigningStargateClient | null>(null);

  async function initNewClient(keplr: Keplr) {
    const offlineSigner = keplr.getOfflineSigner(chainInfo.chainId);

    const client = await SigningStargateClient.connectWithSigner(
      chainInfo.rpc,
      offlineSigner
    );

    setClient(client);
  }

  useEffect(() => {
    if (keplr !== null) {
      initNewClient(keplr);
    } else {
      setClient(null);
    }
  }, [keplr]);

  return client;
}

export function useStargateClient() {

  const [client, setClient] = useState<StargateClient | null>(null);

  async function initNewStargateClient() {
    setClient(await StargateClient.connect(chainInfo.rpc))
  }

  useEffect(() => {
    initNewStargateClient()
  }, [])

  return client
}
