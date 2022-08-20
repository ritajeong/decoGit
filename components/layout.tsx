// import Image from "next/image";
import { useState, ReactNode } from "react";
import Link from "next/link";

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
  const handleSignin = () => {
    // localStorage.removeItem("token");
    console.log("clicked signin");
    setLogin(true);
  };

  return (
    <>
      <nav className="flex items-center justify-between p-4">
        <h1 className="pl-10 text-lg font-normal">decoGit</h1>
        {/* <Image src="/assets/main-logo.svg" alt="" width={77} height={40}></Image> */}
        <div className="flex">
          <ul className="flex gap-4 text-sm font-normal">
            <li>Connet wallet</li>
            <li>My page</li>
            <li>Shop</li>
            {login ? (
              <li onClick={handleSignout}>
                <Link href="/">Sign out</Link>
              </li>
            ) : (
              <li onClick={handleSignin}>
                <Link href="/">Sign in</Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
      <main>{children}</main>
    </>
  );
}
