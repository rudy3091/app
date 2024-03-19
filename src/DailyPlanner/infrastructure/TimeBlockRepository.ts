import { TimeBlock } from '../domain/TimeBlock';

export interface ITimeBlockRepository {
  save(data: TimeBlock[]): void;
  load(): TimeBlock[];
}

export class TimeBlockRepository implements ITimeBlockRepository {
  private readonly key: string = 'daily-planner-data';

  public save(data: TimeBlock[]): void {
    localStorage.setItem(this.key, JSON.stringify(data));
  }

  public load(): TimeBlock[] {
    const raw = localStorage.getItem(this.key);
    return JSON.parse(raw || '[]').map(TimeBlock.fromJson) as TimeBlock[];
  }
}
