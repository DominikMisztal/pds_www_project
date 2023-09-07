import { type NextPage } from "next";
import Link from "next/link";
import { randomVisits } from "~/utils";

const Visits: NextPage = () => {
  return (
    <>
      <div className="h-16">
        {" "}
        Nie wiem co tu wstawić ale ten pasek pasuje do tego co mamy w figmie to
        coś tu będzie
      </div>
      <div className="flex h-[calc(100vh-10rem)] w-full items-center justify-center bg-green-300">
        <div className="h-3/4 w-3/4 overflow-y-scroll bg-gray-200">
          {randomVisits.map((visit) => {
            return (
              <div
                key={visit.index}
                className="flex h-20 w-full items-center border border-solid border-black px-10 text-xs lg:text-base"
              >
                <div className="w-1/3 p-3 text-center">
                  {visit.date.toUTCString()}
                </div>
                <div className="w-1/3 p-3 text-center">
                  {visit.patient.name + " " + visit.patient.surname}
                </div>
                <div className="flex w-1/3 justify-end">
                  <Link href="/visit_details">
                    <button className="h-8 w-16 rounded-full bg-blue-400 lg:h-10 lg:w-28">
                      Szczegóły
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Visits;