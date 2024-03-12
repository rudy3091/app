import { YearService } from './Year';
import { CalendarComponent, DayOfWeek, RetrievedData } from './shared';

export class Month implements CalendarComponent<RetrievedData<string>[]> {
  public weeks: CalendarComponent<RetrievedData<string>[]>[] = [];

  constructor(public year: number, public readonly number: number) {}

  public retrieve(): RetrievedData<string>[] {
    return this.weeks.flatMap(week => week.retrieve());
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
  public getFormerMonth(month: Month, year: number) {
    const formerMonth = month.number - 1 === 0 ? 12 : month.number - 1;
    const formerYear = month.number - 1 === 0 ? year - 1 : year;
    return new Month(formerYear, formerMonth);
  }
}
