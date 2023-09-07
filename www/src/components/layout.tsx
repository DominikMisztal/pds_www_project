import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Head>
        <title>masz zęby?</title>
        <meta name="description" content="to zaraz możesz nie mieć" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <header className="flex h-24 w-full items-center gap-x-16 bg-gray-300 px-4">
        <div className="h-16 w-16 rounded-full bg-red-700"></div>
        <div className="h-14 w-96 rounded-2xl bg-gray-400 p-3">
          Jan Kowalski lat 33
        </div>
        {/* empty div for creating gap */}
        <div className="w-96"></div>
        <div className="flex h-24 w-20 flex-col items-center pb-1">
          <Link href="/visits">
            <div className="flex h-[4.5rem] w-24 items-center justify-center bg-green-500">
              {" "}
              <Image
                src={"chair.svg"}
                alt="dentist chair"
                width={60}
                height={60}
              ></Image>
            </div>
          </Link>
          Wizyty
        </div>
        <div className="flex h-24 w-20 flex-col items-center pb-1">
          <Link href="/patients">
            <div className="flex h-[4.5rem] w-24 items-center justify-center bg-green-500">
              {" "}
              <Image
                src={"patients.svg"}
                alt="patients"
                width={60}
                height={60}
              ></Image>
            </div>
          </Link>
          Pacjenci
        </div>
        <div className="flex h-24 w-20 flex-col items-center pb-1">
          <Link href="/calendar">
            <div className="flex h-[4.5rem] w-24 items-center justify-center bg-green-500">
              {" "}
              <Image
                src={"calendar.svg"}
                alt="calendar"
                width={60}
                height={60}
              ></Image>
            </div>
          </Link>
          Kalendarz
        </div>
      </header>
      <main className="min-h-[calc(100vh-6rem)] w-full">{children}</main>
    </>
  );
};

export default Layout;
