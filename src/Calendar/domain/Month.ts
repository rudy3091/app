import { Week } from './Week';
import { Year } from './Year';
import { DayOfWeek } from './shared';

export class Month<T> {
  public weeks: Week<T>[] = [];

  constructor(public readonly number: number, private isLeapYear: boolean) {}

  public lastDate() {
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

  public getFirstDay(): DayOfWeek {
    const day = new Date(this.number + '/1/' + new Date().getFullYear()).getDay();
    switch (day) {
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
      default:
        return DayOfWeek.Sunday;
    }
  }
}

export class MonthService {
  public getFormerMonth<T>(month: Month<T>, year: number) {
    const formerMonth = month.number - 1 === 0 ? 12 : month.number - 1;
    const formerYear = new Year<T>(month.number - 1 === 0 ? year - 1 : year);
    return new Month<T>(formerMonth, formerYear.isLeapYear());
  }
}
