import { Component, Root } from '../../Component';
import { bootstrapCss } from '../../shared';
import { KanbanColumn } from '.';
import { ColumnService } from '../domain';
import { DropArea } from '../../Draggable/ui';
import { KanbanActionLayer } from './KanbanActionLayer';
import { useKanbanStore } from '../application';
import { noop } from '../../shared/util';

export class KanbanBoard extends Component {
  private actionLayer: KanbanActionLayer;
  private kanbanStore = useKanbanStore();

  constructor(public root: Root) {
    super();
    this.actionLayer = new KanbanActionLayer(() => this.root().querySelector('.kanban-action-slot')!);

    this.render = this.render.bind(this);

    new ColumnService()
      .findAllWithCards()
      .then(columns => this.kanbanStore.dispatch({ type: 'columnsLoaded', payload: columns }))
      .then(() => this.alignChildren())
      .catch(noop);
  }

  public alignChildren(): void {
    this.children = this.kanbanStore.state.columns.map(
      (column, index) =>
        new DropArea(
          new KanbanColumn(
            () => this.root().querySelector(`.kanban-column-slot:nth-child(${index + 1})`)!,
            column
          ),
          (draggingId, dropId) => {
            if (!dropId) dropId = column.id;
            if (!column.hasCardWithId(draggingId))
              return this.kanbanStore.dispatch({
                type: 'moveCardOutsideColumn',
                payload: { cardId: draggingId, columnId: dropId },
              });
            const from = column.cards.findIndex(card => card.id === draggingId);
            const to = column.cards.findIndex(card => card.id === dropId);
            this.kanbanStore.dispatch({ type: 'moveCardInColumn', payload: { from, to, column } });
          }
        )
    );
    this.children.push(this.actionLayer);
  }

  public template(): string {
    const columnSlot = `<section aria-role="listbox" class="kanban-column-slot"></section>`.repeat(
      this.kanbanStore.state.columns.length
    );
    const emptyColumnSlot = `
      <section aria-role="listbox" class="kanban-column-empty">
        <p>No columns available</p>
      </section>
    `;
    return `
      <main class="kanban-board">
        <div class="kanban-header">
          <h1 class="kanban-title">Kanban Board</h1>
          <div class="kanban-action-slot"></div>
        </div>
        <div class="kanban-content">
          ${this.kanbanStore.state.columns.length > 0 ? columnSlot : emptyColumnSlot}
        </div>
      </main>
    `;
  }

  public hydrate(): void {
    this.kanbanStore.subscribe(this.render);
  }

  public teardown(): void {
    this.kanbanStore.unsubscribe(this.render);
  }
}

bootstrapCss`
.kanban-board {
  padding: 1rem;
  background-color: #181818;
  border-radius: 0.5rem;
}

.kanban-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.kanban-title {
  font-weight: 700;
  font-size: 1.5rem;
}

.kanban-content {
  display: flex;
  width: 640px;
  height: 480px;
  overflow-x: scroll;
  overflow-y: hidden;
}

.kaban-column-empty {
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.kanban-column-slot {
  position: relative;
  height: inherit;
  display: inline-block;
}

.kanban-column-slot + .kanban-column-slot {
  margin-left: 1rem;
}
`;
