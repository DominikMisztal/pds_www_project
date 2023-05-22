const VisitDetails = () => {
  return (
    <main className="container h-[calc(100vh-6rem)]">
      <div className="flex h-16 w-full items-center gap-10 px-10">
        {" "}
        <div className="flex h-8 w-48 items-center justify-center rounded-full bg-gray-400">
          {" "}
          Karta pacjenta{" "}
        </div>
        {/* empty div for creating gap */}
        <div className="flex w-[48rem]"></div>
        <div className="flex h-8 w-48 items-center justify-center rounded-full bg-gray-400">
          {" "}
          Cena: 600zł{" "}
        </div>
        <button className="flex h-8 w-48 items-center justify-center rounded-full bg-red-400">
          {" "}
          Zakończ wizytę
        </button>
      </div>
      <div className="h-[calc(100vh-10rem)] w-full bg-green-200 text-xs">
        <div className="flex h-4 bg-white">
          <button className="z-20 h-full w-56 rounded-tr-xl bg-green-200">
            Jama ustna
          </button>
          <button className="z-10 h-full w-64 -translate-x-5 rounded-tr-xl bg-green-400">
            {" "}
            Zdjęcia{" "}
          </button>
          <button className="h-full w-64 -translate-x-10 rounded-tr-xl bg-green-500">
            {" "}
            Historia wizyt
          </button>
        </div>
        <div className="container flex h-[calc(100vh-11rem)] items-center justify-center gap-12">
          <div className="h-3/4 w-[36rem] bg-gray-50">
            {" "}
            TU KIEDYŚ BĘDĄ ZĘBY{" "}
          </div>
          <div className="h-3/4 w-96 bg-gray-50">TU KIEDYŚ BĘDZIE TABELA</div>
        </div>
      </div>
    </main>
  );
};

export default VisitDetails;
