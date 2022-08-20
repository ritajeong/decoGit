import {
  DirectSecp256k1HdWallet,
  OfflineDirectSigner,
} from "@cosmjs/proto-signing"
import { readFile } from "fs/promises"

export const getSignerFromMnemonic = async (): Promise<OfflineDirectSigner> => {
  return DirectSecp256k1HdWallet.fromMnemonic(
    (await readFile("./decogit.faucet.mnemonic.key")).toString(),
    {
      prefix: "decogit",
    }
  )
}
