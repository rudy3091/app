export class Timer {
  public paused = true;

  constructor(public minute: number, public second: number) {}

  public setMinute(): typeof this {
    this.minute = this.minute;
    return this;
  }

  public setSecond(): typeof this {
    this.second = this.second;
    return this;
  }

  public tick() {
    if (this.paused || (this.minute === 0 && this.second === 0)) return;
    this.second -= 1;
    if (this.second >= 0) return;
    this.second = 59;
    this.minute -= 1;
  }

  public display(): string {
    const minuteString = this.minute.toString().padStart(2, '0');
    const secondString = this.second.toString().padStart(2, '0');
    return `${minuteString}:${secondString}`;
  }
}
