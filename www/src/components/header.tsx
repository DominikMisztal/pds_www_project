import Link from "next/link";
import Image from "next/image";

const Header: React.FC<{ name?: string; age?: number }> = ({
  name = "Jan Kowalski",
  age = "33",
}) => {
  return (
    <header className="flex h-24 w-full items-center gap-x-16 bg-gray-300 px-4">
      <div className="flex h-full w-1/2 items-center justify-start gap-16 pl-4">
        <div className="h-16 w-16 rounded-full bg-red-700"></div>
        <div className="flex h-14 w-96 items-center rounded-2xl bg-gray-400 p-3">
          {`${name}, lat ${age}`}
        </div>
      </div>

      <div className="flex h-full w-1/2 items-center justify-end gap-16 pr-10">
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
      </div>
    </header>
  );
};

export default Header;
