import './style.ts';
import { Component, Root, mount } from './Component.ts';
import { KanbanBoard } from './Kanban/ui/index.ts';
import { bootstrapCss } from './shared.ts';
import { Calendar } from './Calendar/ui/Calendar.ts';

export class Application extends Component {
  public kanbanBoard: KanbanBoard;
  public calendar: Calendar;

  constructor(public root: Root) {
    super();
    this.kanbanBoard = new KanbanBoard(() => this.root().querySelector('.kanban-board-slot')!);
    this.calendar = new Calendar(
      () => this.root().querySelector('.calendar-slot')!,
      new Date().getFullYear(),
      new Date().getMonth() + 1
    );
    // this.children.push(this.kanbanBoard);
    this.children.push(this.calendar);
  }

  public template(): string {
    return `
      <div class="app">
        <div class="calendar-slot">Calendar is not available</div>
        <div class="kanban-board-slot">Kanban board is not available</div>
      </div>
    `;
  }
}

mount(() => document.body, Application);

bootstrapCss`
.app {
  width: 100%;
  height: 100%;
  overflow: auto;
  scroll-snap-type: y mandatory;
}

.app > div {
  width: 100%;
  height: 100%;
  scroll-behavior: smooth;
  scroll-snap-align: center;
}

.kanban-board-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: scroll;
}

.calendar-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: scroll;
}
`;
