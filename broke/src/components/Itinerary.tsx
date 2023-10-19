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

  // Directly get the current date to determine the current week
  useEffect(() => {
    const currentDate = dayjs();
    const startOfCurrentWeek = currentDate.startOf("week");
    const endOfCurrentWeek = currentDate.endOf("week");

    const events = savedEvents.filter((evt) => {
      const eventDay: Dayjs = dayjs(evt.day);
      return (
        eventDay.isSameOrAfter(startOfCurrentWeek) &&
        eventDay.isSameOrBefore(endOfCurrentWeek)
      );
    });
    setDayEvents(events);
  }, [savedEvents]);

  return (
    <div className="h-fit w-full rounded-lg bg-neutral-500">
      <div className="px-4 py-2">
        {dayEvents.map((evt, idx) => {
          // Start of map function
          const bgColor = evt.userClass
            ? userClassColors[evt.userClass]
            : "defaultColor";
          return (
            <div key={idx} style={{ backgroundColor: bgColor }}>
              <div className="flex flex-row items-center justify-between gap-8">
                <h2 className="text-3xl font-light text-white">
                  {`$${evt.amount}`}
                </h2>
                <div className="flex flex-row items-center justify-between gap-1">
                  <div className="h-fit w-fit rounded-md bg-white px-1 py-[2px] text-xs text-black">
                    30/36
                  </div>
                  <div>
                    {/*If recurring is true, display icon*/}
                    {evt.isRecurring && (
                      <span className="">
                        <LuRepeat2 />
                      </span>
                    )}
                  </div>
                  <div>
                    {/*If preauthorized is true, display icon*/}
                    {evt.isPreAuthorized && (
                      <span className="">
                        <BsShieldFillCheck />
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-row gap-2">
                <div className="w-fit text-xs font-thin text-white">
                  <span className="font-bold">{`${evt.payee}`}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Itinerary;
