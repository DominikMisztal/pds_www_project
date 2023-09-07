import { type NextPage } from "next";
import { randomPatients } from "~/utils";

const Patients: NextPage = () => {
  return (
    <>
      <div className="h-16">
        {" "}
        Nie wiem co tu wstawić ale ten pasek pasuje do tego co mamy w figmie to
        coś tu będzie
      </div>
      <div className="flex h-[calc(100vh-10rem)] items-center justify-center bg-green-300">
        <div className="h-3/4 w-3/4 overflow-y-scroll bg-gray-200">
          {randomPatients.map((patient) => {
            return (
              <div
                key={patient.index}
                className="flex h-20 w-full items-center border border-solid border-black px-10"
              >
                {" "}
                <div className="w-1/2">
                  {" "}
                  {patient.name + " " + patient.surname}{" "}
                </div>
                {/* empty div for gap */}
                <div className="w-3/4"></div>
                <button className="h-10 w-28 rounded-full bg-blue-400">
                  {" "}
                  Wizyty{" "}
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
