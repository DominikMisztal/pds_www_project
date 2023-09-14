import { type NextPage } from "next";

import { format } from 'date-fns';
import { useState } from "react";
import DayPicker from "~/components/dayPicker";
import { randomVisits } from "~/utils";

const CalendarPage: NextPage = () => {
  
  const [selected, setSelected] = useState<Date>();
  let footer = <p>Please pick a day.</p>;
  return  <div className="flex h-[calc(100vh-10rem)] w-full items-center justify-center bg-green-500">
    <div className="h-[90%] w-[90%]  flex flex-col sm:flex-col lg:flex-row  sm:w-100%  rounded-xl">
      <div className="flex-1 h-full w-full ">

        <DayPicker/>



      </div>
      <div className="flex-1 h-full w-full ">
        <div className="w-[90%] mx-auto mt-8 p-4 border rounded-lg shadow-lg bg-green-300 rounded-xl">
            <div className="w-[100%] h-[100%] bg-green-200 rounded-xl">
              <div className="h-[100%] w-[100%] overflow-y-scroll bg-green-200">
                  {randomVisits.map((visit) => {
                    return (
                      <div
                        key={visit.index}
                        className="flex h-20 w-full items-center border border-solid border-green-300 px-10 text-xs lg:text-base"
                      >
                        <div className="w-1/3 p-3 text-center">
                          {visit.date.toUTCString()}
                        </div>
                        <div className="w-1/3 p-3 text-center">
                          {visit.patient.name + " " + visit.patient.surname}
                        </div>
                      
                      </div>
                    );
                  })}
              </div>
            </div>
        </div>
      </div>
    </div>

  </div>

}

export default CalendarPage;

