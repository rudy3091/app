import { Month } from './Month';
import { CalendarComponent, RetrievedData } from './shared';

export class Year implements CalendarComponent<RetrievedData<string>[]> {
  public months: Array<CalendarComponent<RetrievedData<string>[]> | null> = new Array(12)
    .fill(null)
    .map((_, index) => new Month(this.number, index + 1));

  constructor(public readonly number: number) {}

  public retrieve(): RetrievedData<string>[] {
    return this.months.flatMap(month => {
      if (!month) return [];
      const monthData = month.retrieve();
      return monthData.map(data => ({ ...data, month: month.number }));
    });
  }

  public isLeapYear(): boolean {
    return this.number % 4 === 0 && (this.number % 100 !== 0 || this.number % 400 === 0);
  }
}

export class YearService {
  public static isLeapYear(year: number): boolean {
    return new Year(year).isLeapYear();
  }
}
