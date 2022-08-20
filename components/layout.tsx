import Image from "next/image";
import Link from "next/link";
import { useState, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function Layout({ children }: Props) {
  const [login, setLogin] = useState(false);
  const handleSignout = () => {
    // localStorage.removeItem("token");
    console.log("clicked signout");
    setLogin(false);
  };

  return (
    <>
      <nav className="flex items-center justify-between p-4 bg-black">
        <div>
          <Image src="/assets/logo@3x.png" alt="" width={120} height={30}></Image>
        </div>
        <div className="flex gap-4">
          <Image src="/assets/icon-wallet.svg" alt="" width={40} height={40}></Image>
          {login && (
            <>
              <Image src="/assets/icon-cart.svg" alt="" width={40} height={40}></Image>
              <Image src="/assets/icon-user.svg" alt="" width={40} height={40}></Image>
              <Link href="/">
                <Image onClick={handleSignout} src="/assets/icon-logout.svg" alt="" width={40} height={40}></Image>
              </Link>
            </>
          )}
        </div>
      </nav>
      <main className="bg-[url('/assets/bg-image.png')] bg-center bg-cover">{children}</main>
    </>
  );
}
