import Image from "next/image";
import Link from "next/link";
import { MouseEventHandler, useEffect } from "react";
import { useInfo } from "../lib/InfoContext";
import { chainInfo } from "../config/chain";

interface Props {
  login: boolean;
  handleSignout: MouseEventHandler<HTMLImageElement>;
  connectWallet: () => Promise<void>;
}

const KeyAccountAutoConnect = "account_auto_connect";

export function Navigation({ login, handleSignout, connectWallet }: Props) {
  const { keplr, setBech32Address } = useInfo();

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
      <nav className="flex fixed w-full items-center justify-between p-4 bg-black z-50 h-[64px]">
        <div className="flex items-center">
          <Image src="/assets/logo@3x.png" alt="" width={120} height={30} />
        </div>
        <div className="flex gap-4">
          <Image onClick={connectWallet} src="/assets/icon-wallet.svg" alt="" width={36} height={36} />
          {login && (
            <>
              <Image src="/assets/icon-cart.svg" alt="" width={36} height={36} />
              <Link href="/mypage">
                <Image src="/assets/icon-user.svg" alt="" width={36} height={36} />
              </Link>
              <Link href="/">
                <Image onClick={handleSignout} src="/assets/icon-logout.svg" alt="" width={36} height={36}></Image>
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
}
