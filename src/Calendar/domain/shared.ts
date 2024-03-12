import { Retrievable } from '../../shared/Retrievable';

export enum DayOfWeek {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
}

export interface CalendarComponent<T> extends Retrievable<T> {
  year?: number;
  month?: number;
  week?: number;
  number: number;
}
