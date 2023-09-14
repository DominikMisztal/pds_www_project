import React, { useState } from 'react';

const DayPicker: React.FC<{
  selectedDate: Date | undefined;
  setDate: (selectedDate: Date) => void;
}> = ({ selectedDate, setDate }) => {
  const [currentMonth, setCurrentMonth] = useState<number>(
    selectedDate ? selectedDate.getMonth() : new Date().getMonth()
  );
  const [currentYear, setCurrentYear] = useState<number>(
    selectedDate ? selectedDate.getFullYear() : new Date().getFullYear()
  );

  const handleDateClick = (date: Date) => {
    setDate(date);
  };

  const handlePrevMonth = () => {
    const newMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const newYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const handleNextMonth = () => {
    const newMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    const newYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const handlePrevYear = () => {
    const newYear = currentYear - 1;
    setCurrentYear(newYear);
  };

  const handleNextYear = () => {
    const newYear = currentYear + 1;
    setCurrentYear(newYear);
  };

  const renderCalendar = () => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="text-center"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isSelected =
        selectedDate && selectedDate.toDateString() === date.toDateString();

      days.push(
        <div
          key={day}
          onClick={() => handleDateClick(date)}
          className={`text-center cursor-pointer p-2 ${
            isSelected ? 'bg-green-500 text-white rounded-full' : ''
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
      <div className="flex justify-between mb-4">
        <button onClick={handlePrevYear} className="text-xl cursor-pointer">
          &#8592; Year
        </button>
        <button onClick={handlePrevMonth} className="text-xl cursor-pointer">
          &#8592; Month
        </button>
        <h2 className="text-2xl font-semibold">
          {new Date(currentYear, currentMonth).toLocaleString('default', {
            month: 'long',
            year: 'numeric',
          })}
        </h2>
        <button onClick={handleNextMonth} className="text-xl cursor-pointer">
          Month &#8594;
        </button>
        <button onClick={handleNextYear} className="text-xl cursor-pointer">
          Year &#8594;
        </button>
      </div>
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