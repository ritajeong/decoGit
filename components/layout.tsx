import Image from "next/image";
import Link from "next/link";
import { MouseEventHandler, ReactNode } from "react";

interface Props {
  children: ReactNode;
  login: boolean;
  handleSignout: MouseEventHandler<HTMLImageElement>;
  bech32Address: string;
  connectWallet: () => Promise<void>;
  isWhite?: boolean;
}

export function Layout({ children, login, handleSignout, connectWallet, isWhite }: Props) {
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
              <Image src="/assets/icon-user.svg" alt="" width={36} height={36} />
              <Link href="/">
                <Image onClick={handleSignout} src="/assets/icon-logout.svg" alt="" width={36} height={36}></Image>
              </Link>
            </>
          )}
        </div>
      </nav>
      {isWhite ? (
        <main className="bg-[#f5f5f5f5] bg-center bg-cover">{children}</main>
      ) : (
        <main className="bg-[url('/assets/bg-image.png')] bg-center bg-cover">{children}</main>
      )}
    </>
  );
}
