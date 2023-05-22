import { useState } from "react";

const Teeth: React.FC<{
  upperTeeth: boolean[];
  bottomTeeth: boolean[];
}> = ({ upperTeeth, bottomTeeth }) => {
  return (
    <div className="container flex flex-col items-center justify-center gap-1">
      <div className="container flex items-center justify-center gap-1">
        {upperTeeth.map((isToothHealthy, index, teeth) => (
          <div key={index} className={`flex h-24 w-8 flex-col items-center`}>
            <div className="h-12 border-b-[2rem] border-l-[1rem] border-r-[1rem] border-b-white border-l-transparent border-r-transparent"></div>
            <div
              className={`h-12 w-8 border border-solid border-black ${
                isToothHealthy ? "bg-white" : "bg-black"
              }`}
            >
              {" "}
            </div>
            {index < teeth.length / 2
              ? Math.abs(teeth.length / 2 - index)
              : Math.abs(teeth.length / 2 - (index + 1))}
          </div>
        ))}
      </div>
      {/* empty div for gap */}
      <div className="h-10"></div>
      <div className="container flex items-center justify-center gap-1">
        {upperTeeth.map((isToothHealthy, index, teeth) => (
          <div key={index} className={`flex h-24 w-8 flex-col items-center`}>
            {index < teeth.length / 2
              ? Math.abs(teeth.length / 2 - index)
              : Math.abs(teeth.length / 2 - (index + 1))}
            <div
              className={`h-12 w-8 border border-solid border-black ${
                isToothHealthy ? "bg-white" : "bg-black"
              }`}
            >
              {" "}
            </div>
            <div className="h-12 border-l-[1rem] border-r-[1rem] border-t-[2rem] border-l-transparent border-r-transparent border-t-white"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teeth;
