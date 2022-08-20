/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Navigation } from "../components/navigation";
import { useInfo } from "../lib/InfoContext";
import { ProfileCard } from "../components/profileCard";

const Mypage: NextPage = () => {
  const { login, loading, keplr, github, handleGithub, handleSignout, connectWallet } = useInfo();

  const router = useRouter();

  useEffect(() => {
    if (!login && !loading) {
      router.push("/");
    }
  }, [login, loading]);
  return (
    <>
      <Navigation login={login} handleSignout={handleSignout} connectWallet={connectWallet} />
      {login && (
        <div className="overflow-hidden w-full h-[100vh] relative">
          <div className="flex row justify-center gap-[10vw] -ml-[80vw]" style={{ width: "260vw" }}>
            <div className="blur opacity-60">
              <ProfileCard />
            </div>
            <ProfileCard />
            <div className="blur opacity-60">
              <ProfileCard />
            </div>
          </div>
          <div className="blur opacity-60">
            <ProfileCard />
          </div>
        </div>
      )}
    </>
  );
};

export default Mypage;
