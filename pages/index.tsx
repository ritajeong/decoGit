import type { NextPage } from "next";
import { useState } from "react";
import { Layout } from "../components/layout";

const Home: NextPage = () => {
  const [login, setLogin] = useState(false);
  const handleSignout = () => {
    // localStorage.removeItem("token");
    console.log("clicked signout");
    setLogin(false);
  };

  return (
    <>
      <Layout login={login} handleSignout={handleSignout}>
        <section className="z-0 flex flex-col items-center w-full h-screen pt-40 relative overflow-hidden">
          <div className="z-50 laptop"></div>
          {login && <p className="z-50 pt-10 text-5xl font-black text-black uppercase">login with github</p>}
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
