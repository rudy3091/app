import { Component, Root } from '../../Component';
import { bootstrapCss } from '../../shared';
import { Day } from '../domain';

export class CalendarCell<T> extends Component {
  constructor(public root: Root, public day: Day<T>) {
    super();
  }

  template() {
    return `
      <div class="calendar-cell-container${this.day.isCurrentMonth ? '' : ' calendar-cell-ghost'}${
      this.day.isToday ? ' calendar-cell-today' : ''
    }">
        <span class="calendar-cell-date">${this.day.number}</span>
      </div>
    `;
  }
}

bootstrapCss`
.calendar-cell-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.calendar-cell-date {
  font-weight: 300;
}

.calendar-cell-ghost .calendar-cell-date {
  opacity: 0.3;
}

.calendar-cell-today .calendar-cell-date {
  font-weight: 700;
  border-bottom: 2px solid #fff;
}
`;
