import React, { useState } from 'react';


 const DayPicker = () => {
    const [selectedDate, setSelectedDate] = useState(new Date()); 

    const handleDateClick = (date :Date) => {
        setSelectedDate(date);
    };

    const renderCalendar = () => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
      
        const days = [];
      
        for (let i = 0; i < firstDayOfMonth; i++) {
          days.push(<div key={`empty-${i}`} className="text-center"></div>);
        }
      
    
        for (let day = 1; day <= daysInMonth; day++) {
          const date = new Date(currentYear, currentMonth, day);
            const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
      
          days.push(
            <div
              key={day}
              onClick={() => handleDateClick(date)}
              className={`text-center cursor-pointer p-2 ${
                isSelected ? 'bg-blue-500 text-white rounded-full' : ''
              }`}
            >
              {day}
            </div>
          );
        }
      
        return days;
      };


  return (
    <div className="w-[90%] mx-auto mt-8 p-4 border rounded-lg shadow-lg bg-green-300 rounded-xl">
      <h2 className="text-2xl font-semibold   ">Select a Date</h2>
            <div className="grid grid-cols-7 gap-2 gap-y-11  bg-green-200 rounded-xl">
                <div className="text-center">Sun</div>
                <div className="text-center">Mon</div>
                <div className="text-center">Tue</div>
                <div className="text-center">Wed</div>
                <div className="text-center">Thu</div>
                <div className="text-center">Fri</div>
                <div className="text-center">Sat</div>

                {renderCalendar()}


            </div>
    </div>
  );
};


export default DayPicker;