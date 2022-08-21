import axios from "axios";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Editor from "../components/editor/Editor";
import { MainButton } from "../components/mainButton";
import { Navigation } from "../components/navigation";
import { stickers as localStickers } from "../components/sticker/stickers";
import { chainInfo } from "../config/chain";
import { useAddress } from "../hooks/useAddress";
import { useInfo } from "../lib/InfoContext";
import { Laptop, LaptopLayout } from "../types/Layout";
import { Sticker } from "../types/Sticker";

const sampleLaptop: Laptop = {
  color: "white",
  manufacturer: "Texas",
};

interface StickerResponse {
  index: string;
  name: string;
  price: string;
  owner: string;
}

interface Response {
  sticker: StickerResponse[];
}

const Deco: NextPage = () => {
  const { login, loading, keplr, github, handleGithub, handleSignout, connectWallet } = useInfo();
  const address = useAddress(keplr);

  const router = useRouter();

  useEffect(() => {
    if (!login && !loading) {
      router.push("/");
    }
  }, [login, loading]);

  const [stickers, setStickers] = useState<Response | null>(null);

  useEffect(() => {
    axios
      .get<Response>(`${chainInfo.rest}/decogit/decogit/sticker`, {})
      .then((res) => {
        setStickers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [editorState, setEditorState] = useState<LaptopLayout>({
    laptop: sampleLaptop,
    stickers: [],
  });
  const [currentSticker, setCurrentSticker] = useState<Sticker | null>(null);

  return (
    <>
      <Navigation />
      {login && (
        <div className="overflow-hidden w-full h-[100vh] relative text-center">
          <div className="flex justify-center pt-32">
            <Editor
              state={editorState}
              onStateChange={setEditorState}
              currentSticker={currentSticker}
              style={{ width: 512, height: 320 }}
            />
          </div>
          <div className="pt-8" />
          <MainButton
            onClick={() =>
              setEditorState({
                laptop: sampleLaptop,
                stickers: [],
              })
            }
          >
            <p className="text-3xl font-black text-black uppercase">restart!</p>
          </MainButton>
          <div className="flex justify-center">
            <div className="bg-[url('/assets/bg-image.png')] bg-cover w-[840px] h-[20vh] align-center absolute bottom-0 overflow-hidden">
              <div className="flex h-full gap-4 pl-4 overflow-x-scroll row">
                {stickers
                  ? stickers.sticker
                      .filter(({ owner }) => owner === address)
                      .map((s) => (
                        <div
                          className="h-[15vh] w-[15vh] bg-contain bg-no-repeat bg-center shrink-0 mt-4"
                          onClick={() => setCurrentSticker(localStickers[s.name as keyof typeof localStickers])}
                          key={s.index}
                          style={{
                            backgroundImage: `url('/assets/${
                              localStickers[s.name as keyof typeof localStickers].url
                            }')`,
                          }}
                        />
                      ))
                  : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Deco;
