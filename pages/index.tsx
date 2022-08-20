import type { NextPage } from "next";
import { Layout } from "../components/layout";

const Home: NextPage = () => {
  return (
    <>
      <Layout>
        <section className="pt-8 pl-4 h-[1020px] w-full sm:pl-10 md:pl-20 lg:pl-40 xl:pl-80">
          <div className="shadow-searchbar rounded-lg absolute h-[500px] opacity-80 w-[343px] z-40 bg-lightgrey-2 flex pl-4 sm:w-[400px] md:w-[600px] lg:w-[800px]">
            <p className="pt-2 pl-2 text-grey-1 text-display2">mac image</p>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Home;
