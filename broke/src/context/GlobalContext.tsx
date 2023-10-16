import React, { Dispatch, SetStateAction } from "react";

export interface GlobalContextProps {
  monthIndex: number;
  setMonthIndex: (index: number) => void;
  showEventModal: boolean;
  setShowEventModal: Dispatch<SetStateAction<boolean>>;
}

const GlobalContext = React.createContext<GlobalContextProps>({
  monthIndex: 0,
  setMonthIndex: (index: number) => {},
  showEventModal: false,
  setShowEventModal: () => {},
});

export default GlobalContext;
