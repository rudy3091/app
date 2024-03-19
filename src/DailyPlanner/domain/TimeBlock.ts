import { ITimeBlockRepository, TimeBlockRepository } from '../infrastructure/TimeBlockRepository';

export class TimeBlock {
  constructor(
    public interval: 30 | 60,
    public timestamp: string,
    public title: string,
    public description: string,
    public completed: string
  ) {}

  public static fromJson(json: any): TimeBlock {
    return new TimeBlock(json.interval, json.timestamp, json.title, json.description, json.completed);
  }

  public withTimestamp(timestamp: string): typeof this {
    this.timestamp = timestamp;
    return this;
  }

  public withTitle(title: string): typeof this {
    this.title = title;
    return this;
  }

  public withDescription(description: string): typeof this {
    this.description = description;
    return this;
  }

  public withCompleted(completed: string): typeof this {
    this.completed = completed;
    return this;
  }

  public getByKey(key: string): string {
    switch (key) {
      case 'completed':
        return this.completed;
      case 'timestamp':
        return this.timestamp;
      case 'title':
        return this.title;
      default:
        return '';
    }
  }

  public set(key: string, value: string): void {
    switch (key) {
      case 'completed':
        this.completed = value;
        break;
      case 'timestamp':
        this.timestamp = value;
        break;
      case 'title':
        this.title = value;
        break;
    }
  }
}

export class TimeBlockService {
  public static repository: ITimeBlockRepository = new TimeBlockRepository();

  public static findByTimestamp(blocks: TimeBlock[], timestamp: string): TimeBlock | undefined {
    return blocks.find(block => block.timestamp === timestamp);
  }

  public static save(blocks: TimeBlock[]): void {
    TimeBlockService.repository.save(blocks);
  }

  public static load(): TimeBlock[] {
    return TimeBlockService.repository.load();
  }

  public static reset(): void {
    TimeBlockService.repository.save([]);
  }

  public static fromRange(from: number, to: number, title: string): TimeBlock[] {
    const loaded = TimeBlockService.load();
    const blocks =
      loaded.length > 0
        ? loaded
        : Array.from({ length: (to - from) * 2 }, (_, i) => {
            const time = `${from + Math.floor(i / 2)}`.padStart(2, '0');
            const timeString = time.slice(0, 2) + ':' + (i % 2 === 0 ? '00' : '30');
            return new TimeBlock(30, timeString, title, '', '');
          });

    TimeBlockService.findByTimestamp(blocks, '10:00')?.withTitle("Schedule today's task");
    TimeBlockService.findByTimestamp(blocks, '10:30')?.withTitle("Schedule today's task");
    TimeBlockService.findByTimestamp(blocks, '12:00')?.withTitle('Lunch');
    TimeBlockService.findByTimestamp(blocks, '12:30')?.withTitle('Lunch');

    return blocks;
  }
}
