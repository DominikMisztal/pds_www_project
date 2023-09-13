import { Plus } from "lucide-react";
import { type NextPage } from "next";
import { useEffect, useState } from "react";
import Loading from "~/components/loading";
import NewPatientForm from "~/components/new_patient";
import PatientsList from "~/components/patients";
import { type Patient } from "~/utils";

const Patients: NextPage = () => {
  const [isUserAddingPatient, setIsUserAddingPatient] =
    useState<boolean>(false);

  const [patients, setPatients] = useState<Patient[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(`http://localhost:3001/database/my_patients`, {
        credentials: "include",
      });

      if (res.ok) {
        const { data } = (await res.json()) as {
          data: Patient[];
          meta: number;
        };
        setPatients(data);
        setIsLoading(false);
      }
    };

    fetchUsers().catch((e) => {
      console.error(e);
    });
  }, []);

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
        {isLoading ? (
          <Loading></Loading>
        ) : (
          <PatientsList patients={patients}></PatientsList>
        )}
      </div>
    </>
  );
};

export default Patients;
