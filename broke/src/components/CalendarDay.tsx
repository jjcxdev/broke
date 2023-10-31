import React, { FC, useContext, useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import GlobalContext from "@/context/GlobalContext";
import { SavedEvent } from "@/context/Types";
import { userClassColors } from "@/context/GlobalContext";
import { tempUsers } from "@/database/tempUsers";

interface DayProps {
  day: Dayjs;
  rowIdx: number;
}

const Day: FC<DayProps> = ({ day, rowIdx }) => {
  const [dayEvents, setDayEvents] = useState<SavedEvent[]>([]);
  const { setDaySelected, setShowEventModal, savedEvents } =
    useContext(GlobalContext);

  useEffect(() => {
    // console.log("savedEvents: ", savedEvents); // Debugging line
    // console.log("day: ", day.format("DD-MM-YY")); // Debugging line

    // Log each event day from savedEvents
    savedEvents.forEach((evt) => {
      // console.log(
      //   "Event day from savedEvents: ",
      //   dayjs(evt.day).format("DD-MM-YY"),
      // );
    });

    // Log the day being rendered by this Day component
    // console.log("Day from Day component: ", day.format("DD-MM-YY"));

    const events = savedEvents.filter(
      (evt) => dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY"),
    );

    // Log the filtered events
    // console.log("Filtered events: ", events);

    setDayEvents(events);
  }, [savedEvents, day]);

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
      <div
        className="flex-1 cursor-pointer"
        onClick={() => {
          setDaySelected(day);
          setShowEventModal(true);
        }}
      >
        {dayEvents.map((evt, idx) => {
          const eventColor = tempUsers.find(
            (user) => user.name === evt.userClass,
          )?.color;

          return (
            <div
              key={idx}
              style={{ backgroundColor: eventColor ?? "defaultColor" }}
              className={`rounded-lg px-2 py-1 text-sm text-neutral-100`}
            >
              <span className="font-bold">{`$${evt.amount}`}</span>
              <span className="font-light">{` ${evt.payee}`}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Day;
