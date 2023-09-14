import { X } from "lucide-react";
import {
  type FormEvent,
  type HTMLAttributes,
  useRef,
  useState,
  useEffect,
} from "react";
import { twMerge } from "tailwind-merge";
import { ITEMS_PER_PAGE, type Patient } from "~/utils";

export type Visit = {
  index: number;
  date: Date;
  patientId: number;
  doctorId: number;
  duration: number;
  teeth?: unknown;
};

const NewVisitForm: React.FC<
  HTMLAttributes<HTMLDivElement> & {
    onClose: () => void;
    onSuccess: () => void;
  }
> = ({ className, onClose, onSuccess }) => {
  const [patients, setPatients] = useState<Patient[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isNextPageAvailable = false;
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

        isNextPageAvailable = data.length === ITEMS_PER_PAGE;

        setPatients((old) => (old ? [...old, ...data] : data));
      }
    };

    const fetchData = async () => {
      for (let i = 1; ; i++) {
        await fetchUsers(i);
        if (!isNextPageAvailable) {
          break;
        }
      }

      setIsLoading(false);
    };

    fetchData().catch((e) => console.error(e));

    return () => controller.abort();
  }, []);

  const dateRef = useRef<HTMLInputElement>(null);
  const patientRef = useRef<HTMLInputElement>(null);
  const lengthRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className={twMerge(
        "w-full max-w-md space-y-8 rounded-lg bg-white p-4 shadow-md",
        className
      )}
    >
      <X className="cursor-pointer hover:stroke-gray-500" onClick={onClose}></X>
      <h2 className="text-center text-3xl font-extrabold">Nowa wizyta</h2>
      <form
        className="mt-8 space-y-6"
        onSubmit={(e: FormEvent) => {
          e.preventDefault();

          const fetchData = async () => {
            const patient = {
              date: dateRef.current?.valueAsDate
                ?.toISOString()
                .replaceAll(/[TZ]/g, " "),
              patient: patientRef.current?.value.split(".")[0],
              duration: lengthRef.current?.valueAsNumber,
            };

            const res = await fetch("http://localhost:3001/database/visit", {
              method: "POST",
              credentials: "include",
              body: JSON.stringify(patient),
              headers: {
                "Content-Type": "application/json",
              },
            });

            if (res.ok) {
              onSuccess();
            }
          };

          fetchData().catch((e) => console.error(e));
        }}
      >
        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
          >
            Data wizyty
          </label>
          <input
            id="date"
            type="datetime-local"
            required
            className="mt-1 w-full rounded-md border p-2"
            ref={dateRef}
          />
        </div>

        <div>
          <label
            htmlFor="patient"
            className="block text-sm font-medium text-gray-700"
          >
            Pacjent
          </label>
          <input
            id="patient"
            list="patients"
            required
            className="mt-1 w-full rounded-md border p-2"
            ref={patientRef}
          />
          <datalist id="patients">
            {patients?.map((patient) => (
              <option
                key={patient.id}
                value={`${patient.id}. ${patient.name} ${patient.surname}`}
              ></option>
            ))}
          </datalist>

          {isLoading && (
            <div className="opacity-50">Wczytywanie listy pacjentów...</div>
          )}
        </div>

        <div>
          <label
            htmlFor="length"
            className="block text-sm font-medium text-gray-700"
          >
            Długość wizyty
          </label>
          <input
            id="length"
            type="number"
            required
            className="mt-1 w-full rounded-md border p-2"
            ref={lengthRef}
          />
        </div>

        <div>
          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Stwórz
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewVisitForm;
