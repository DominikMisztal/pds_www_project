import { useEffect, useState } from "react";
import { Operation } from "~/utils";

const possibleIlnesses = [
  "PRÓCHNICA",
  "KAMIEŃ",
  "PARADONTOZA",
  "ZGORZEL",
  "NADWRAŻLIWOŚĆ",
  "RAK",
  "RAK",
  "RAK",
  "RAK",
  "RAK",
  "RAK",
] as const;

const Illnesses: React.FC = () => {
  const [diagnosis, setDiagnosis] = useState<Operation[]>();
  const [treatments, setTreatments] = useState<Operation[]>();

  const [areTreatmentsShown, setAreTreatmentsShown] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>();

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      const res = await fetch("http://localhost:3001/database/operations", {
        credentials: "include",
        signal: controller.signal,
      });

      if (res.ok) {
        const data = (await res.json()) as Operation[];

        setDiagnosis(data.filter((item) => item.type === "DIAGNOSIS"));
        setTreatments(data.filter((item) => item.type === "TREATMENT"));
        setIsLoading(false);
      }
    };

    fetchData().catch((e) => console.error(e));

    return () => controller.abort();
  }, []);
  return (
    <div className="container flex flex-col">
      <div className="flex h-10 w-full">
        <div
          className="flex w-1/2 cursor-pointer items-center justify-center bg-blue-500"
          onClick={() => {
            setAreTreatmentsShown(false);
          }}
        >
          Rozpoznania
        </div>
        <div
          className="flex w-1/2 cursor-pointer items-center justify-center bg-blue-300"
          onClick={() => {
            setAreTreatmentsShown(true);
          }}
        >
          Operacje
        </div>
      </div>
      <input
        type="text"
        className="h-10 text-center"
        placeholder="Kiedyś wyszukiwanie będzie działać. Kiedyś..."
      ></input>
      <div className="flex h-96 w-full flex-col overflow-y-scroll">
        {areTreatmentsShown
          ? treatments?.map((operation, index) => (
              <div
                key={index}
                className="flex h-10 w-full flex-shrink-0 flex-grow-0 items-center justify-center border border-solid border-black bg-blue-100"
              >
                {operation.name}
              </div>
            ))
          : diagnosis?.map((operation, index) => (
              <div
                key={index}
                className="flex h-10 w-full flex-shrink-0 flex-grow-0 items-center justify-center border border-solid border-black bg-blue-100"
              >
                {operation.name}
              </div>
            ))}
      </div>
    </div>
  );
};

export default Illnesses;
