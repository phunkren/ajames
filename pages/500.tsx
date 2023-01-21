import { ReactElement } from "react";
import { ErrorFallback } from "../components/ErrorFallback";
import { Layout } from "../components/Layout";
import { NextPageWithLayout } from "./_app";

const Error: NextPageWithLayout = () => {
  return <ErrorFallback />;
};

Error.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Error;
