import { defaultRegistryTypes as defaultStargateTypes, SigningStargateClient, StargateClient } from "@cosmjs/stargate";
import { Registry } from "@cosmjs/proto-signing";
import { Keplr } from "@keplr-wallet/types";
import { chainInfo } from "../config/chain";
import { useEffect, useState } from "react";
import { MsgBuySticker } from "../types/generated/proto/decogit/tx";

/**
 * to compile generated Protobuf def file, use this command
ls ./server/chain/proto/decogit | xargs -I {} ./node_modules/protoc/protoc/bin/protoc \
--plugin="./node_modules/.bin/protoc-gen-ts_proto" \
--ts_proto_out="./types/generated" \
--proto_path="./server/chain/" \
--ts_proto_opt="esModuleInterop=true,forceLong=long,useOptionals=messages" \
./server/chain/proto/decogit/{}
  */
export function useSigningClient(keplr: Keplr | null) {
  const [client, setClient] = useState<SigningStargateClient | null>(null);

  async function initNewClient(keplr: Keplr) {
    const offlineSigner = keplr.getOfflineSigner(chainInfo.chainId);

    const myRegistry = new Registry(defaultStargateTypes);
    myRegistry.register("/decogit.decogit.MsgBuySticker", MsgBuySticker as any);

    const client = await SigningStargateClient.connectWithSigner(
      chainInfo.rpc,
      offlineSigner,
      { registry: myRegistry as any },
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
