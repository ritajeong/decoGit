import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Editor from "../components/editor/Editor";
import { MainButton } from "../components/mainButton";
import { Navigation } from "../components/navigation";
import { stickers } from "../components/sticker/stickers";
import { useInfo } from "../lib/InfoContext";
import { Laptop, LaptopLayout } from "../types/Layout";
import { Sticker } from "../types/Sticker";

const sampleLaptop: Laptop = {
  color: "white",
  manufacturer: "Texas",
};

const Mypage: NextPage = () => {
  const { login, keplr, github, handleGithub, handleSignout, connectWallet } = useInfo();

  const router = useRouter();

  useEffect(() => {
    if (!login) {
      router.push("/");
    }
  }, []);

  const [editorState, setEditorState] = useState<LaptopLayout>({
    laptop: sampleLaptop,
    stickers: [],
  });
  const [currentSticker, setCurrentSticker] = useState<Sticker>(stickers.python);

  return (
    <>
      <Navigation login={login} handleSignout={handleSignout} connectWallet={connectWallet} />
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
              <div className="flex row overflow-x-scroll h-full gap-4">
                {Object.entries(stickers).map(([key, sticker]) => (
                  <div
                    className="h-[15vh] w-[15vh] bg-contain bg-no-repeat bg-center shrink-0 mt-4"
                    onClick={() => setCurrentSticker(sticker)}
                    key={key}
                    style={{ backgroundImage: `url('/assets/${sticker.url}')` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Mypage;
