import React, { Dispatch, SetStateAction } from "react";
import dayjs from "dayjs";

// ColorMapping.ts (or within GlobalContext)
export const userClassColors = {
  Justin: "bg-blue-500",
  Karen: "bg-red-500",
};

export interface SavedEvent {
  id: string;
  day: string; // or Date or dayjs.Dayjs, depending on what you're using
  payee: string;
  amount: string;
  isRecurring: boolean;
  isPreAuthorized: boolean;
  userClass: string | null;
  startDate?: Date; // optional because it depends on 'isRecurring'
  endDate?: Date; // optional because it depends on 'isRecurring'
}

type SavedEventAction =
  | { type: "push"; payload: SavedEvent }
  | { type: "update"; payload: SavedEvent }
  | { type: "delete"; payload: { id: string } };

export interface GlobalContextProps {
  monthIndex: number;
  setMonthIndex: (index: number) => void;
  showEventModal: boolean;
  setShowEventModal: Dispatch<SetStateAction<boolean>>;
  daySelected: dayjs.Dayjs;
  setDaySelected: Dispatch<SetStateAction<dayjs.Dayjs>>;
  savedEvents: SavedEvent[];
  dispatchCalEvent: React.Dispatch<SavedEventAction>;
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
});

export default GlobalContext;
