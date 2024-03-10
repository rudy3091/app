import { Retrievable } from '../../shared/Retrievable';
import { Day } from './Day';
import { DayOfWeek } from './shared';

export type WeekData<T> = { day: number; data: T };

export class Week<T> implements Retrievable<WeekData<T>[]> {
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

  public retrieve(): WeekData<T>[] {
    return this.days
      .flatMap(day => {
        const dayData = day.retrieve();
        return { data: dayData, day: day.number };
      })
      .filter((data): data is WeekData<T> => !!data.data);
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
