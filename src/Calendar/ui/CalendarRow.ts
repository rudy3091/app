import { Component, Root } from '../../Component';
import { Day, Week } from '../domain';
import { CalendarCell } from './CalendarCell';

export class CalendarRow<T> extends Component {
  constructor(public root: Root, public week: Week<T>) {
    super();
    this.alignChildren();
  }

  public alignChildren(): void {
    this.children = this.week.days.map((day, index) => {
      return new CalendarCell(() => this.root().querySelector(`.calendar-cell-slot:nth-child${index + 1}`)!, day);
    });
  }

  public template() {
    return `
      <ul>
        ${`<li class="calendar-cell-slot"></li>`.repeat(this.week.days.length)}
      </ul>
    `;
  }
}
