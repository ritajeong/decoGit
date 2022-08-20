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
            <div className="bg-white bg-cover w-full max-w-[840px] h-[70vh] align-center absolute bottom-0 overflow-hidden p-4">
              <div className="flex flex-wrap align-center h-full gap-4 align-center justify-center overflow-y-scroll">
                {Object.entries(stickers).map(([key, sticker]) => (
                  <div className="w-[160px] p-2 shrink-0 mt-4 hover:bg-[#fff1f8] flex flex-col items-center" key={key}>
                    <div
                      className="h-[128px] w-[128px] bg-contain bg-no-repeat bg-center"
                      style={{ backgroundImage: `url('/assets/${sticker.url}')` }}
                    />

                    <div className="flex justify-center">
                      <span className="bg-[url('/assets/github/planet.svg')] bg-center bg-cover w-6 h-6"></span>
                      <span className="pl-2">1024</span>
                    </div>
                  </div>
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
