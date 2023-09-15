import { twMerge } from "tailwind-merge";
import { Operation, type TeethData } from "~/utils";

const Teeth: React.FC<{
  operationsData: Operation[];
  teeth: TeethData;
  selectedTooth: number;
  setSelected: (arg0: number) => void;
}> = ({ operationsData, teeth, selectedTooth, setSelected }) => {
  const upperTeeth = teeth.teeth.slice(0, 16);
  const bottomTeeth = teeth.teeth.slice(16, 32);

  return (
    <div className="container flex flex-col items-center justify-center gap-1">
      <div className="flex items-center justify-center gap-1">
        {upperTeeth.map(({ operations, index }, upperIndex, teeth) => (
          <div
            key={upperIndex}
            className={twMerge(
              "flex h-24 w-5 cursor-pointer flex-col items-center lg:w-8",
              index === selectedTooth && "font-bold"
            )}
            onClick={() => setSelected(index)}
          >
            <div className="h-12 border-b-[2rem] border-l-[0.5rem] border-r-[0.5rem] border-b-white border-l-transparent border-r-transparent lg:border-l-[1rem] lg:border-r-[1rem]"></div>
            <div
              className={twMerge(
                `h-12 w-5 border border-solid border-black bg-white lg:w-8`,
                operations[0] &&
                  operationsData.find((item) => item.id === operations[0]) &&
                  `bg-[#${
                    operationsData.find((item) => item.id === operations[0])!
                      .color
                  }]`
              )}
            ></div>
            {upperIndex < teeth.length / 2
              ? Math.abs(teeth.length / 2 - upperIndex)
              : Math.abs(teeth.length / 2 - (upperIndex + 1))}
          </div>
        ))}
      </div>
      {/* empty div for gap */}
      <div className="h-10"></div>
      <div className="flex items-center justify-center gap-1">
        {bottomTeeth.map(({ operations, index }, bottomIndex, teeth) => (
          <div
            key={bottomIndex}
            className={twMerge(
              "flex h-24 w-5 cursor-pointer flex-col items-center lg:w-8",
              index === selectedTooth && "font-bold"
            )}
            onClick={() => setSelected(index)}
          >
            {bottomIndex < teeth.length / 2
              ? Math.abs(teeth.length / 2 - bottomIndex)
              : Math.abs(teeth.length / 2 - (bottomIndex + 1))}
            <div
              className={`h-12 w-5 border border-solid border-black lg:w-8 ${
                !operations[0] ? "bg-white" : "bg-black"
              }`}
            ></div>
            <div className="h-12 border-l-[0.5rem] border-r-[0.5rem] border-t-[2rem] border-l-transparent border-r-transparent border-t-white lg:border-l-[1rem] lg:border-r-[1rem]"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teeth;
