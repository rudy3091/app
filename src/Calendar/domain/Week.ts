import { Day } from './Day';
import { DayOfWeek } from './shared';

export class Week<T> {
  public days: Day<T>[] = [];

  constructor(
    public readonly number: number,
    public readonly firstDay: DayOfWeek,
    public readonly firstDate: number,
    public readonly lastDateOfMonth: number,
    public readonly formerMonthDays: number
  ) {
    this.days = this.createDays();
  }

  private createDays() {
    return new Array(7)
      .fill(0)
      .map((_, index) => new Day<T>(this.firstDate + index, this.firstDay + index))
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
