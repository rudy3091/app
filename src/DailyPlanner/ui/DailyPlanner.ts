import { Component, Root } from '../../Component';
import { Color } from '../../shared/application';
import { bootstrapCss } from '../../shared';
import { TimeTable } from './TimeTable';
import { ActionLayer } from './ActionLayer';

export class DailyPlanner extends Component {
  private timetable: TimeTable;
  private actionLayer: ActionLayer;

  constructor(public root: Root) {
    super();
    this.timetable = new TimeTable(
      () => this.root().querySelector('.dp-timetable-slot')!,
      [
        { key: 'completed', name: '✅', width: '1rem' },
        { key: 'timestamp', name: 'Time', width: '80px' },
        { key: 'title', name: 'Title' },
      ]
    );
    this.actionLayer = new ActionLayer(() => this.root().querySelector('.dp-action-slot')!);
  }

  public alignChildren(): void {
    this.children = [this.timetable, this.actionLayer];
  }

  public template(): string {
    return `
      <div class="dp-section">
        <div class="dp-action-slot"></div>
        <div class="dp-timetable-slot"></div>
      </div>
    `;
  }
}

bootstrapCss`
.dp-section {
  width: 640px;
  max-height: 80%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background-color: ${Color.Gray950};
  border-radius: 0.5rem;
}

.dp-timetable-slot {
  margin-top: 1rem;
  overflow-y: scroll;
}
`;
