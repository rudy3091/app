import { Component } from '../../Component';
import { bootstrapCss } from '../../shared';
import { Day } from '../domain';

export class EditDayDetail<T> extends Component {
  constructor(public day: Day<T>, private onSave: (day: Day<T>) => void) {
    super();
    this.save = this.save.bind(this);
  }

  public template(): string {
    return `
      <div class="calendar-edit-day-detail">
        <h2>${this.day.number}</h2>
        <textarea class="calendar-edit-day-textarea">${this.day.data ?? ''}</textarea>
        <button class="calendar-edit-save-button">Save</button>
      </div>
    `;
  }

  private save(ev: MouseEvent): void {
    ev.stopPropagation();
    const target = ev.target as HTMLElement;
    if (target.closest('.calendar-edit-save-button')) {
      const textarea = this.root().querySelector('textarea') as HTMLTextAreaElement;
      this.day.data = textarea.value as any;
      this.onSave(this.day);
    }
  }

  public hydrate(): void {
    this.root().addEventListener('click', this.save);
  }

  public teardown(): void {
    this.root().removeEventListener('click', this.save);
  }
}

bootstrapCss`
.calendar-edit-day-detail {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.calendar-edit-day-textarea {
  width: 100%;
  height: 200px;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: #282828;
  color: #e5e5e5;
  resize: none;
  border: none;
}

.calendar-edit-day-textarea:focus {
  outline: none;
  box-shadow: 0 0 0 1px #e5e5e588;
}

.calendar-edit-save-button {
  padding: 0.5rem 1rem;
  background-color: #282828;
  color: #e5e5e5;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.calendar-edit-save-button:hover {
  background-color: #383838;
}
`;
