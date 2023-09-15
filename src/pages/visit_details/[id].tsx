import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import Illnesses from "~/components/illnesses";
import Loading from "~/components/loading";
import Photos from "~/components/photos";
import Teeth from "~/components/teeth";

type ViewState = "TEETH" | "PHOTOS" | "HISTORY";

const VisitDetails: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [view, setView] = useState<ViewState>("TEETH");

  if (!router.isReady) {
    return <Loading></Loading>;
  }
  return (
    <>
      <div className="flex h-16 w-full items-center gap-10 px-10 text-xs lg:text-base">
        <div className="flex h-full w-1/2 items-center justify-start">
       
        </div>

        <div className="flex h-full w-1/2 items-center justify-end gap-5">    
          <button className="flex items-center  justify-center rounded-full bg-red-400 p-1.5 px-5 text-center">
            Zakończ wizytę
          </button>
        </div>
      </div>

      <div className="w-full bg-green-200 text-xs">
        <div className="flex h-4 bg-white">
          <button
            className="z-20 h-full w-56 rounded-tr-xl bg-green-200"
            onClick={() => setView("TEETH")}
          >
            Jama ustna
          </button>
          <button
            className="z-10 h-full w-64 -translate-x-5 rounded-tr-xl bg-green-300"
            onClick={() => setView("PHOTOS")}
          >
            {" "}
            Zdjęcia{" "}
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
          <div className=" flex h-[calc(100vh-11rem)] items-center justify-center gap-12 bg-green-300">
            <div className="h-3/4 w-3/4 max-w-full bg-gray-50 lg:w-1/2">
              <Photos visitId={+(id as string)}></Photos>
            </div>
          </div>
        )}

      
      </div>
    </>
  );
};

export default VisitDetails;
