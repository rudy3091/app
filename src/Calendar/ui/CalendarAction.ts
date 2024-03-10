import { Component, Root } from '../../Component';
import { bootstrapCss } from '../../shared';
import { Action, NextMonth, PrevMonth, GotoToday, ToggleListView } from '../domain';

export class CalendarAction extends Component {
  // prettier-ignore
  public actions: Action[] = [
    new PrevMonth(),
    new GotoToday(),
    new NextMonth(),
    new ToggleListView(),
  ]

  constructor(public root: Root) {
    super();
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.action = this.action.bind(this);
  }

  public template() {
    return `
      <button class="calendar-action-button">
        <svg width="16" height="16" viewBox="0 0 100 50" fill="#fff">
          <circle cx="15" cy="25" r="15"></circle>
          <circle cx="50" cy="25" r="15"></circle>
          <circle cx="85" cy="25" r="15"></circle>
        </svg>
      </button>
      <ul class="calendar-action-listbox" aria-expanded="false">
        ${this.actions
          .map(
            (action, index) => `
          <li class="calendar-action-listitem" data-action-index="${index}">
            ${action.label}
          </li>`
          )
          .join('')}
      </ul>
    `;
  }

  public open() {
    const target = this.root().querySelector('.calendar-action-listbox')!;
    target.classList.add('calendar-action-listbox--open');
    target.setAttribute('aria-expanded', 'true');
  }

  public close() {
    const target = this.root().querySelector('.calendar-action-listbox')!;
    target.classList.remove('calendar-action-listbox--open');
    target.setAttribute('aria-expanded', 'false');
  }

  public action(ev: MouseEvent) {
    const target = (ev.target as HTMLElement).closest('.calendar-action-listitem');
    if (!target) return;
    const actionIndex = parseInt(target.getAttribute('data-action-index')!);
    this.close();
    this.actions[actionIndex].do();
  }

  public hydrate(): void {
    this.root().addEventListener('click', this.action);
    this.root().addEventListener('mouseenter', this.open);
    this.root().addEventListener('mouseleave', this.close);
  }

  public teardown(): void {
    this.root().removeEventListener('click', this.action);
    this.root().removeEventListener('mouseenter', this.open);
    this.root().removeEventListener('mouseleave', this.close);
  }
}

bootstrapCss`
.calendar-action-button {
  padding: 0.5rem 1rem;
  background-color: #282828;
  color: #e5e5e5;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.calendar-action-button:hover {
  background-color: #383838;
}

.calendar-action-listbox {
  width: 200px;
  display: none;
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.5rem;
  background-color: #282828;
  border-radius: 0.5rem;
  z-index: 1;
}

.calendar-action-listbox--open {
  display: block;
}

.calendar-action-listitem {
  list-style: none;
  border-radius: 0.5rem;
  padding: 0.5rem;
  transition: background-color 0.2s ease-in-out;
}

.calendar-action-listitem:hover {
  background-color: #383838;
  cursor: pointer;
}
`;
