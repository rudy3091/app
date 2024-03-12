import { Day } from './Day';
import { CalendarComponent, DayOfWeek, RetrievedData } from './shared';

export class Week implements CalendarComponent<RetrievedData<string>[]> {
  public days: CalendarComponent<RetrievedData<string | null>>[] = [];

  constructor(
    public year: number,
    public month: number,
    public readonly number: number,
    public readonly firstDay: DayOfWeek,
    public readonly firstDate: number,
    public readonly lastDateOfMonth: number,
    public readonly formerMonthDays: number
  ) {
    this.days = this.createDays();
  }

  public retrieve(): RetrievedData<string>[] {
    return this.days.flatMap(day => day.retrieve()).filter((data): data is RetrievedData<string> => !!data.data);
  }

  private createDays(): CalendarComponent<RetrievedData<string | null>>[] {
    return new Array(7)
      .fill(0)
      .map(
        (_, index) => new Day(this.year, this.month, this.number, this.firstDate + index, this.firstDay + index)
      )
      .map(day => {
        const _day = day.clone();
        if (day.number <= 0) {
          _day.number = this.formerMonthDays + day.number;
          _day.isCurrentMonth = false;
        }
        if (day.number > this.lastDateOfMonth) {
          _day.number = day.number - this.lastDateOfMonth;
          _day.isCurrentMonth = false;
        }
        if (new Date().getDate() === _day.number && _day.isCurrentMonth) {
          _day.isToday = true;
        }
        return _day;
      });
  }
}
