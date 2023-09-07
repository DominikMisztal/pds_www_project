import { type NextPage } from "next";
import { useState } from "react";
import Illnesses from "~/components/illnesses";
import Teeth from "~/components/teeth";

type ViewState = "TEETH" | "PHOTOS" | "HISTORY";

const VisitDetails: NextPage = () => {
  const [view, setView] = useState<ViewState>("TEETH");

  return (
    <>
      <div className="flex h-16 w-full items-center gap-10 px-10 text-xs lg:text-base">
        <div className="flex h-full w-1/2 items-center justify-start">
          <div className="flex items-center justify-center whitespace-nowrap rounded-full bg-gray-400 p-1.5 px-5">
            Karta pacjenta
          </div>
        </div>

        <div className="flex h-full w-1/2 items-center justify-end gap-5">
          <div className="flex items-center justify-center rounded-full bg-gray-400 p-1.5 px-5 text-center">
            Cena: 600zł
          </div>
          <button className="flex items-center  justify-center rounded-full bg-red-400 p-1.5 px-5 text-center">
            Zakończ wizytę
          </button>
        </div>
      </div>

      <div className="w-full bg-green-200 pb-10 text-xs">
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
          <div className="min-h-[calc(100vg-9rem] flex flex-col items-center justify-center gap-12 px-10 lg:min-h-[calc(100vh-11rem)] lg:flex-row">
            <div className="flex max-h-[75%] w-[36rem] max-w-full items-center">
              <Teeth
                upperTeeth={new Array<boolean>(16).fill(true)}
                bottomTeeth={new Array<boolean>(16).fill(true)}
              ></Teeth>
            </div>
            <div className="flex h-3/4 w-full items-center justify-center lg:w-[36rem]">
              <Illnesses></Illnesses>
            </div>
          </div>
        )}

        {view === "PHOTOS" && (
          <div className=" flex h-[calc(100vh-11rem)] items-center justify-center gap-12">
            <div className="h-3/4 w-3/4 max-w-full bg-gray-50 lg:w-1/2">
              TU KIEDYŚ BĘDĄ ZDJĘCIA
            </div>
          </div>
        )}

        {view === "HISTORY" && (
          <div className=" flex h-[calc(100vh-11rem)] items-center justify-center gap-12">
            <div className="h-3/4 w-3/4 max-w-full  bg-gray-50  lg:w-1/2">
              TU KIEDYŚ BĘDZIE HISTORIA WIZYT
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default VisitDetails;
