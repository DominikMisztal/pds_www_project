import { forwardRef, type HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { type Patient } from "~/utils";

const PatientsList = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & {
    patients: Patient[] | undefined;
  }
>(function PatientsList({ className, patients }, ref) {
  return (
    <div
      className={twMerge(
        "h-3/4 w-3/4 overflow-y-scroll bg-gray-200",
        className
      )}
    >
      {patients ? (
        <>
          {patients.map((patient) => {
            return (
              <div
                key={patient.id}
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
          <div className="h-0 w-0" ref={ref}></div>
        </>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          Nie znaleziono przypisanych ci pacjentów
        </div>
      )}
    </div>
  );
});

export default PatientsList;
