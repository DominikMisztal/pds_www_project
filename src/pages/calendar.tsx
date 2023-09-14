import { type NextPage } from "next";

import { format } from 'date-fns';
import { useState } from "react";
import DayPicker from "~/components/dayPicker";


const CalendarPage: NextPage = () => {
  
  const [selected, setSelected] = useState<Date>();
  let footer = <p>Please pick a day.</p>;
  return  <div className="flex h-[calc(100vh-10rem)] w-full items-center justify-center bg-green-500">
    <div className="h-3/4 w-3/4 bg-gray-200 flex flex-row">
      <div className="flex-1 h-full w-full bg-blue-200">

        <DayPicker/>

      </div>
      <div className="flex-1 h-full w-full bg-green-200">

          {/*  */}

      </div>
    </div>

  </div>

}

export default CalendarPage;

/*

const [selected, setSelected] = useState<Date>();

  let footer = <p>Please pick a day.</p>;
  if (selected) {



    footer = <p>You picked {format(selected, 'PP')}.</p>;
  }
  return (
    <DayPicker
      mode="single"
      selected={selected}
      onSelect={setSelected}
      footer={footer}
      styles={{
        cell : { color : 'blue '},
        caption : {color: 'red'}
      }}
    />
  )

 */
