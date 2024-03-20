import './style.ts';
import { Component, Root, mount } from './Component.ts';
import { KanbanBoard } from './Kanban/ui/index.ts';
import { bootstrapCss } from './shared.ts';
import { Calendar } from './Calendar/ui/Calendar.ts';
import { DailyPlanner } from './DailyPlanner/ui/DailyPlanner.ts';
import { PomodoroSection } from './Pomodoro/ui/PomodoroSection.ts';

export class Application extends Component {
  public kanbanBoard: KanbanBoard;
  public calendar: Calendar;
  public dp: DailyPlanner;
  public pomodoroTimer: PomodoroSection;

  constructor(public root: Root) {
    super();
    this.kanbanBoard = new KanbanBoard(() => this.root().querySelector('.kanban-board-slot')!);
    this.calendar = new Calendar(
      () => this.root().querySelector('.calendar-slot')!,
      new Date().getFullYear(),
      new Date().getMonth() + 1
    );
    this.dp = new DailyPlanner(() => this.root().querySelector('.daily-planner-slot')!);
    this.pomodoroTimer = new PomodoroSection(() => this.root().querySelector('.pomodoro-timer-slot')!);
  }

  public alignChildren(): void {
    this.children = [this.pomodoroTimer, this.dp, this.kanbanBoard, this.calendar];
  }

  public template(): string {
    return `
      <div class="app">
        <div class="pomodoro-timer-slot">Daily planner is not available</div>
        <div class="daily-planner-slot">Daily planner is not available</div>
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

.pomodoro-timer-slot,
.daily-planner-slot,
.kanban-board-slot,
.calendar-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: scroll;
}
`;
