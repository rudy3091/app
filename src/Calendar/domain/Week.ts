import { Day } from './Day';
import { DayOfWeek } from './shared';

export class Week<T> {
  public days: Day<T>[] = [];

  constructor(public readonly number: number, private firstDay: DayOfWeek) {
    this.days = this.createDays();
  }

  public createDays() {
    const days: Day<T>[] = [];
    for (let i = 0; i < 7; i++) {
      days.push(new Day(i + 1, this.firstDay + i));
    }
    return days;
  }
}
