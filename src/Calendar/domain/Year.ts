import { CalendarComponent } from './shared';
import { MonthData } from './Month';

export type YearData<T> = { month: number } & MonthData<T>;

export class Year<T> implements CalendarComponent<YearData<T>[]> {
  public months: CalendarComponent<MonthData<T>[]>[] = [];

  constructor(public readonly number: number) {}

  public retrieve(): YearData<T>[] {
    return this.months.flatMap(month => {
      const monthData = month.retrieve();
      return monthData.map(data => ({ ...data, month: month.number }));
    });
  }

  public isLeapYear(): boolean {
    return this.number % 4 === 0 && (this.number % 100 !== 0 || this.number % 400 === 0);
  }
}
