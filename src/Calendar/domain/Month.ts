import { Week } from './Week';
import { DayOfWeek } from './shared';

export class Month<T> {
  public weeks: Week<T>[] = [];

  constructor(public readonly number: number, private isLeapYear: boolean) {}

  private lastDate() {
    switch (this.number) {
      case 2:
        return this.isLeapYear ? 29 : 28;
      case 4:
      case 6:
      case 9:
      case 11:
        return 30;
      default:
        return 31;
    }
  }

  private getFirstDay() {
    const day = new Date(this.number + '/1/' + new Date().getFullYear()).getDay();
    switch (day) {
      case 0:
        return DayOfWeek.Sunday;
      case 1:
        return DayOfWeek.Monday;
      case 2:
        return DayOfWeek.Tuesday;
      case 3:
        return DayOfWeek.Wednesday;
      case 4:
        return DayOfWeek.Thursday;
      case 5:
        return DayOfWeek.Friday;
      case 6:
        return DayOfWeek.Saturday;
    }
  }
}
