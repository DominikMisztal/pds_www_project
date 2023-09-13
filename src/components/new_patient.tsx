import { X } from "lucide-react";
import { type FormEvent, useRef, type HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { calculateAge } from "~/utils";

const NewPatientForm: React.FC<
  HTMLAttributes<HTMLDivElement> & { onClose: () => void }
> = ({ className, onClose }) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const surnameRef = useRef<HTMLInputElement>(null);
  const birthdayRef = useRef<HTMLInputElement>(null);
  const peselRef = useRef<HTMLInputElement>(null);
  const maleRef = useRef<HTMLInputElement>(null);
  const femaleRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className={twMerge(
        "w-full max-w-md space-y-8 rounded-lg bg-white p-4 shadow-md",
        className
      )}
    >
      <X className="cursor-pointer hover:stroke-gray-500" onClick={onClose}></X>
      <h2 className="text-center text-3xl font-extrabold">Nowy pacjent</h2>
      <form
        className="mt-8 space-y-6"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={async (e: FormEvent) => {
          e.preventDefault();

          const patient = {
            name: nameRef.current?.value,
            surname: surnameRef.current?.value,
            birthday: birthdayRef.current?.value,
            pesel: peselRef.current?.value,
            gender: maleRef.current?.checked ? "MALE" : "FEMALE",
            age: calculateAge(birthdayRef.current!.valueAsDate!),
          };

          const res = await fetch("http://localhost:3001/database/patient", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(patient),
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (res.ok) {
            onClose();
          }
        }}
      >
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Imię
          </label>
          <input
            id="name"
            type="text"
            required
            className="mt-1 w-full rounded-md border p-2"
            ref={nameRef}
          />
        </div>
        <div>
          <label
            htmlFor="surname"
            className="block text-sm font-medium text-gray-700"
          >
            Nazwisko
          </label>
          <input
            id="surname"
            type="text"
            required
            className="mt-1 w-full rounded-md border p-2"
            ref={surnameRef}
          />

          <label
            htmlFor="birthday"
            className="block text-sm font-medium text-gray-700"
          >
            Data urodzenia
          </label>
          <input
            id="birthday"
            type="date"
            required
            className="mt-1 w-full rounded-md border p-2"
            ref={birthdayRef}
          />
        </div>
        <div>
          <label
            htmlFor="pesel"
            className="block text-sm font-medium text-gray-700"
          >
            PESEL
          </label>
          <input
            id="pesel"
            type="text"
            required
            className="mt-1 w-full rounded-md border p-2"
            ref={peselRef}
          />
        </div>
        <div className="flex">
          <label
            htmlFor="gender"
            className="block text-sm font-medium text-gray-700"
          >
            Mężczyzna
          </label>
          <input
            id="gender-male"
            type="radio"
            name="gender"
            required
            className="mt-1 w-full rounded-md border p-2"
            ref={maleRef}
          />
          <label
            htmlFor="gender"
            className="block text-sm font-medium text-gray-700"
          >
            Kobieta
          </label>
          <input
            id="gender-female"
            type="radio"
            name="gender"
            required
            className="mt-1 w-full rounded-md border p-2"
            ref={femaleRef}
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

export default NewPatientForm;
