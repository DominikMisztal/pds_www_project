import { type NextPage } from "next";

import { useEffect, useState } from "react";
import DayPicker from "~/components/dayPicker";
import { ITEMS_PER_PAGE, Visit } from "~/utils";

import Loading from "~/components/loading";


const CalendarPage: NextPage = () => {
  
  const [isUserAddingVisit, setIsUserAddingVisit] = useState<boolean>(false);

  const [visits, setVisits] = useState<Visit[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isNextPageAvailable, setIsNextPageAvailable] = useState<boolean>(true);
  const [pageNumber, setPageNumber] = useState<number>(1);

  useEffect(() => {
    if (!isLoading || !isNextPageAvailable) {
      return;
    }

    const controller = new AbortController();

    const fetchUsers = async (page: number) => {
      const res = await fetch(
        `http://localhost:3001/database/my_visits?page=${page}`,
        {
          credentials: "include",
          signal: controller.signal,
        }
      );

      if (res.ok) {
        const { data, meta } = (await res.json()) as {
          data: Visit[];
          meta: { page: string };
        };

        setIsLoading(false);
        setPageNumber(+meta.page + 1);
        setIsNextPageAvailable(data.length === ITEMS_PER_PAGE);
        setVisits((old) =>
          old
            ? [...old.slice(0, (+meta.page - 1) * ITEMS_PER_PAGE), ...data]
            : data
        );
      }
    };

    fetchUsers(pageNumber).catch((e) => {
      console.error(e);
    });

    return () => controller.abort();
  }, [isLoading,  pageNumber, isNextPageAvailable]);


  const [selected, setSelected] = useState<Date>( );

  return  <div className="flex h-[calc(100vh-10rem)] w-full items-center justify-center bg-green-500">
    <div className="h-[90%] w-[90%]  flex flex-col sm:flex-col lg:flex-row  sm:w-100%  rounded-xl">
      <div className="flex-1 h-full w-full ">

        <DayPicker selectedDate ={ selected}  setDate ={
          (date: Date) => setSelected( date ) 
        } />



      </div>
      <div className="flex-1 h-full w-full ">
        <div className="w-[90%] h-3/4 mx-auto mt-8 p-4 border rounded-lg shadow-lg bg-green-300 rounded-xl">
            <div className="w-[100%] h-[100%] bg-green-200 rounded-xl">
              <div className="h-[100%] w-[100%] overflow-y-scroll bg-green-200">
                  { visits ? visits.map((visit, index) => {
                  return (
                    <div
                      key={index}
                      className="flex h-20 w-full items-center border border-solid border-black px-10 text-xs lg:text-base"
                    >
                      <div className="w-1/2 p-3 text-center">
                        {visit.date.replace(/[TZ]/g, " ")}
                      </div>
                      <div className="w-1/2 p-3 text-center">
                        {visit.name + " " + visit.surname}
                      </div>
                    
                    </div>
                  );
                }) : <Loading/>
                                
                }
              </div>
            </div>
        </div>
      </div>
    </div>

  </div>

}

export default CalendarPage;

