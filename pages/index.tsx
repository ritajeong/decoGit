import type { NextPage } from "next";
import { Navigation } from "../components/navigation";
import { MainButton } from "../components/mainButton";
import { useInfo } from "../lib/InfoContext";

const Home: NextPage = () => {
  const { login, keplr, github, handleGithub, handleSignout, connectWallet } = useInfo();

  return (
    <>
      <Navigation login={login} handleSignout={handleSignout} connectWallet={connectWallet} />
      <main className="bg-[url('/assets/bg-image.png')] bg-center bg-cover">
        <section className="z-0 flex flex-col items-center w-full h-screen pt-32">
          {/* center labtop image */}
          <div className="z-50 w-[320px] h-[200px] lg:w-[32vw] lg:h-[20vw] laptop shrink-0"></div>

          {/* state1 - after sign in, before connecting github */}
          {login && !github && (
            <>
              <div className="pt-16" />
              <MainButton onClick={handleGithub}>
                <p className="text-5xl font-black text-black uppercase">login with github</p>
              </MainButton>
            </>
          )}

          {/* state2 - after connecting github */}
          {login && github && (
            <>
              <div className="pt-16" />
              <MainButton onClick={handleGithub}>
                <p className="text-5xl font-black text-black uppercase">decorate!</p>
              </MainButton>
              <div className="z-50 flex justify-center h-40 gap-8 pt-16 w-80">
                <span className="bg-[url('/assets/sns/instagram.svg')] icon-sns"></span>
                <span className="bg-[url('/assets/sns/facebook.svg')] icon-sns"></span>
                <span className="bg-[url('/assets/sns/twitter.svg')] icon-sns"></span>
              </div>
            </>
          )}

          {!login && (
            <div className="main-sticker-container">
              {/* absolute sticker zone! */}
              <div className="main-sticker main-sticker-1" />
              <div className="main-sticker main-sticker-2" />
              <div className="main-sticker main-sticker-3" />
              <div className="main-sticker main-sticker-4" />
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default Home;
