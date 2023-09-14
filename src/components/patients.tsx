import { forwardRef, useState, type HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { type Patient } from "~/utils";
import PatientDetails from "./patientDetails";

const PatientsList = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & {
    patients: Patient[] | undefined;
  }
>(function PatientsList({ className, patients }, ref) {

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const openPatientDetails = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsDetailsOpen(true);
  };

  const closePatientDetails = () => {
    setIsDetailsOpen(false);
  };

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
                <div className="w-3/4"></div>
                <button className="h-10 w-[15%] rounded-full bg-blue-400" onClick={() => openPatientDetails(patient)}>
                  Karta Pacjenta
                </button>
              </div>
            );
          })}
          {isDetailsOpen && selectedPatient && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg shadow-md max-w-md">
              <button className="absolute top-2 right-2 text-gray-500 hover:text-red-500" onClick={closePatientDetails}>
                &times;
              </button>
              <PatientDetails patient={selectedPatient} onClose={closePatientDetails} />
            </div>
          </div>
      )}
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
