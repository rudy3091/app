import { Component, Root } from '../../Component';
import { bootstrapCss } from '../../shared';
import { Color } from '../../shared/application';
import { TimeBlockService } from '../domain/TimeBlock';

export class ActionLayer extends Component {
  constructor(public root: Root) {
    super();
    this.reset = this.reset.bind(this);
  }

  public template(): string {
    return `
      <div class="dp-action-container">
        <h1 class="dp-title">Daily Planner</h1>
        <div>
          <button class="dp-action-reset">Reset</button>
        </div>
      </div>
    `;
  }

  public reset() {
    TimeBlockService.reset();
    location.reload();
  }

  public hydrate(): void {
    this.root().addEventListener('click', this.reset);
  }

  public teardown(): void {
    this.root().removeEventListener('click', this.reset);
  }
}

bootstrapCss`
.dp-action-container {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  color: white;
  border-radius: 0.5rem;
}

.dp-title {
  font-size: 1.2rem;
  font-weight: 700;
  user-select: none;
}

.dp-action-reset {
  background-color: ${Color.Gray900};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
}
`;
