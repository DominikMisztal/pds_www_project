import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Treatments from "~/components/treatments";
import Loading from "~/components/loading";
import Photos from "~/components/photos";
import Teeth from "~/components/teeth";
import { Operation, type TeethData } from "~/utils";

type ViewState = "TEETH" | "PHOTOS" | "HISTORY";

const VisitDetails: NextPage = () => {
  const router = useRouter();
  const { id, teeth: teethId, patient } = router.query;
  const [view, setView] = useState<ViewState>("TEETH");

  const [operations, setOperations] = useState<Operation[]>();
  const [teeth, setTeeth] = useState<TeethData>();
  const [selected, setSelected] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>();

  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    if (teethId === undefined) {
      return;
    }

    const controller = new AbortController();
    const fetchOperations = async () => {
      const res = await fetch("http://localhost:3001/database/operations", {
        credentials: "include",
        signal: controller.signal,
      });

      if (res.ok) {
        const data = (await res.json()) as Operation[];

        setOperations(data);
        setIsLoading(false);
      }
    };
    const fetchUsers = async () => {
      const res = await fetch(
        `http://localhost:3001/database/teeth${teethId as string}`,
        {
          credentials: "include",
          signal: controller.signal,
        }
      );

      if (res.ok) {
        const data = (await res.json()) as TeethData;
        const tranformedData = {
          ...data,
          teeth: data.teeth.map((item) => ({ ...item, index: +item.index })),
        };
        setIsLoading(false);
        setTeeth(tranformedData);
      }
    };

    Promise.all([fetchUsers(), fetchOperations()]).catch((e) =>
      console.error(e)
    );

    return () => controller.abort();
  }, [teethId]);

  useEffect(() => {
    if (!teeth || !operations) {
      return;
    }

    const selectedOperations = teeth?.teeth
      .map((item) => item.operations)
      .reduce((prev, next) => [...prev, ...next]);

    let price = 0;
    for (const operation of selectedOperations) {
      const found = operations.find((op) => op.id === operation);
      price += found!.cost;
    }

    setPrice(price);
  }, [teeth, operations]);

  if (!router.isReady || !teeth || !operations || isLoading) {
    return <Loading></Loading>;
  }

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
            {`Cena: ${price}zł`}
          </div>
          <button
            className="flex items-center  justify-center rounded-full bg-red-400 p-1.5 px-5 text-center"
            onClick={() => {
              const postTeeth = async () => {
                const res = await fetch(
                  `http://localhost:3001/database/teeth${patient as string}`,
                  {
                    method: "post",
                    credentials: "include",
                    body: JSON.stringify(teeth),
                    headers: { "Content-Type": "application/json" },
                  }
                );

                if (res.ok) {
                  await router.push("/visits");
                }
              };

              postTeeth().catch((e) => console.error(e));
            }}
          >
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
            Zdjęcia
          </button>
        </div>
        {view === "TEETH" && (
          <div className="min-h-[calc(100vg-9rem] flex flex-col items-center justify-center gap-12 px-10 lg:min-h-[calc(100vh-11rem)] lg:flex-row">
            <div className="flex max-h-[75%] w-[36rem] max-w-full items-center">
              <Teeth
                operationsData={operations}
                teeth={teeth}
                selectedTooth={selected}
                setSelected={(index: number) => setSelected(index)}
              ></Teeth>
            </div>
            <div className="flex h-3/4 w-full items-center justify-center lg:w-[36rem]">
              <Treatments
                operations={operations}
                updateTeeth={(
                  index: number,
                  teeth: { index: number; operations: number[] }[]
                ) => {
                  setTeeth((old) =>
                    old ? { ...old, teeth: [...teeth] } : undefined
                  );
                }}
                teethOperations={teeth.teeth}
                selectedTooth={selected}
              ></Treatments>
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
