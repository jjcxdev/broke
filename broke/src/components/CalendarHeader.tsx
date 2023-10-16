import GlobalContext from "@/context/GlobalContext";
import dayjs from "dayjs";
import React, { useContext } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

export default function CalendarHeader() {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);
  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
    // console.log("Prev Month Index", monthIndex);
  }
  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
    // console.log("Next Month Index", monthIndex);
  }

  function handleReset() {
    setMonthIndex(dayjs().month());
  }

  // console.log("Current monthIndex:", monthIndex);
  return (
    <header className="flex items-center px-4 py-2">
      <button className="mr-5 rounded border px-4 py-2" onClick={handleReset}>
        Today
      </button>
      <button className="mr-2" onClick={handlePrevMonth}>
        <span className="mx-2 mr-2 cursor-pointer text-gray-600">
          <FaChevronLeft />
        </span>
      </button>
      <button className="ml-2" onClick={handleNextMonth}>
        <span className="mx-2 ml-2 cursor-pointer text-gray-600">
          <FaChevronRight />
        </span>
      </button>
      <h2 className="ml-4 text-xl font-bold text-gray-500">
        {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
      </h2>
    </header>
  );
}
