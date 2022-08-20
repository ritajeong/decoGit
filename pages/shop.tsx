import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Navigation } from "../components/navigation";
import { stickers } from "../components/sticker/stickers";
import { useInfo } from "../lib/InfoContext";

const Shop: NextPage = () => {
  const { login, loading, keplr, github, handleGithub, handleSignout, connectWallet } = useInfo();

  const router = useRouter();

  useEffect(() => {
    if (!login && !loading) {
      router.push("/");
    }
  }, []);

  return (
    <>
      <Navigation login={login} handleSignout={handleSignout} connectWallet={connectWallet} />
      <main className="bg-[url('/assets/bg-image.png')] bg-center bg-cover">
        <section className="z-0 flex flex-col items-center w-full h-screen pt-32">
          <p className="text-5xl font-black text-black uppercase">shop</p>
          <div className="flex justify-center">
            <div className="bg-white bg-cover w-[840px] h-[70vh] align-center absolute bottom-0 overflow-hidden p-4">
              <div className="flex flex-wrap align-center h-full gap-4">
                {Object.entries(stickers).map(([key, sticker]) => (
                  <div
                    className="h-[15vh] w-[15vh] bg-contain bg-no-repeat bg-center shrink-0 mt-4"
                    key={key}
                    style={{ backgroundImage: `url('/assets/${sticker.url}')` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Shop;
