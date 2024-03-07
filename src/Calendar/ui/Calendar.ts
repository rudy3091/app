import { Component, Root } from '../../Component';
import { bootstrapCss } from '../../shared';
import { Week } from '../domain';
import { CalendarRow } from './CalendarRow';

export class Calendar extends Component {
  constructor(public root: Root, public year: number, public month: number) {
    super();
    this.alignChildren();
  }

  public alignChildren(): void {
    this.children = [
      new CalendarRow(() => this.root().querySelector('.calendar-row-slot:nth-child(1)')!, new Week(0)),
      new CalendarRow(() => this.root().querySelector('.calendar-row-slot:nth-child(2)')!, new Week(1)),
      new CalendarRow(() => this.root().querySelector('.calendar-row-slot:nth-child(3)')!, new Week(2)),
      new CalendarRow(() => this.root().querySelector('.calendar-row-slot:nth-child(4)')!, new Week(3)),
      new CalendarRow(() => this.root().querySelector('.calendar-row-slot:nth-child(5)')!, new Week(4)),
      new CalendarRow(() => this.root().querySelector('.calendar-row-slot:nth-child(6)')!, new Week(5)),
    ];
  }

  template() {
    return `
      <section class="calendar-section">
        ${`<div class="calendar-row-slot"></div>`.repeat(this.children.length)}
      </section>
    `;
  }
}

bootstrapCss`
.calendar-section {
  border: 1px solid red;
}
`;
