import { Component, Root } from '../../Component';
import { bootstrapCss } from '../../shared';
import { Color } from '../../shared/application';
import { useTimer } from '../application/store';

export class TimerBody extends Component {
  private intervalId: NodeJS.Timeout | null = null;

  public readonly timer = useTimer();

  constructor(public root: Root) {
    super();
    this.timer.dispatch({ type: 'set', minute: 25, second: 0 });
  }

  public template(): string {
    return `
      <div class="pmdr-timer-body">
        <div class="pmdr-timer-minute">${this.timer.state.timer.display()}</div>
      </div>
    `;
  }

  public hydrate(): void {
    this.intervalId = setInterval(() => {
      this.timer.dispatch({ type: 'tick' });
      this.render();
    }, 1000);
  }

  public teardown(): void {
    if (!this.intervalId) return;
    clearInterval(this.intervalId);
  }
}

bootstrapCss`
.pmdr-timer-body {
  width: 100%;
  min-height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 5rem;
  border-radius: 0.5rem;
  background-color: ${Color.Gray800};
}
`;
