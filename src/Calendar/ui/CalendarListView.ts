import { Component, Root } from '../../Component';
import { bootstrapCss } from '../../shared';
import { CalendarComponent, RetrievedData } from '../domain';
import { CalendarListViewEntry } from './CalendarListViewEntry';

export class CalendarListView extends Component {
  constructor(public root: Root, public scope?: CalendarComponent<RetrievedData<string>[]>) {
    super();
  }

  public alignChildren(): void {
    const data = this.scope?.retrieve() ?? [];
    this.children = data.map(
      (item, index) =>
        new CalendarListViewEntry(
          () => this.root().querySelector(`.calendar-list-entry-slot:nth-child(${index + 1})`)!,
          item
        )
    );
  }

  public template(): string {
    return `
      <div class="calendar-list-view">
        ${
          this.children.length === 0
            ? 'No data available.'
            : '<div class="calendar-list-entry-slot"></div>'.repeat(this.children.length)
        }
      </div>
    `;
  }
}

bootstrapCss`
.calendar-list-view {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-radius: 0.5rem;
}
`;
