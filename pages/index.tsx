import type { NextPage } from "next";
import { Layout } from "../components/layout";

const Home: NextPage = () => {
  return (
    <>
      <Layout>
        <section className="z-0 flex flex-col items-center w-full h-screen pt-40">
          <div className="z-50 labtop"></div>
          <p className="z-50 pt-10 text-5xl font-black text-black uppercase">login with github</p>
          <div className="blured-icon"></div>
          <div className="w-[120px] h-[120px] sticked-icon bg-[url('/assets/sticker/kotlin.svg')] left-40 top-60 blur-sm"></div>
          <div className="w-[215px] h-[215px] sticked-icon bg-[url('/assets/sticker/c.svg')] right-40 top-60 blur-sm rotate-[17deg]"></div>
          <div className="w-[300px] h-[215px] sticked-icon bg-[url('/assets/sticker/mysql.svg')] right-60 bottom-20 blur-sm"></div>
        </section>
      </Layout>
    </>
  );
};

export default Home;
