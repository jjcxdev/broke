import React from "react";

export interface GlobalContextProps {
  monthIndex: number;
  setMonthIndex: (index: number) => void;
}

const GlobalContext = React.createContext<GlobalContextProps>({
  monthIndex: 0,
  setMonthIndex: (index: number) => {},
});

export default GlobalContext;
