import type { NextPage } from "next";
import { Layout } from "../components/layout";

const Home: NextPage = () => {
  return (
    <>
      <Layout>
        <section className="pt-8 pl-4 h-[1020px] w-full sm:pl-10 md:pl-20 lg:pl-40 xl:pl-80">
          <div className="labtop"></div>
        </section>
      </Layout>
    </>
  );
};

export default Home;
