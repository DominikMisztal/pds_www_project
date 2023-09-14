import { Plus } from "lucide-react";
import { type NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import NewVisitForm from "~/components/new_visit";
import { randomVisits } from "~/utils";

const Visits: NextPage = () => {
  const [isUserAddingVisit, setIsUserAddingVisit] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <>
      {isUserAddingVisit && (
        <div className="fixed top-0 z-10 flex h-full w-full items-center justify-center bg-gray-800 bg-opacity-40">
          <NewVisitForm
            className="z-20"
            onClose={() => setIsUserAddingVisit(false)}
            onSuccess={() => {
              setIsUserAddingVisit(false);
              setIsLoading(true);
            }}
          ></NewVisitForm>
        </div>
      )}
      <div className="flex h-16 items-center px-10">
        <button
          className="flex items-center justify-center gap-1 rounded-xl bg-blue-400 px-3.5 py-2"
          onClick={() => {
            setIsUserAddingVisit(true);
          }}
        >
          Dodaj wizytę <Plus></Plus>
        </button>
      </div>
      <div className="flex h-[calc(100vh-10rem)] w-full items-center justify-center bg-green-300">
        <div className="h-3/4 w-3/4 overflow-y-scroll bg-gray-200">
          {randomVisits.map((visit, index) => {
            return (
              <div
                key={index}
                className="flex h-20 w-full items-center border border-solid border-black px-10 text-xs lg:text-base"
              >
                <div className="w-1/3 p-3 text-center">
                  {visit.date.toUTCString()}
                </div>
                {/* <div className="w-1/3 p-3 text-center">
                  {visit.patientId + " " + visit.patient.surname}
                </div> */}
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
