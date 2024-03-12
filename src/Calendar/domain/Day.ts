import { Clonable } from '../../shared/Clonable';
import { CalendarComponent, DayOfWeek, RetrievedData } from './shared';

export class Day implements Clonable<Day>, CalendarComponent<RetrievedData<string | null>> {
  public data: string | null = null;
  public isCurrentMonth = true;

  constructor(
    public year: number,
    public month: number,
    public week: number,
    public number: number,
    public readonly day: DayOfWeek,
    public isToday = false
  ) {}

  public retrieve(): RetrievedData<string | null> {
    return {
      year: this.year,
      month: this.month,
      day: this.number,
      week: this.week,
      data: this.data,
    };
  }

  public clone(): Day {
    const day = new Day(this.year, this.month, this.week, this.number, this.day, this.isToday);
    day.data = this.data;
    day.isCurrentMonth = this.isCurrentMonth;
    return day;
  }
}
