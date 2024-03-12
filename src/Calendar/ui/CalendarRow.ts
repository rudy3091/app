import { Component, Root } from '../../Component';
import { bootstrapCss } from '../../shared';
import { Day, Week } from '../domain';
import { CalendarCell } from './CalendarCell';

export class CalendarRow<T> extends Component {
  constructor(public root: Root, public week: Week<T>) {
    super();
    this.alignChildren();
  }

  public alignChildren(): void {
    this.children = this.week.days.map(
      (day, index) =>
        new CalendarCell<T>(
          () => this.root().querySelector(`.calendar-cell-slot:nth-child(${index + 1})`)!,
          day as Day<T>
        )
    );
  }

  public template() {
    return `
      <ul class="calendar-row-wrapper">
        ${`<li class="calendar-cell-slot"></li>`.repeat(this.week.days.length)}
      </ul>
    `;
  }
}

bootstrapCss`
.calendar-row-wrapper {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  list-style: none;
  padding: 0;
  margin: 0;
}

.calendar-cell-slot {
  display: inline-block;
}
`;
