import React, { useContext } from "react";
import GlobalContext from "@/context/GlobalContext";

const CreateBillButton: React.FC = () => {
  const { setShowEventModal } = useContext(GlobalContext);
  return (
    <button
      onClick={() => setShowEventModal(true)}
      className="flex items-center justify-center rounded-full bg-pink-400 p-2 hover:bg-neutral-500"
    >
      Create New Bill
    </button>
  );
};

export default CreateBillButton;
