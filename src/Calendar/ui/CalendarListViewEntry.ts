import { Component, Root } from '../../Component';
import { bootstrapCss } from '../../shared';
import { RetrievedData } from '../domain';

export class CalendarListViewEntry extends Component {
  constructor(public root: Root, public data: RetrievedData<string>) {
    super();
  }

  private getLabel(): string {
    const { year, month, week, day } = this.data;
    return `${year ?? 'unknown'}/${month ?? 'unknown'}/${day ?? 'unknown'} (week${week ?? 'unknown'})`;
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
