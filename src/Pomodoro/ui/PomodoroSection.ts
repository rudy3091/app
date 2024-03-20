import { Component, Root } from '../../Component';
import { bootstrapCss } from '../../shared';
import { Color } from '../../shared/application';
import { ActionLayer } from './ActionLayer';
import { TimerBody } from './TimerBody';

export class PomodoroSection extends Component {
  private timerBody: TimerBody;
  private actionLayer: ActionLayer;

  constructor(public root: Root) {
    super();
    this.timerBody = new TimerBody(() => this.root().querySelector('.pmdr-timer-slot')!);
    this.actionLayer = new ActionLayer(() => this.root().querySelector('.pmdr-action-slot')!);
  }

  public alignChildren(): void {
    this.children = [this.timerBody, this.actionLayer];
  }

  public template(): string {
    return `
      <section class="pmdr-section">
        <div class="pmdr-timer-slot"></div>
        <div class="pmdr-action-slot"></div>
      </section>
    `;
  }
}

bootstrapCss`
.pmdr-section {
  width: 640px;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background-color: ${Color.Gray900};
  border-radius: 0.5rem;
}
`;
