import Image from "next/image";
import Link from "next/link";
import { MouseEventHandler, useEffect } from "react";

interface Props {
  login: boolean;
  handleSignout: MouseEventHandler<HTMLImageElement>;
  connectWallet: () => Promise<void>;
}

export function Navigation({ login, handleSignout, connectWallet }: Props) {
  return (
    <>
      <nav className="flex fixed w-full items-center justify-between p-4 bg-black z-50 h-[64px]">
        <div className="flex items-center">
          <Link href="/">
            <Image src="/assets/logo@3x.png" alt="" width={120} height={30} />
          </Link>
        </div>
        <div className="flex gap-4">
          {!login && <Image onClick={connectWallet} src="/assets/icon-wallet.svg" alt="" width={36} height={36} />}
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
