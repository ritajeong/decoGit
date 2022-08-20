import type { NextPage } from "next";
import { useState } from "react";
import { Layout } from "../components/layout";

const Home: NextPage = () => {
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
      <Layout login={login} handleSignout={handleSignout} handleSignin={handleSignin}>
        <section className="z-0 flex flex-col items-center w-full h-screen pt-32">
          {/* center labtop image */}
          <div className="z-50 laptop"></div>

          {/* state1 - after sign in, before connecting github */}
          {login && !github && (
            <p className="z-50 pt-16 text-5xl font-black text-black uppercase" onClick={handleGithub}>
              login with github
            </p>
          )}

          {/* state2 - after connecting github */}
          {github && (
            <>
              <p className="z-50 pt-16 text-5xl font-black text-black uppercase" onClick={handleGithub}>
                decorate!
              </p>
              <div className="z-50 flex justify-center h-40 gap-8 pt-16 w-80">
                <span className="bg-[url('/assets/sns/instagram.svg')] icon-sns"></span>
                <span className="bg-[url('/assets/sns/facebook.svg')] icon-sns"></span>
                <span className="bg-[url('/assets/sns/twitter.svg')] icon-sns"></span>
              </div>
            </>
          )}

          {/* absolute sticker zone! */}
          <div className="w-[971px] h-[247px] sticker bg-[url('/assets/logo@3x.png')] left-0 bottom-0 blur-md rotate-[13deg]"></div>
          <div className="w-[120px] h-[120px] sticker bg-[url('/assets/sticker/kotlin.svg')] left-40 top-60 blur-sm"></div>
          <div className="w-[215px] h-[215px] sticker bg-[url('/assets/sticker/c.svg')] right-40 top-60 blur-sm rotate-[17deg]"></div>
          <div className="w-[300px] h-[215px] sticker bg-[url('/assets/sticker/mysql.svg')] right-60 bottom-20 blur-sm"></div>
        </section>
      </Layout>
    </>
  );
};

export default Home;
