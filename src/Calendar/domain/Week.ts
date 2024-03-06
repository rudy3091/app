import { Day } from './Day';

export class Week<T> {
  public days: Day<T>[] = [];

  constructor(public readonly number: number) {}
}
