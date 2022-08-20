import type { NextPage } from "next";
import { useState } from "react";
import { LayoutWhite } from "../components/layoutWhite";
import { ProfileCard } from "../components/profileCard";
// import { useState } from "react";

const Mypage: NextPage = () => {
  const [login, setLogin] = useState(false);
  const [github, setGithub] = useState(false);
  const handleSignin = () => {
    // 화면 분기용 테스트코드
    // localStorage.setItem("token");
    console.log("clicked signout");
    setLogin(true);
  };
  const handleSignout = () => {
    // localStorage.removeItem("token");
    console.log("clicked signout");
    setLogin(false);
  };
  const handleGithub = () => {
    console.log("connected github");
    setGithub(true);
  };
  return (
    <>
      <LayoutWhite login={login} handleSignout={handleSignout} handleSignin={handleSignin}>
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
      </LayoutWhite>
    </>
  );
};

export default Mypage;
