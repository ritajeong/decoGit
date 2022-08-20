/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Navigation } from "../components/navigation";
import { useInfo } from "../lib/InfoContext";

const Mypage: NextPage = () => {
  const { login, keplr, github, handleGithub, handleSignout, connectWallet } = useInfo();

  const router = useRouter();

  useEffect(() => {
    if (!login) {
      router.push("/");
    }
  }, []);

  return (
    <>
      <Navigation login={login} handleSignout={handleSignout} connectWallet={connectWallet} />
      {login && (
        <section className="flex justify-center bg-[url('/assets/bg-mypage.png')] bg-center bg-cover h-screen">
          <div className="flex-col items-center profile mt-36  w-[720px] h-[450px] rounded-3xl bg-[url('/assets/bg-image.png')] bg-center bg-cover flex">
            <div className="bg-[url('/assets/profile-image.png')] bg-center bg-cover w-32 h-32 mt-16 mb-5"></div>
            <p className="text-5xl font-bold">username</p>
            <div className="pt-6 text-base font-bold">
              <div className="flex justify-center">
                <span className="bg-[url('/assets/github/planet.svg')] bg-center bg-cover w-6 h-6"></span>
                <span className="pl-2">1024</span>
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
            <p className="pt-12 text-[#9B9B9B]">WALLET ACCOUNT : 123123125423SADFIAWEOJI</p>
          </div>
        </section>
      )}
    </>
  );
};

export default Mypage;
