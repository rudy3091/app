import { Clonable } from '../../shared/Clonable';
import { CalendarComponent, DayOfWeek } from './shared';

export class Day<T> implements Clonable<Day<T>>, CalendarComponent<T | null> {
  public data: T | null = null;
  public isCurrentMonth = true;

  constructor(
    public year: number,
    public month: number,
    public number: number,
    public readonly day: DayOfWeek,
    public isToday = false
  ) {}

  public retrieve(): T | null {
    return this.data;
  }

  public clone(): Day<T> {
    const day = new Day<T>(this.year, this.month, this.number, this.day, this.isToday);
    day.data = this.data;
    day.isCurrentMonth = this.isCurrentMonth;
    return day;
  }
}
