import { Plus } from "lucide-react";
import { type NextPage } from "next";
import { useState } from "react";
import NewPatientForm from "~/components/new_patient";
import { randomPatients } from "~/utils";

const Patients: NextPage = () => {
  const [isUserAddingPatient, setIsUserAddingPatient] =
    useState<boolean>(false);

  return (
    <>
      {isUserAddingPatient && (
        <div className="fixed top-0 z-10 flex h-full w-full items-center justify-center bg-gray-800 bg-opacity-40">
          <NewPatientForm
            className="z-20"
            onClose={() => setIsUserAddingPatient(false)}
          ></NewPatientForm>
        </div>
      )}
      <div className="flex h-16 items-center px-10">
        <button
          className="flex items-center justify-center gap-1 rounded-xl bg-blue-400 px-3.5 py-2"
          onClick={() => {
            setIsUserAddingPatient(true);
          }}
        >
          Dodaj pacjenta <Plus></Plus>
        </button>
      </div>
      <div className="flex h-[calc(100vh-10rem)] items-center justify-center bg-green-300">
        <div className="h-3/4 w-3/4 overflow-y-scroll bg-gray-200">
          {randomPatients.map((patient) => {
            return (
              <div
                key={patient.index}
                className="flex h-20 w-full items-center border border-solid border-black px-10"
              >
                <div className="w-1/2">
                  {patient.name + " " + patient.surname}
                </div>
                {/* empty div for gap */}
                <div className="w-3/4"></div>
                <button className="h-10 w-28 rounded-full bg-blue-400">
                  Wizyty
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Patients;
