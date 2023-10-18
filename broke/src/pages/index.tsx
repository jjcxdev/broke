import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

import { api } from "@/utils/api";
import BillCard from "@/components/BillCard";
import WeekCard from "@/components/WeekCard";
import Menu from "@/components/Menu";
import CalendarView from "@/components/CalendarView";
import CalendarHeader from "@/components/CalendarHeader";
import { getMonth } from "../utils";
import GlobalContext from "@/context/GlobalContext";
import EventModal from "@/components/EventModal";
import Itinerary from "@/components/Itinerary";
import "dayjs/locale/en-gb";
import dayjs from "dayjs";

dayjs.locale("en-gb");

export default function Home() {
  const { daySelected, monthIndex, showEventModal } = useContext(GlobalContext);
  const [currentMonth, setCurrentMonth] = useState(getMonth());

  // Set the locale for Day.js
  useEffect(() => {
    dayjs.locale("en-gb");
  }, []);

  // Observe changes in monthIndex
  useEffect(() => {
    // console.log("Month index changed in Home:", monthIndex);
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  // Observe changes in currentMonth
  useEffect(() => {
    // console.log("Main calendar should re-render with new month:", currentMonth);
  }, [currentMonth]);

  return (
    <>
      <Head>
        <title>broke</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen w-full flex-row justify-between bg-gradient-to-b from-[#ffffff] to-[#c4c4c4]">
        {showEventModal && <EventModal />}
        <div
          id="menu"
          className="flex w-2/12 flex-col gap-4 bg-black p-4 text-white"
        >
          <Menu />
        </div>

        <div id="calendar" className="h-screen w-8/12 p-4">
          <div className="flex h-full flex-col">
            <div className="flex flex-row justify-between">
              <div>
                <CalendarHeader />
              </div>
              <div>usercards</div>
            </div>
            <div className="h-full">
              <CalendarView month={currentMonth} />
            </div>
          </div>
        </div>

        <div id="itinerary" className="flex w-3/12 flex-col gap-1 p-4">
          <WeekCard />
          <Itinerary day={daySelected} />
        </div>
      </main>
    </>
  );
}
