import Head from "next/head";
import Header from "./header";
import { useSession } from "~/context/sessionProvider";
import { Loader } from "lucide-react";
import Login from "./login";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { isLoading, isLoggedIn } = useSession();

  return (
    <>
      <Head>
        <title>masz zęby?</title>
        <meta name="description" content="to zaraz możesz nie mieć" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Header></Header>

      {isLoading && (
        <div className="flex h-screen w-screen items-center justify-center gap-2 text-xl text-black">
          <Loader className="animate-spin"></Loader> Loading...
        </div>
      )}

      <main className="min-h-[calc(100vh-4rem)] w-full lg:min-h-[calc(100vh-6rem)]">
        {isLoggedIn ? (
          children
        ) : (
          <div className="relative flex h-[calc(100vh-4rem)] w-full items-center justify-center lg:h-[calc(100vh-6rem)]">
            <Login></Login>
          </div>
        )}
      </main>
    </>
  );
};

export default Layout;
