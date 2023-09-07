import { type NextPage } from "next";
import { useState } from "react";
import Illnesses from "~/components/illnesses";
import Teeth from "~/components/teeth";

type ViewState = "TEETH" | "PHOTOS" | "HISTORY";

const VisitDetails: NextPage = () => {
  const [view, setView] = useState<ViewState>("TEETH");

  return (
    <>
      <div className="flex h-16 w-full items-center gap-10 px-10">
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
          <button
            className="z-20 h-full w-56 rounded-tr-xl bg-green-200"
            onClick={() => setView("TEETH")}
          >
            Jama ustna
          </button>
          <button
            className="z-10 h-full w-64 -translate-x-5 rounded-tr-xl bg-green-400"
            onClick={() => setView("PHOTOS")}
          >
            {" "}
            Zdjęcia{" "}
          </button>
          <button
            className="h-full w-64 -translate-x-10 rounded-tr-xl bg-green-500"
            onClick={() => setView("HISTORY")}
          >
            {" "}
            Historia wizyt
          </button>
        </div>
        {view === "TEETH" && (
          <div className="flex h-[calc(100vh-11rem)] items-center justify-center gap-12">
            <div className="flex max-h-[75%] w-[36rem] items-center">
              <Teeth
                upperTeeth={new Array<boolean>(16).fill(true)}
                bottomTeeth={new Array<boolean>(16).fill(true)}
              ></Teeth>
            </div>
            <div className="h-3/4 w-[36rem] bg-gray-50">
              <Illnesses></Illnesses>
            </div>
          </div>
        )}

        {view === "PHOTOS" && (
          <div className=" flex h-[calc(100vh-11rem)] items-center justify-center gap-12">
            <div className="h-3/4 w-[36rem] bg-gray-50">
              {" "}
              TU KIEDYŚ BĘDĄ ZDJĘCIA{" "}
            </div>
          </div>
        )}

        {view === "HISTORY" && (
          <div className=" flex h-[calc(100vh-11rem)] items-center justify-center gap-12">
            <div className="h-3/4 w-[36rem] bg-gray-50">
              {" "}
              TU KIEDYŚ BĘDZIE HISTORIA WIZYT{" "}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default VisitDetails;
