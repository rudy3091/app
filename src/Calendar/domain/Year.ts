import { Retrievable } from '../../shared/Retrievable';
import { Month } from './Month';

export class Year<T> implements Retrievable<T[]> {
  public months: Month<T>[] = [];

  constructor(public readonly number: number) {}

  public retrieve(): T[] {
    return this.months.flatMap(month => month.retrieve());
  }

  public isLeapYear(): boolean {
    return this.number % 4 === 0 && (this.number % 100 !== 0 || this.number % 400 === 0);
  }
}
