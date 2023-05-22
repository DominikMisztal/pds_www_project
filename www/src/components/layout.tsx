import Image from "next/image";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="container">
      <header className="flex h-24 items-center gap-x-16 bg-gray-300 px-4">
        {" "}
        <div className="h-16 w-16 rounded-full bg-red-700"></div>
        <div className="h-14 w-96 rounded-2xl bg-gray-400 p-3">
          {" "}
          Jan Kowalski lat 33
        </div>
        {/* empty div for creating gap */}
        <div className="w-96"></div>
        <div className="flex h-24 w-20 flex-col items-center pb-1">
          <div className="flex h-[4.5rem] w-24 items-center justify-center bg-green-500">
            {" "}
            <Image
              src={"chair.svg"}
              alt="dentist chair"
              width={60}
              height={60}
            ></Image>
          </div>
          Wizyty
        </div>
        <div className="flex h-24 w-20 flex-col items-center pb-1">
          <div className="flex h-[4.5rem] w-24 items-center justify-center bg-green-500">
            {" "}
            <Image
              src={"patients.svg"}
              alt="patients"
              width={60}
              height={60}
            ></Image>
          </div>
          Pacjenci
        </div>
        <div className="flex h-24 w-20 flex-col items-center pb-1">
          <div className="flex h-[4.5rem] w-24 items-center justify-center bg-green-500">
            {" "}
            <Image
              src={"calendar.svg"}
              alt="calendar"
              width={60}
              height={60}
            ></Image>
          </div>
          Kalendarz
        </div>
      </header>
      {children}
    </div>
  );
};

export default Layout;
