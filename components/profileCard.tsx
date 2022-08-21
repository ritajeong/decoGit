import React from "react";
import { useAddress } from "../hooks/useAddress";
import { useDecoBalance } from "../hooks/useDecoBalance";
import { useInfo } from "../lib/InfoContext";

interface IProfileCardProps {
  // set blurred=true if the card is for blurred background thing (should not display data)
  blurred: boolean;
  github: boolean;
  githubInfo: { name: string; url: string };
}

export const ProfileCard: React.FC<IProfileCardProps> = ({ blurred, github, githubInfo }) => {
  const { keplr } = useInfo();
  const decoBalance = useDecoBalance(keplr);
  const address = useAddress(keplr);

  return (
    <>
      <section className="flex justify-center max-w-[100vw]">
        <div className="flex-col items-center profile mt-36  w-[720px] h-[450px] rounded-3xl bg-[url('/assets/bg-image.png')] bg-center bg-cover flex">
          {!github ? (
            <>
              <div className="bg-[url('/assets/profile-image.png')] bg-center bg-cover w-32 h-32 mt-16 mb-5"></div>
              <p className="text-5xl font-bold">username</p>
            </>
          ) : (
            <>
              <img className="inline-block w-32 h-32 mt-16 mb-5 rounded-full" src={githubInfo.url} />
              <p className="text-5xl font-bold">{githubInfo.name}</p>
            </>
          )}
          {!blurred && (
            <>
              {" "}
              <div className="pt-6 text-base font-bold">
                <div className="flex justify-center">
                  <span className="bg-[url('/assets/github/planet.svg')] bg-center bg-cover w-6 h-6"></span>
                  <span className="pl-2">{decoBalance} DECO</span>
                  <span className="ml-6 bg-[url('/assets/github/sticker.svg')] bg-center bg-cover w-6 h-6"></span>
                  <span className="pl-2">64</span>
                </div>
                <div className="flex justify-center pt-4">
                  <span className="bg-[url('/assets/github/commit.svg')] bg-center bg-cover w-6 h-6"></span>
                  <span className="pl-2">512</span>
                  <span className="ml-6 bg-[url('/assets/github/pull-request.svg')] bg-center bg-cover w-6 h-6"></span>
                  <span className="pl-2">8</span>
                  <span className="ml-6 bg-[url('/assets/github/merge.svg')] bg-center bg-cover w-6 h-6"></span>
                  <span className="pl-2">2</span>
                </div>
              </div>
              <p className="pt-12 text-[#9B9B9B]">WALLET ACCOUNT : {address}</p>
            </>
          )}
        </div>
      </section>
    </>
  );
};
