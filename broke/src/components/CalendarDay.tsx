import React, { FC } from "react";
import dayjs, { Dayjs } from "dayjs";

interface DayProps {
  day: Dayjs;
  rowIdx: number;
}

const Day: FC<DayProps> = ({ day, rowIdx }) => {
  // console.log("Rendering Day with:", day.format("DD-MM-YY"), "Row:", rowIdx);
  // console.log("Component day:", day.format("DD-MM-YY"));
  // console.log("Current day:", dayjs().format("DD-MM-YY"));

  function getCurrentDayClass() {
    const isCurrentDay =
      day.format("YYYY-MM-DD") === dayjs().format("YYYY-MM-DD");
    // console.log("Is current day:", isCurrentDay); // Debugging Line
    return isCurrentDay ? "bg-pink-600 text-white rounded-full w-7" : "";
  }

  return (
    <div className="flex h-full flex-col border border-neutral-300">
      <header className="flex flex-col items-center">
        {rowIdx === 0 && (
          <p className="mt-1 text-sm uppercase">{day.format("ddd")}</p>
        )}
        <p className={`my-1 p-1 text-center text-sm ${getCurrentDayClass()}`}>
          {day.format("DD")}
        </p>
      </header>
    </div>
  );
};

export default Day;
