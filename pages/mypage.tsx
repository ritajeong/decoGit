/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Navigation } from "../components/navigation";
import { useInfo } from "../lib/InfoContext";
import { ProfileCard } from "../components/profileCard";
import { useAddress } from "../hooks/useAddress";

const Mypage: NextPage = () => {
  const { login, loading, keplr, github, githubInfo, handleSignout, connectWallet, fetchGithub } = useInfo();
  const router = useRouter();
  const address = useAddress(keplr);

  useEffect(() => {
    if (!login && !loading) {
      router.push("/");
    }
  }, [login, loading]);

  useEffect(() => {
    if (login && address) {
      fetchGithub();
    }
  }, [login, address])

  return (
    <>
      <Navigation />
      {login && (
        <div className="overflow-hidden w-full h-[100vh] relative">
          <div className="flex row justify-center gap-[10vw] -ml-[80vw]" style={{ width: "260vw" }}>
            <div className="blur opacity-60">
              <ProfileCard blurred={true} github={github} githubInfo={githubInfo} />
            </div>
            <ProfileCard blurred={false} github={github} githubInfo={githubInfo} />
            <div className="blur opacity-60">
              <ProfileCard blurred={true} github={github} githubInfo={githubInfo} />
            </div>
          </div>
          <div className="blur opacity-60">
            <ProfileCard blurred={true} github={github} githubInfo={githubInfo} />
          </div>
        </div>
      )}
    </>
  );
};

export default Mypage;
