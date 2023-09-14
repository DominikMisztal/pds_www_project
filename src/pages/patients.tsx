import { Plus } from "lucide-react";
import { type NextPage } from "next";
import { useEffect, useState } from "react";
import Loading from "~/components/loading";
import NewPatientForm from "~/components/new_patient";
import PatientsList from "~/components/patients";
import { ITEMS_PER_PAGE, type Patient } from "~/utils";
import { useInView } from "react-intersection-observer";

const Patients: NextPage = () => {
  const [isUserAddingPatient, setIsUserAddingPatient] =
    useState<boolean>(false);

  const [patients, setPatients] = useState<Patient[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isNextPageAvailable, setIsNextPageAvailable] = useState<boolean>(true);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      setIsLoading(true);
      console.log("inView");
    }
  }, [inView]);

  useEffect(() => {
    if (!isLoading || !isNextPageAvailable) {
      return;
    }

    const controller = new AbortController();

    const fetchUsers = async (page: number) => {
      const res = await fetch(
        `http://localhost:3001/database/my_patients?page=${page}`,
        {
          credentials: "include",
          signal: controller.signal,
        }
      );

      if (res.ok) {
        const { data, meta } = (await res.json()) as {
          data: Patient[];
          meta: { page: string };
        };

        console.log(meta);
        setIsLoading(false);
        setPageNumber(+meta.page + 1);
        setIsNextPageAvailable(data.length === ITEMS_PER_PAGE);

        setPatients((old) =>
          old
            ? [...old.slice(0, (+meta.page - 1) * ITEMS_PER_PAGE), ...data]
            : data
        );
      }
    };

    fetchUsers(pageNumber).catch((e) => {
      console.error(e);
    });

    return () => controller.abort();
  }, [isLoading, inView, pageNumber, isNextPageAvailable]);

  return (
    <>
      {isUserAddingPatient && (
        <div className="fixed top-0 z-10 flex h-full w-full items-center justify-center bg-gray-800 bg-opacity-40">
          <NewPatientForm
            className="z-20"
            onClose={() => setIsUserAddingPatient(false)}
            onSuccess={() => {
              setIsUserAddingPatient(false);
              setPageNumber((old) => old - 1);
              setIsNextPageAvailable(true);
              setIsLoading(true);
            }}
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
        {!patients && isLoading ? (
          <Loading></Loading>
        ) : (
          <>
            <PatientsList patients={patients} ref={ref}></PatientsList>
          </>
        )}
      </div>
    </>
  );
};

export default Patients;
