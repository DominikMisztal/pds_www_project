import Link from "next/link";
import { forwardRef, useEffect, type HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { type Visit, type Patient } from "~/utils";

const VisitsList = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & {
    visits: Visit[] | undefined;
  }
>(function VisitsList({ className, visits }, ref) {
  useEffect(() => {
    console.log(visits);
  }, [visits]);
  return (
    <div
      className={twMerge(
        "h-3/4 w-3/4 overflow-y-scroll bg-gray-200",
        className
      )}
    >
      {visits ? (
        <>
          {visits.map((visit, index) => {
            return (
              <div
                key={index}
                className="flex h-20 w-full items-center border border-solid border-black px-10 text-xs lg:text-base"
              >
                <div className="w-1/3 p-3 text-center">{visit.date}</div>
                <div className="w-1/3 p-3 text-center">
                  {visit.name + " " + visit.surname}
                </div>
                <div className="flex w-1/3 justify-end">
                  <Link href="/visit_details">
                    <button className="h-8 w-16 rounded-full bg-blue-400 lg:h-10 lg:w-28">
                      Szczegóły
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
          <div className="h-0 w-0" ref={ref}></div>
        </>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          Nie znaleziono przypisanych ci wizyt
        </div>
      )}
    </div>
  );
});

export default VisitsList;
