import { Component, Root } from '../../Component';
import { bootstrapCss } from '../../shared';

export interface AddCardProps {
  onClick?: () => void;
  addCard: (content: string) => void;
}

export class AddCard extends Component {
  private state = {
    clicked: false,
  };
  private onClick?: () => void;

  constructor(public root: Root, public props: AddCardProps) {
    super();
    this.onClick = this.props.onClick?.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  public template(): string {
    return this.state.clicked
      ? `
      <form class="kanban-add-card-form">
        <textarea type="text" class="kanban-add-card-input" placeholder="Type"></textarea>
        <button type="submit" class="kanban-add-card-submit" aria-label="Add">Add</button>
      </form>
    `
      : `
      <button class="kanban-add-card" aria-label="Add a card">
        Add a card
      </button>
    `;
  }

  public handleClick = () => {
    if (this.state.clicked) return;
    this.state.clicked = true;
    this.onClick?.();
    this.render();
  };

  public handleSubmit = (ev: SubmitEvent) => {
    ev.preventDefault();
    const content = this.root().querySelector('.kanban-add-card-input') as HTMLInputElement;
    this.props.addCard(content.value);
    this.state.clicked = false;
    this.render();
  };

  public hydrate(): void {
    this.root().addEventListener('click', this.handleClick);
    this.root().addEventListener('submit', this.handleSubmit);
  }

  public teardown(): void {
    this.root().removeEventListener('click', this.handleClick);
    this.root().removeEventListener('submit', this.handleSubmit);
  }
}

bootstrapCss`
.kanban-add-card {
  width: 100%;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  border: none;
  background-color: #181818;
  color: #e8e8e8;
  text-align: left;
  cursor: pointer;
}

.kanban-add-card-form {
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
}

.kanban-add-card-input {
  width: 100%;
  padding: 0.5rem;
  border: none;
  background-color: #282828;
  color: #e8e8e8;
  font-size: 1rem;
  resize: none;
}

.kanban-add-card-input:focus {
  outline: none;
}

.kanban-add-card-submit {
  width: 100%;
  padding: 0.5rem;
  border: none;
  background-color: #181818;
  color: #e8e8e8;
  cursor: pointer;
}
`;
