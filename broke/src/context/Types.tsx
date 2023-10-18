import dayjs from "dayjs";

export interface SavedEvent {
  id: string;
  day: dayjs.Dayjs; // or Date or dayjs.Dayjs, depending on what you're using
  payee: string;
  amount: string;
  isRecurring: boolean;
  isPreAuthorized: boolean;
  userClass: string | null;
  startDate?: Date; // optional because it depends on 'isRecurring'
  endDate?: Date; // optional because it depends on 'isRecurring'
}

export type SavedEventAction =
  | { type: "push"; payload: SavedEvent }
  | { type: "update"; payload: SavedEvent }
  | { type: "delete"; payload: { id: string } };
