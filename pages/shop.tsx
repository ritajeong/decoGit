import axios from "axios";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Navigation } from "../components/navigation";
import { stickers as localStickers } from "../components/sticker/stickers";
import { useInfo } from "../lib/InfoContext";

interface StickerResponse {
  index: string;
  name: string;
  price: string;
  owner: string;
}

interface Response {
  sticker: StickerResponse[];
}

function parseDeco(s: string): number {
  s = s.substring(0, s.length - 5);
  return +s;
}

const Shop: NextPage = () => {
  const { login, loading, keplr, github, handleGithub, handleSignout, connectWallet } = useInfo();

  const router = useRouter();

  useEffect(() => {
    if (!login && !loading) {
      router.push("/");
    }
  }, [login, loading]);

  const [stickers, setStickers] = useState<Response | null>(null);

  useEffect(() => {
    axios
      .get<Response>("http://5.server.susuyo.ai:1317/decogit/decogit/sticker", {})
      .then((res) => {
        setStickers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Navigation login={login} handleSignout={handleSignout} connectWallet={connectWallet} />
      <main className="bg-[url('/assets/bg-image.png')] bg-center bg-cover">
        <section className="z-0 flex flex-col items-center w-full h-screen pt-32">
          <p className="text-5xl font-black text-black uppercase">shop</p>
          <div className="flex justify-center">
            <div className="bg-white bg-cover w-full max-w-[840px] h-[70vh] align-center absolute bottom-0 overflow-hidden p-4">
              <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] justify-center h-full gap-4 overflow-y-scroll align-center">
                {stickers
                  ? stickers.sticker
                      .filter(({ owner }) => owner === "")
                      .map(({ index, name, price, owner }) => (
                        <div
                          className="w-fill h-[160px] p-2 shrink-0 mt-4 hover:bg-[#fff1f8] flex flex-col items-center"
                          key={index}
                        >
                          <div
                            className="h-[128px] w-[128px] bg-contain bg-no-repeat bg-center"
                            style={{
                              backgroundImage: `url('/assets/${
                                localStickers[name as keyof typeof localStickers].url
                              }')`,
                            }}
                          />
                          <div className="flex justify-center">
                            <span className="bg-[url('/assets/github/planet.svg')] bg-center bg-cover w-6 h-6"></span>
                            <span className="pl-2">{parseDeco(price) / 1000000}</span>
                          </div>
                        </div>
                      ))
                  : null}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Shop;
