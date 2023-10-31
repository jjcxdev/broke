import React, { Dispatch, SetStateAction } from "react";
import dayjs from "dayjs";
import { SavedEvent, SavedEventAction } from "@/context/Types";

export type UserClassColors = {
  [key: string]: string;
};

export const userClassColors: UserClassColors = {};

export interface GlobalContextProps {
  monthIndex: number;
  setMonthIndex: (index: number) => void;
  showEventModal: boolean;
  setShowEventModal: Dispatch<SetStateAction<boolean>>;
  daySelected: dayjs.Dayjs;
  setDaySelected: Dispatch<SetStateAction<dayjs.Dayjs>>;
  savedEvents: SavedEvent[];
  dispatchCalEvent: React.Dispatch<SavedEventAction>;
  selectedEvent: SavedEvent | null;
  setSelectedEvent: React.Dispatch<React.SetStateAction<SavedEvent | null>>;
  userClassColors: UserClassColors;
  updateUserClassColors: (newMapping: UserClassColors) => void;
}

const GlobalContext = React.createContext<GlobalContextProps>({
  monthIndex: 0,
  setMonthIndex: (index: number) => {},
  showEventModal: false,
  setShowEventModal: () => {},
  daySelected: dayjs(),
  setDaySelected: () => {},
  savedEvents: [],
  dispatchCalEvent: ({ type, payload }) => {},
  selectedEvent: null,
  setSelectedEvent: () => {},
  userClassColors: {},
  updateUserClassColors: (newMapping: UserClassColors) => {},
});

export default GlobalContext;
