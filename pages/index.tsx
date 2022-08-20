import type { NextPage } from "next";
import { Layout } from "../components/layout";
// import Image from "next/image";

const Home: NextPage = () => {
  return (
    <>
      <Layout>
        <section className="pt-8 pl-4 h-[1020px] w-full bg-[linear-gradient(242.94deg,#0068ff_0%,#99ffff_100%)] sm:pl-10 md:pl-20 lg:pl-40 xl:pl-80">
          <div className="relative h-[100px]">
            <div className="w-[252px] h-[290px] absolute right-[-20px] top-[-30px] z-2">
              {/* <Image src="/assets/hero-image.svg" alt="" width={252} height={290}></Image> */}
            </div>
            <h1 className="text-2xl pb-4 text-[#fff98a]">Decorate your laptop!</h1>
            <div className="shadow-searchbar rounded-lg absolute h-[500px] opacity-80 w-[343px] z-40 bg-lightgrey-2 flex pl-4 sm:w-[400px] md:w-[600px] lg:w-[800px]">
              {/* <Image src="/assets/icon-search.svg" alt="" width={20} height={20}></Image> */}
              <p className="pt-2 pl-2 text-grey-1 text-display2">mac image</p>
            </div>
          </div>
          {/* <Image src="/assets/hero-text.svg" alt="" width={156} height={20}></Image> */}
        </section>
      </Layout>
    </>
  );
};

export default Home;
