import React, { FC, useContext, useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import GlobalContext from "@/context/GlobalContext";
import { SavedEvent } from "@/context/Types";
import { UserClassColors } from "@/context/GlobalContext";
import { LuRepeat2 } from "react-icons/lu";
import { BsShieldFillCheck } from "react-icons/bs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

interface ItineraryProps {
  day: Dayjs;
}

// This would come from your context or API call
const userClassColors: UserClassColors = {
  // Dynamic user colors here
};

const Itinerary: FC<ItineraryProps> = ({ day }) => {
  const [dayEvents, setDayEvents] = useState<SavedEvent[]>([]);
  const { setDaySelected, setShowEventModal, savedEvents } =
    useContext(GlobalContext);

  useEffect(() => {
    const startOfWeek = day.startOf("week");
    const endOfWeek = day.endOf("week");

    const events = savedEvents.filter((evt) => {
      const eventDay: Dayjs = dayjs(evt.day);
      return (
        eventDay.isSameOrAfter(startOfWeek) &&
        eventDay.isSameOrBefore(endOfWeek)
      );
    });
    setDayEvents(events);
  }, [savedEvents, day]);

  return (
    <div className="flex flex-col">
      <header className="my-2 flex justify-center">
        <p className="text-lg font-bold">{day.format("dddd, MMMM DD")}</p>
      </header>
      <ul className="list-inside list-decimal">
        {dayEvents.map((evt, idx) => {
          const bgColor = evt.userClass
            ? userClassColors[evt.userClass]
            : "defaultColor";
          return (
            <li key={idx} style={{ backgroundColor: bgColor }}>
              <div className="flex justify-between">
                <span className="font-bold">{`$${evt.amount}`}</span>
                <span className="font-bold">{`${evt.payee}`}</span>
                {/*If recurring is true, display icon*/}
                {evt.isRecurring && (
                  <span className="">
                    <LuRepeat2 />
                  </span>
                )}
                {/*If preauthorized is true, display icon*/}
                {evt.isPreAuthorized && (
                  <span className="">
                    <BsShieldFillCheck />
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Itinerary;
