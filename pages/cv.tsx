import { NextPage } from "next";
import { memo } from "react";
import Layout from "../components/Layout";

const Cv: NextPage = memo(() => {
  return (
    <Layout>
      <h1>CV</h1>
    </Layout>
  );
});

export default Cv;
