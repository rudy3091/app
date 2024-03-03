import { Component, Root } from '../../Component';
import { bootstrapCss } from '../../shared';
import { noop } from '../../shared/util';
import { useKanbanStore } from '../application';
import { Card, CardService } from '../domain';

export class KanbanCard extends Component {
  private readonly kanbanStore = useKanbanStore();
  private readonly cardService = new CardService();

  constructor(public root: Root, private card: Card) {
    super();
    this.open = this.open.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
    this.render = this.render.bind(this);
  }

  public template(): string {
    return `
      <div class="kanban-card" draggable="true" data-dragging-data="${this.card.id}">
        <div class="kanban-card-delete-button">
          <span aria-label="Delete card">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 4L12 12"
                stroke="#fff"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12 4L4 12"
                stroke="#fff"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </div>
        ${this.card.title ? `<h2 class="kanban-card-title">${this.card.title}</h2>` : ''}
        <p class="kanban-card-description">${this.card.description}</p>
      </div>
    `;
  }

  public hydrate(): void {
    this.root().addEventListener('dblclick', this.open);
    this.root().addEventListener('click', this.deleteCard);
  }
  public teardown(): void {
    this.root().removeEventListener('dblclick', this.open);
    this.root().removeEventListener('click', this.deleteCard);
  }

  public deleteCard(ev: MouseEvent): void {
    const target = ev.target as HTMLElement;
    if (target.closest('.kanban-card-delete-button')) {
      this.cardService
        .delete(this.card)
        .then(() => this.kanbanStore.dispatch({ type: 'deleteCard', payload: this.card.id }))
        .catch(noop);
    }
  }

  public open(): void {
    console.log('Open card:', this.card);
  }
}

bootstrapCss`
.kanban-card {
  padding: 1rem;
  background-color: #282828;
  border-radius: 0.5rem;
  position: relative;
}

.kanban-card:hover {
  cursor: pointer;
  background-color: #383838;
  transition: background-color 0.2s ease-in-out;
}

.kanban-card-delete-button {
  opacity: 0;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;
}

.kanban-card:hover .kanban-card-delete-button {
  opacity: 1;
}

.kanban-card-title {
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.kanban-card-description {
  font-size: 0.75rem;
}
`;
