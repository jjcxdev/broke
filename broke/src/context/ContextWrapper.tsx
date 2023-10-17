import React, { ReactNode, useState, FC, useReducer, useEffect } from "react";
import GlobalContext from "./GlobalContext";
import { GlobalContextProps } from "./GlobalContext";
import dayjs from "dayjs";

// In-memory store
let inMemoryStore: SavedEvent[] = [];

interface ContextWrapperProps {
  children: ReactNode;
}

interface SavedEvent {
  id: string;
}

// Define action types
type SavedEventAction =
  | { type: "push"; payload: SavedEvent }
  | { type: "update"; payload: SavedEvent }
  | { type: "delete"; payload: { id: string } };

// Reducer function
function savedEventsReducer(
  state: SavedEvent[],
  action: SavedEventAction,
): SavedEvent[] {
  switch (action.type) {
    case "push":
      return [...state, action.payload];
    case "update":
      return state.map((evt) =>
        evt.id === action.payload.id ? action.payload : evt,
      );
    case "delete":
      return state.filter((evt) => evt.id !== action.payload.id);
    default:
      throw new Error();
  }
}

function initEvents(): SavedEvent[] {
  if (typeof window !== "undefined") {
    const savedEventsFromStorage = localStorage.getItem("savedEvents");
    return savedEventsFromStorage
      ? JSON.parse(savedEventsFromStorage)
      : [...inMemoryStore];
  }
  return [...inMemoryStore]; // Fallback to inMemoryStore when on the server
}

const ContextWrapper: FC<ContextWrapperProps> = ({ children }) => {
  const [monthIndex, setMonthIndex] = useState<number>(dayjs().month());
  const [showEventModal, setShowEventModal] = useState<boolean>(false);
  const [daySelected, setDaySelected] = useState(dayjs());

  // Initialize useReducer
  const [savedEvents, dispatchCalEvent] = useReducer(
    savedEventsReducer,
    [],
    initEvents,
  );

  // Use useEffect to save to localStorage
  useEffect(() => {
    inMemoryStore = [...savedEvents];
    localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
  }, [savedEvents]);

  const contextValue: GlobalContextProps = {
    monthIndex,
    setMonthIndex,
    showEventModal,
    setShowEventModal,
    daySelected,
    setDaySelected,
    savedEvents,
    dispatchCalEvent,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default ContextWrapper;
