import dayjs, { Dayjs } from "dayjs";

export function getMonth(month: number = dayjs().month()): Dayjs[][] {
  // Get the current year
  const year: number = dayjs().year();

  // Get the first day of the month (0 = Sunday, 1 = Monday, ...)
  const firstDayOfTheMonth: number = dayjs(new Date(year, month, 1)).day();

  //Manually adjust first day of the week to Monday
  const adjustedFirstDay =
    firstDayOfTheMonth === 0 ? 6 : firstDayOfTheMonth - 1;

  // Initialize the day count
  // Start with a negative number to fill the first row with days from the previous month
  let currentMonthCount: number = 1 - adjustedFirstDay;

  // Initialize the 2D array (matrix) to store the days
  const daysMatrix: Dayjs[][] = [];

  // Populate the matrix (5 weeks x 7 days)
  for (let week = 0; week < 5; week++) {
    const weekArray: Dayjs[] = [];
    for (let day = 0; day < 7; day++) {
      const newDay = dayjs(new Date(year, month, currentMonthCount));
      weekArray.push(newDay);
      currentMonthCount++;
    }
    daysMatrix.push(weekArray);
  }

  return daysMatrix;
}
