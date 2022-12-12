import { NextPage } from "next";
import { memo } from "react";
import Layout from "../components/Layout";

const Home: NextPage = memo(() => {
  return (
    <Layout>
      <h1>AJAMES.DEV</h1>
    </Layout>
  );
});

export default Home;
