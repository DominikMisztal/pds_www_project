import { useEffect, useState } from "react";
import { type Operation } from "~/utils";
import Loading from "./loading";

const Treatments: React.FC<{
  operations: Operation[];
  teethOperations: { index: number; operations?: number[] }[];
  selectedTooth: number;
}> = ({ operations, teethOperations, selectedTooth }) => {
  const diagnosis = operations.filter((item) => item.type === "DIAGNOSIS");
  const treatments = operations.filter((item) => item.type === "TREATMENT");

  const [areTreatmentsShown, setAreTreatmentsShown] = useState<boolean>(false);

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
                className="flex h-10 w-full flex-shrink-0 flex-grow-0 cursor-pointer items-center justify-center border border-solid border-black bg-blue-100"
                onClick={() => {
                  teethOperations
                    .find((tooth) => tooth.index === index)
                    ?.operations?.push(operation.id);
                }}
              >
                {operation.name}
              </div>
            ))
          : diagnosis?.map((operation, index) => (
              <div
                key={index}
                className="flex h-10 w-full flex-shrink-0 flex-grow-0 cursor-pointer items-center justify-center border border-solid border-black bg-blue-100"
                onClick={() => {
                  teethOperations
                    .find((tooth) => tooth.index === index)
                    ?.operations?.push(operation.id);
                }}
              >
                {operation.name}
              </div>
            ))}
      </div>
    </div>
  );
};

export default Treatments;
