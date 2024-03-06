import { Component, Root } from '../../Component';
import { Day } from '../domain';

export class CalendarCell<T> extends Component {
  constructor(public root: Root, public day: Day<T>) {
    super();
  }

  template() {
    return `
      <div>${this.day.number}</div>
    `;
  }
}
