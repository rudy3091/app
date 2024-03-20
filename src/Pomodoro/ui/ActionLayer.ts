import { Component, Root } from '../../Component';
import { bootstrapCss } from '../../shared';
import { Color } from '../../shared/application';
import { useTimer } from '../application/store';

export class ActionLayer extends Component {
  private timer = useTimer();

  constructor(public root: Root) {
    super();
    this.do = this.do.bind(this);
  }

  public template(): string {
    return `
      <div class="pmdr-action-layer">
        <button class="pmdr-action-button" data-action="start">Start</button>
        <button class="pmdr-action-button" data-action="pause">Pause</button>
        <button class="pmdr-action-button" data-action="reset">Reset</button>
      </div>
    `;
  }

  public do(ev: MouseEvent) {
    const target = (ev.target as HTMLElement).closest('.pmdr-action-button');
    const action = target?.getAttribute('data-action');
    switch (action) {
      case 'start':
        return this.timer.dispatch({ type: 'start' });
      case 'pause':
        return this.timer.dispatch({ type: 'pause' });
      case 'reset':
        return this.timer.dispatch({ type: 'reset' });
      default:
        return;
    }
  }

  public hydrate(): void {
    this.root().addEventListener('click', this.do);
  }

  public teardown(): void {
    this.root().removeEventListener('click', this.do);
  }
}

bootstrapCss`
.pmdr-action-layer {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  border-radius: 0.5rem;
  background-color: ${Color.Gray900};
}

.pmdr-action-button {
  padding: 1rem;
  margin: 0.5rem 0;
  border: none;
  border-radius: 0.5rem;
  background-color: ${Color.Gray800};
  color: ${Color.Gray100};
  cursor: pointer;
}
`;
