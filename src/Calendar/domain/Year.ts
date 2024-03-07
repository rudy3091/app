import { Month } from './Month';

export class Year<T> {
  public months: Month<T>[] = [];

  constructor(public readonly number: number) {}

  public isLeapYear(): boolean {
    return this.number % 4 === 0 && (this.number % 100 !== 0 || this.number % 400 === 0);
  }
}
