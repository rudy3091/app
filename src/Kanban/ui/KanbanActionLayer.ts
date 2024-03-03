import { Component, Root } from '../../Component';
import { bootstrapCss } from '../../shared';
import { noop } from '../../shared/util';
import { useKanbanStore } from '../application';
import { CardService, ColumnService } from '../domain';

export class KanbanActionLayer extends Component {
  private readonly columnService = new ColumnService();
  private readonly cardService = new CardService();
  private readonly kanbanStore = useKanbanStore();

  constructor(public root: Root) {
    super();
    this.handleAction = this.handleAction.bind(this);
  }

  public template(): string {
    return `
      <div class="kanban-action-layer">
        <button class="kanban-action-button" data-action="save">Save</button>
        <button class="kanban-action-button" data-action="reset">Reset</button>
      </div>
    `;
  }

  public handleAction(ev: MouseEvent) {
    if ((ev.target as HTMLElement).closest('.kanban-action-button[data-action="save"]')) {
      this.kanbanStore.dispatch({ type: 'saveColumns' });
      this.cardService.saveAll(this.kanbanStore.state.columns.flatMap(column => column.cards)).catch(noop);
    } else if ((ev.target as HTMLElement).closest('.kanban-action-button[data-action="reset"]')) {
      this.columnService
        .findAllWithCards()
        .then(columns => {
          this.kanbanStore.dispatch({ type: 'columnsLoaded', payload: columns });
        })
        .catch(noop);
    }
  }

  public hydrate(): void {
    this.root().addEventListener('click', this.handleAction);
  }

  public teardown(): void {
    this.root().removeEventListener('click', this.handleAction);
  }
}

bootstrapCss`
.kanban-action-layer {
  display: flex;
  justify-content: center;
  padding: 1rem;
  background-color: #181818;
}

.kanban-action-button {
  font-size: 0.75rem;
  padding: 0.5rem 1rem;
  background-color: #282828;
  border: none;
  border-radius: 0.5rem;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.kanban-action-button + .kanban-action-button {
  margin-left: 0.5rem;
}
`;
