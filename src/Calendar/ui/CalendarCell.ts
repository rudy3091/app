import { Component, Root } from '../../Component';
import { Modal } from '../../shared/ui';
import { bootstrapCss } from '../../shared';
import { Day } from '../domain';
import { EditDayDetail } from './EditDayDetail';

export class CalendarCell<T> extends Component {
  private editDayDetailModal: Modal<EditDayDetail<T>>;

  constructor(public root: Root, public day: Day<T>) {
    super();
    this.edit = this.edit.bind(this);
    this.editDayDetailModal = new Modal(
      'Edit Day',
      new EditDayDetail(this.day, value => {
        if (value === null) this.day.data = null;
        else this.day.data = value as T;
        this.render();
        this.editDayDetailModal.close();
      })
    );
  }

  template() {
    return `
      <div class="calendar-cell-container${this.day.isCurrentMonth ? '' : ' calendar-cell-ghost'}${
      this.day.isToday ? ' calendar-cell-today' : ''
    }">
        <span class="calendar-cell-date">${this.day.number}</span>
        <span>${this.day.data === null ? '' : this.day.data}</span>
      </div>
    `;
  }

  public edit() {
    this.editDayDetailModal.open();
  }

  public hydrate(): void {
    this.root().addEventListener('click', this.edit);
  }

  public teardown(): void {
    this.root().removeEventListener('click', this.edit);
  }
}

bootstrapCss`
.calendar-cell-container {
  padding: 0.5rem;
  width: 100%;
  height: 100%;
  position: relative;
  transition: background-color 0.2s ease-in-out;
  cursor: pointer;
  border-radius: 0.5rem;
}

.calendar-cell-container:hover {
  background-color: #282828;
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
