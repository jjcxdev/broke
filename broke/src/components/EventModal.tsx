import GlobalContext from "@/context/GlobalContext";
import React, { useContext } from "react";

const EventModal: React.FC = () => {
  const { setShowEventModal } = useContext(GlobalContext);

  return (
    <div className="fixed left-0 top-0 flex h-screen w-full items-center justify-center">
      <form className="w-1/4 rounded-lg bg-white shadow-2xl">
        <header className="flex items-center justify-between bg-gray-100 px-4 py-2">
          <span className="text-gray-400">drag_handle</span>
          <button onClick={() => setShowEventModal(false)}>
            <span className="text-gray-400">close</span>
          </button>
        </header>
      </form>
    </div>
  );
};

export default EventModal;
