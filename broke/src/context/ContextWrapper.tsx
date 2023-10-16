import React, { ReactNode, useState, FC } from "react";
import GlobalContext from "./GlobalContext";
import { GlobalContextProps } from "./GlobalContext";
import dayjs from "dayjs";

interface ContextWrapperProps {
  children: ReactNode;
}

const ContextWrapper: FC<ContextWrapperProps> = ({ children }) => {
  const [monthIndex, setMonthIndex] = useState<number>(dayjs().month());

  const contextValue: GlobalContextProps = {
    monthIndex,
    setMonthIndex,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default ContextWrapper;
