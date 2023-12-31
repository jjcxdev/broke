import React, { FC, useContext, useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import GlobalContext from "@/context/GlobalContext";
import { SavedEvent } from "@/context/Types";
import { UserClassColors } from "@/context/GlobalContext";
import { LuRepeat2 } from "react-icons/lu";
import { BsShieldFillCheck } from "react-icons/bs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { tempUsers } from "@/database/tempUsers";

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
  const { savedEvents } = useContext(GlobalContext);

  // Directly get the current date to determine the current week
  useEffect(() => {
    const currentDate = dayjs();
    const startOfCurrentWeek = currentDate.startOf("week");
    const endOfCurrentWeek = currentDate.endOf("week");

    const events = savedEvents
      .filter((evt) => {
        const eventDay: Dayjs = dayjs(evt.day);
        return (
          eventDay.isSameOrAfter(startOfCurrentWeek) &&
          eventDay.isSameOrBefore(endOfCurrentWeek)
        );
      })
      .sort((a, b) => {
        const dateA = dayjs(a.day);
        const dateB = dayjs(b.day);
        return dateA.isAfter(dateB) ? 1 : -1;
      });
    setDayEvents(events);
  }, [savedEvents]);

  return (
    <div className="h-fit w-full">
      <div className="">
        {dayEvents.map((evt, idx) => {
          const eventColor = tempUsers.find(
            (user) => user.name === evt.userClass,
          )?.color;

          return (
            <div
              key={idx}
              style={{ backgroundColor: eventColor ?? "defaulColor" }}
              className="mb-1 rounded-lg px-4 py-2"
            >
              <div className="flex flex-row items-center justify-between gap-8">
                <h2 className="text-3xl font-light text-neutral-100">
                  {`$${evt.amount}`}
                </h2>
                <div className="flex flex-row items-center justify-between gap-1">
                  <div className="h-fit w-fit rounded-md bg-white px-1 py-[2px] text-xs text-black">
                    30/36
                  </div>
                  <div>
                    {/*If recurring is true, display icon*/}
                    {evt.isRecurring && (
                      <span className="text-neutral-100">
                        <LuRepeat2 />
                      </span>
                    )}
                  </div>
                  <div>
                    {/*If preauthorized is true, display icon*/}
                    {evt.isPreAuthorized && (
                      <span className="text-neutral-100">
                        <BsShieldFillCheck />
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-row gap-2">
                <div className="w-fit text-xs font-thin text-neutral-100">
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
