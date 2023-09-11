import Link from "next/link";
import Image from "next/image";

const Header: React.FC = () => {
  return (
    <header className="flex h-16 w-full items-center gap-x-16 bg-gray-300 px-4 lg:h-24">
      <div className="flex h-full w-1/2 items-center justify-start gap-5 lg:gap-16 lg:pl-4">
        <div className="h-10 w-10 rounded-full bg-red-700 lg:h-16 lg:w-16"></div>
      </div>

      <div className="flex h-full w-1/2 items-center justify-end gap-5 text-xs lg:gap-16 lg:pr-10 lg:text-base">
        <div className="flex h-full w-10 flex-col items-center justify-center pb-1 lg:w-20">
          <div className="relative flex h-10 w-full items-center justify-center bg-green-500 lg:h-[4.5rem]">
            <Link href="/visits">
              <Image
                src={"chair.svg"}
                alt="dentist chair"
                fill
                className="p-1.5"
              ></Image>
            </Link>
          </div>
          Wizyty
        </div>
        <div className="flex h-full w-10 flex-col items-center justify-center pb-1 lg:w-20">
          <div className="relative flex h-10 w-full items-center justify-center bg-green-500 lg:h-[4.5rem]">
            <Link href="/patients">
              <Image
                src={"patients.svg"}
                alt="patients"
                fill
                className="p-1.5"
              ></Image>
            </Link>
          </div>
          Pacjenci
        </div>
        <div className="flex h-full w-10 flex-col items-center justify-center pb-1 lg:w-20">
          <div className="relative flex h-10 w-full items-center justify-center bg-green-500 lg:h-[4.5rem]">
            <Link href="/calendar">
              <Image
                src={"calendar.svg"}
                alt="calendar"
                fill
                className="p-1.5"
              ></Image>
            </Link>
          </div>
          Kalendarz
        </div>
      </div>
    </header>
  );
};

export default Header;
