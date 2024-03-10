import { Component, Root } from '../../Component';
import { bootstrapCss } from '../../shared';
import { Day } from '../domain';

export class CalendarListViewEntry<T> extends Component {
  constructor(public root: Root, public data: T, public date?: Day<T>) {
    super();
  }

  public template(): string {
    return `
      <div class="calendar-list-entry">
        <span class="calendar-list-entry-data">${this.data}</span>
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
`;
