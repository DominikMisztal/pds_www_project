import { type TeethData } from "~/utils";

const Teeth: React.FC<{
  teeth: TeethData;
}> = ({ teeth }) => {
  const upperTeeth = teeth.teeth.slice(0, 16);
  const bottomTeeth = teeth.teeth.slice(16, 32);

  return (
    <div className="container flex flex-col items-center justify-center gap-1">
      <div className="flex items-center justify-center gap-1">
        {upperTeeth.map(({ operations }, index, teeth) => (
          <div
            key={index}
            className={`flex h-24 w-5 flex-col items-center lg:w-8`}
          >
            <div className="h-12 border-b-[2rem] border-l-[0.5rem] border-r-[0.5rem] border-b-white border-l-transparent border-r-transparent lg:border-l-[1rem] lg:border-r-[1rem]"></div>
            <div
              className={`h-12 w-5 border border-solid border-black lg:w-8 ${
                !operations ? "bg-white" : "bg-black"
              }`}
            ></div>
            {index < teeth.length / 2
              ? Math.abs(teeth.length / 2 - index)
              : Math.abs(teeth.length / 2 - (index + 1))}
          </div>
        ))}
      </div>
      {/* empty div for gap */}
      <div className="h-10"></div>
      <div className="flex items-center justify-center gap-1">
        {bottomTeeth.map((isToothHealthy, index, teeth) => (
          <div
            key={index}
            className={`flex h-24 w-5 flex-col items-center lg:w-8`}
          >
            {index < teeth.length / 2
              ? Math.abs(teeth.length / 2 - index)
              : Math.abs(teeth.length / 2 - (index + 1))}
            <div
              className={`h-12 w-5 border border-solid border-black lg:w-8 ${
                isToothHealthy ? "bg-white" : "bg-black"
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
