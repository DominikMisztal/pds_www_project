import { X } from "lucide-react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { type Operation } from "~/utils";

const Treatments: React.FC<{
  operations: Operation[];
  updateTeeth: (
    index: number,
    teeth: { index: number; operations: number[] }[]
  ) => void;
  teethOperations: { index: number; operations: number[] }[];
  selectedTooth: number;
}> = ({ operations, teethOperations, selectedTooth, updateTeeth }) => {
  const diagnosis = operations.filter((item) => item.type === "DIAGNOSIS");
  const treatments = operations.filter((item) => item.type === "TREATMENT");

  const [areTreatmentsShown, setAreTreatmentsShown] = useState<boolean>(false);
  const selectedTeethOperations = teethOperations.find(
    (item) => item.index === selectedTooth
  )!.operations;

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
                className={twMerge(
                  "tap-3 relative flex h-10 w-full flex-shrink-0 flex-grow-0 cursor-pointer items-center justify-center border border-solid border-black bg-blue-100",
                  selectedTeethOperations.find(
                    (item) => item === operation.id
                  ) && "bg-blue-200"
                )}
                onClick={() => {
                  if (
                    selectedTeethOperations.find(
                      (item) => item === operation.id
                    )
                  ) {
                    const op = teethOperations.find(
                      (tooth) => tooth.index === selectedTooth
                    );

                    op!.operations = op!.operations.filter(
                      (item) => item !== operation.id
                    );
                  } else {
                    teethOperations
                      .find((tooth) => tooth.index === selectedTooth)
                      ?.operations?.push(operation.id);
                  }

                  updateTeeth(index, teethOperations);
                }}
              >
                {operation.name}
              </div>
            ))
          : diagnosis?.map((operation, index) => (
              <div
                key={index}
                className={twMerge(
                  "tap-3 relative flex h-10 w-full flex-shrink-0 flex-grow-0 cursor-pointer items-center justify-center border border-solid border-black bg-blue-100",
                  selectedTeethOperations.find(
                    (item) => item === operation.id
                  ) && "bg-blue-200"
                )}
                onClick={() => {
                  if (
                    selectedTeethOperations.find(
                      (item) => item === operation.id
                    )
                  ) {
                    const op = teethOperations.find(
                      (tooth) => tooth.index === selectedTooth
                    );

                    op!.operations = op!.operations.filter(
                      (item) => item !== operation.id
                    );
                  } else {
                    teethOperations
                      .find((tooth) => tooth.index === selectedTooth)
                      ?.operations?.push(operation.id);
                  }

                  updateTeeth(index, teethOperations);
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
