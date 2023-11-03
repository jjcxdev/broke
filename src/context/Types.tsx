import dayjs from "dayjs";

export enum RecurrenceFrequency {
  DAILY = "daily",
  WEEKLY = "weekly",
  MONTHLY = "monthly",
  YEARLY = "yearly",
}

export interface SavedEvent {
  id: string;
  day: dayjs.Dayjs; // or Date or dayjs.Dayjs, depending on what you're using
  payee: string;
  amount: string;
  isRecurring: boolean;
  isPreAuthorized: boolean;
  userClass: string | null;
  startDate?: Date | null; // optional because it depends on 'isRecurring'
  endDate?: Date | null; // optional because it depends on 'isRecurring'
  recurrenceFrequency?: RecurrenceFrequency;
}

export type SavedEventAction =
  | { type: "push"; payload: SavedEvent }
  | { type: "update"; payload: SavedEvent }
  | { type: "delete"; payload: { id: string } };
