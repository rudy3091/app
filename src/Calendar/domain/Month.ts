import { WeekData } from './Week';
import { YearService } from './Year';
import { CalendarComponent, DayOfWeek } from './shared';

export type MonthData<T> = { week: number } & WeekData<T>;

export class Month<T> implements CalendarComponent<MonthData<T>[]> {
  public weeks: CalendarComponent<WeekData<T>[]>[] = [];

  constructor(public year: number, public readonly number: number) {}

  public retrieve(): MonthData<T>[] {
    return this.weeks.flatMap(week => {
      const weekData = week.retrieve();
      return weekData.map(data => ({ ...data, week: week.number }));
    });
  }

  public lastDate() {
    switch (this.number) {
      case 2:
        return YearService.isLeapYear(this.year) ? 29 : 28;
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
    const formerYear = month.number - 1 === 0 ? year - 1 : year;
    return new Month<T>(formerYear, formerMonth);
  }
}
