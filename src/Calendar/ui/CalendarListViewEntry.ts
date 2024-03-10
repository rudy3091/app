import { Component, Root } from '../../Component';
import { bootstrapCss } from '../../shared';
import { MonthData, WeekData, YearData } from '../domain';

export class CalendarListViewEntry<T> extends Component {
  constructor(public root: Root, public data: YearData<T> | MonthData<T> | WeekData<T>) {
    super();
  }

  private getLabel(): string {
    if ('month' in this.data) return `${this.data.month}/${this.data.day}(week${this.data.week})`;
    if ('week' in this.data) return `week${this.data.week} - ${this.data.day}`;
    return this.data.day.toString();
  }

  public template(): string {
    return `
      <div class="calendar-list-entry">
        <span class="calendar-list-entry-data">${this.data.data}</span>
        ${`<span class="calendar-list-entry-day">${this.getLabel()}</span>`}
      </div>
    `;
  }
}

bootstrapCss`
.calendar-list-entry {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background-color: #282828;
  color: #e5e5e5;
  border-radius: 0.5rem;
  transition: background-color 0.2s ease-in-out;
}

.calendar-list-entry:hover {
  background-color: #383838;
  cursor: pointer;
}

.calendar-list-entry-data {
  margin-bottom: 0.5rem;
}

.calendar-list-entry-day {
  color: #888;
}
`;
