import GlobalContext from "@/context/GlobalContext";
import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { RxDragHandleDots2 } from "react-icons/rx";
import { AiOutlineClockCircle } from "react-icons/ai";
import { LuRepeat2 } from "react-icons/lu";
import { BsShieldFillCheck } from "react-icons/bs";
import { userClassColors } from "@/context/GlobalContext";
import { SavedEvent } from "@/context/Types";
import { v4 as uuidv4 } from "uuid";

const userClasses = ["Justin", "Karen"]; //change this later for household members in database

const EventModal: React.FC = () => {
  const [payee, setPayee] = useState("");
  const [amount, setAmount] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [isPreAuthorized, setIsPreAuthorized] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const { savedEvents, setShowEventModal, daySelected, dispatchCalEvent } =
    useContext(GlobalContext);

  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const sanitizedValue = value.replace(/[^0-9.]/g, "");
    const [whole, decimal] = sanitizedValue.split(".");

    if (decimal && decimal.length > 2) {
      return;
    }

    setAmount(sanitizedValue);
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const calendarEvent: SavedEvent = {
      payee,
      amount,
      isRecurring,
      isPreAuthorized,
      userClass: selectedClass,
      day: daySelected.valueOf().toString(),
      ...(isRecurring && { startDate, endDate }),
      id: uuidv4(),
    };
    dispatchCalEvent({ type: "push", payload: calendarEvent });
    setShowEventModal(false);
  }

  return (
    <div className="fixed left-0 top-0 flex h-screen w-full items-center justify-center">
      <form
        className="w-1/4 rounded-lg bg-white shadow-2xl"
        onSubmit={handleSubmit}
      >
        <header className="flex items-center justify-between bg-gray-100 px-4 py-2">
          <span className="text-gray-400">
            <RxDragHandleDots2 />
          </span>
          <button
            onClick={() => {
              console.log("Close button clicked");
              setShowEventModal(false);
            }}
          >
            <span className="text-gray-400">
              <AiOutlineCloseCircle />
            </span>
          </button>
        </header>
        <div className="p-3">
          <div className="grid items-end gap-4">
            <div></div>
            <input
              type="text"
              name="payee"
              placeholder="Add payee"
              value={payee}
              required
              className="w-full border-0 border-b-2 border-gray-200 pb-2 pt-3 text-xl font-semibold text-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0"
              onChange={(e) => setPayee(e.target.value)}
            />
            <div></div>
            <div className="flex flex-row items-center">
              <span>$</span>
              <input
                type="text"
                name="amount"
                placeholder="Enter amount"
                value={amount}
                required
                className="w-full border-0 border-b-2 border-gray-200 pb-2 pl-4 pt-3 text-xl font-semibold text-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0"
                onChange={handleAmountChange}
              />
              {amount && (
                <span className="absolute left-0 top-0 pl-1 pt-3 text-xl text-gray-600">
                  $
                </span>
              )}
            </div>
            <div></div>
            <div className="flex flex-row items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isRecurring"
                  checked={isRecurring}
                  className="form-checkbox h-5 w-5 text-blue-500"
                  onChange={(e) => setIsRecurring(e.target.checked)}
                />
                <label className="ml-2 flex items-center text-xl text-gray-600">
                  <LuRepeat2 />
                  <span className="ml-2">set as recurring</span>
                </label>
              </div>
              {isRecurring && (
                <div className="flex flex-col">
                  <label>Start Date:</label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date as Date)}
                  />
                  <label>End Date:</label>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date as Date)}
                  />
                </div>
              )}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isPreAuthorized"
                  checked={isPreAuthorized}
                  className="form-checkbox h-5 w-5 text-blue-500"
                  onChange={(e) => setIsPreAuthorized(e.target.checked)}
                />
                <label className="ml-2 flex items-center text-xl text-gray-600">
                  <BsShieldFillCheck />
                  <span className="ml-2">set as pre-authorized</span>
                </label>
              </div>
            </div>
            <span className="text-gray-400">
              <AiOutlineClockCircle />
            </span>
            <p>{daySelected.format("dddd, MMMM DD")}</p>
            <span className="text-gray-400">
              <div className="flex gap-x-2">
                {userClasses.map((userClass, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`rounded-full px-4 py-2 ${
                      selectedClass === userClass
                        ? `${
                            userClassColors[
                              userClass as keyof typeof userClassColors
                            ]
                          } text-white`
                        : "bg-gray-200 text-black"
                    }`}
                    onClick={() => {
                      console.log("UserClass button clicked");
                      setSelectedClass(userClass);
                    }}
                  >
                    {userClass}
                  </button>
                ))}
              </div>
            </span>
          </div>
        </div>
        <footer className="mt-5 flex w-full justify-end border-t p-3">
          <button
            type="submit"
            className={`mb-1 mr-3 truncate p-1 text-sm text-gray-600 ${
              userClassColors[selectedClass as keyof typeof userClassColors] ||
              "bg-gray-400"
            }`}
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
};

export default EventModal;
