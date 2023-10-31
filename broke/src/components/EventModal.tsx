import React, { useContext, useState } from "react";
import GlobalContext from "@/context/GlobalContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { RxDragHandleDots2 } from "react-icons/rx";
import { AiOutlineClockCircle } from "react-icons/ai";
import { LuRepeat2 } from "react-icons/lu";
import { BsShieldFillCheck } from "react-icons/bs";
import { RecurrenceFrequency, SavedEvent } from "@/context/Types";
import { v4 as uuidv4 } from "uuid";
import { tempUsers } from "@/database/tempUsers";

const EventModal: React.FC = () => {
  const [payee, setPayee] = useState("");
  const [amount, setAmount] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [isPreAuthorized, setIsPreAuthorized] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [recurrenceFrequency, setRecurrenceFrequency] =
    useState<RecurrenceFrequency | null>(null);

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

    // Check if isRecurring is true but startDate or endDate is missing
    if (isRecurring && (!startDate || !endDate)) {
      alert("Start and end dates are required for recurring events");
      return;
    }

    const calendarEvent: SavedEvent = {
      payee,
      amount,
      isRecurring,
      isPreAuthorized,
      userClass: selectedClass,
      day: daySelected,
      startDate: startDate ? new Date(startDate.toISOString()) : null,
      endDate: endDate ? new Date(endDate.toISOString()) : null,
      id: uuidv4(),
    };

    console.log("Sending this data to server:", calendarEvent);

    fetch("/api/createEvent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(calendarEvent),
    }).then(async (response) => {
      if (!response.ok) {
        const data = await response.json();
        console.log("Error Data:", data);
        throw new Error("Something went wrong");
      }
      return response.json();
    });
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
              // console.log("Close button clicked");
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
                <>
                  <div className="flex flex-col">
                    <label>Start Date:</label>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date as Date)}
                    />
                    <label>Frequency:</label>
                    <select
                      onChange={(e) =>
                        setRecurrenceFrequency(
                          e.target.value as RecurrenceFrequency,
                        )
                      }
                      required
                    >
                      <option value="" disabled selected>
                        Select Frequency
                      </option>
                      <option value={RecurrenceFrequency.DAILY}>Daily</option>
                      <option value={RecurrenceFrequency.WEEKLY}>Weekly</option>
                      <option value={RecurrenceFrequency.MONTHLY}>
                        Monthly
                      </option>
                      <option value={RecurrenceFrequency.YEARLY}>Yearly</option>
                    </select>
                    <label>End Date:</label>
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date as Date)}
                    />
                  </div>
                </>
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
                {tempUsers.map((tempUser, i) => {
                  console.log(tempUser.color);
                  return (
                    <button
                      key={i}
                      type="button"
                      style={{ backgroundColor: tempUser.color }}
                      className={`rounded-full px-4 py-2 ${
                        selectedClass === tempUser.name
                          ? "text-white"
                          : "text-black"
                      }`}
                      onClick={() => {
                        // console.log("UserClass button clicked");
                        setSelectedClass(tempUser.name);
                      }}
                    >
                      {tempUser.name}
                    </button>
                  );
                })}
              </div>
            </span>
          </div>
        </div>
        <footer className="mt-5 flex w-full justify-end border-t p-3">
          <button
            type="submit"
            className="mb-1 mr-3 truncate bg-gray-400 p-1 text-sm text-gray-600"
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
};

export default EventModal;
