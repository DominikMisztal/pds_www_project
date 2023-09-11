import { type AppType } from "next/dist/shared/lib/utils";
import Layout from "~/components/layout";
import SessionProvider from "~/context/sessionProvider";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <SessionProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
};

export default MyApp;
