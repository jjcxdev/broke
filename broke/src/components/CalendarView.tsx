import React, { useEffect } from "react"; // <- Import useEffect here if not already imported
import dayjs, { Dayjs } from "dayjs";
import CalendarDay from "./CalendarDay";

interface CalendarViewProps {
  month: Dayjs[][];
}

const CalendarView: React.FC<CalendarViewProps> = ({ month }) => {
  // console.log("Rendering CalendarView with month:", month); // Add this line

  return (
    <div className="grid h-full flex-1 grid-cols-7 grid-rows-5">
      {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => (
            <CalendarDay day={day} key={day.format("DD-MM-YY")} rowIdx={i} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default CalendarView;
