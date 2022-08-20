import { Keplr } from "@keplr-wallet/types";
import { useEffect, useState } from "react";
import { useAddress } from "./useAddress";
import { useSigningClient } from "./useCosmJSClient";

export function useDecoBalance(keplr: Keplr | null) {
  const signingClient = useSigningClient(keplr);
  const address = useAddress(keplr);

  const [decoBalance, setDecoBalance] = useState<string | null>(null);

  useEffect(() => {
    if (signingClient !== null) {
      signingClient.getBalance(address, "udeco").then(({ amount, denom }) => setDecoBalance(amount));
    }
  }, [signingClient]);

  return decoBalance;
}
