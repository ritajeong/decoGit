import { ChainInfo } from "@keplr-wallet/types";
import { Bech32Address } from "@keplr-wallet/cosmos";

export const chainInfo: ChainInfo = {
  rpc: "http://5.server.susuyo.ai:26657",
  rest: "http://5.server.susuyo.ai:1317",
  chainId: "decogit-testnet-1",
  chainName: "Decogit",
  stakeCurrency: {
    coinDenom: "DECO",
    coinMinimalDenom: "udeco",
    coinDecimals: 6,
  },
  bip44: {
    coinType: 118,
  },
  bech32Config: Bech32Address.defaultBech32Config("decogit"),
  currencies: [
    {
      coinDenom: "DECO",
      coinMinimalDenom: "udeco",
      coinDecimals: 6,
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "DECO",
      coinMinimalDenom: "udeco",
      coinDecimals: 6,
    },
  ],
  features: ["stargate", "ibc-transfer"],
};
