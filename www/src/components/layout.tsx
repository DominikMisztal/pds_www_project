import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Header from "./header";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Head>
        <title>masz zęby?</title>
        <meta name="description" content="to zaraz możesz nie mieć" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Header></Header>

      <main className="min-h-[calc(100vh-6rem)] w-full">{children}</main>
    </>
  );
};

export default Layout;
