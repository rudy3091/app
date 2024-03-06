import { DayOfWeek } from './shared';

export class Day<T> {
  public data: T | null = null;

  constructor(public readonly number: number, public readonly day: DayOfWeek) {}
}
