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
  return (
    <div className="container flex flex-col">
      {" "}
      <div className="flex h-10 w-full">
        {" "}
        <div className="flex w-1/2 items-center justify-center bg-blue-500">
          {" "}
          Rozpoznania{" "}
        </div>
        <div className="flex w-1/2 items-center justify-center bg-blue-300">
          {" "}
          Operacje{" "}
        </div>
      </div>
      <input
        type="text"
        className="h-10 text-center"
        placeholder="Kiedyś wyszukiwanie będzie działać. Kiedyś..."
      ></input>
      <div className="flex h-96 w-full flex-col overflow-y-scroll">
        {possibleIlnesses.map((illness, index) => (
          <div
            key={index}
            className="flex h-10 w-full flex-shrink-0 flex-grow-0 items-center justify-center border border-solid border-black bg-blue-100"
          >
            {" "}
            {illness}{" "}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Illnesses;
