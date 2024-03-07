import { Clonable } from '../../shared';
import { DayOfWeek } from './shared';

export class Day<T> implements Clonable<Day<T>> {
  public data: T | null = null;
  public isCurrentMonth = true;

  constructor(public number: number, public readonly day: DayOfWeek, public isToday = false) {}

  public clone(): Day<T> {
    const day = new Day<T>(this.number, this.day, this.isToday);
    day.data = this.data;
    day.isCurrentMonth = this.isCurrentMonth;
    return day;
  }
}
