import { Component, Root } from '../../Component';
import { bootstrapCss } from '../../shared';
import { KanbanCard } from '.';
import { Card, CardService, Column } from '../domain';
import { DraggableArea } from '../../Draggable/ui';
import { AddCard } from './AddCard';
import { useKanbanStore } from '../application';
import { noop } from '../../shared/util';

export class KanbanColumn extends Component {
  private addCardButton: AddCard;
  private kanbanStore = useKanbanStore();
  private readonly cardService = new CardService();

  constructor(public root: Root, private column: Column) {
    super();
    this.render = this.render.bind(this);
    this.alignChildren();
    this.addCardButton = new AddCard(() => this.root().querySelector('.kanban-add-card-button-slot')!, {
      addCard: content => {
        if (!content) return;
        const card = Card.fromString(content);
        card.column = this.column.id;
        this.cardService
          .save(card)
          .then(() => this.kanbanStore.dispatch({ type: 'addCard', payload: { columnId: this.column.id, card } }))
          .catch(noop);
      },
    });
  }

  public alignChildren(): void {
    this.children = this.column.cards.map(
      (card, index) =>
        new DraggableArea(
          new KanbanCard(() => this.root().querySelector(`.kanban-card-slot:nth-child(${index + 1})`)!, card)
        )
    );
    this.children.push(this.addCardButton);
  }

  public template(): string {
    const cardSlot = `<li class="kanban-card-slot"></li>`.repeat(this.column.cards.length);
    const empty = `
      <li class="kanban-card-empty">
        <p>No cards available</p>
      </li>
    `;
    return `
      <article class="kanban-column" aria-role="listitem">
        <h2 class="kanban-column-title">${this.column.name}</h2>
        <div class="kanban-add-card-button-slot"></div>
        <div class="kanban-column-scrollbox">
          <ul class="kanban-card-wrapper">
            ${this.column.cards.length ? cardSlot : empty}
          </ul>
        </div>
      </article>
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
.kanban-column {
  height: inherit;
}

.kanban-card-empty {
  width: 100%;
  height: 80px;
  font-size: 0.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.kanban-column-title {
  background-color: #181818;
  font-weight: 600;
  font-size: 1.25rem;
  padding-bottom: 0.5rem;
}

.kanban-column-scrollbox {
  width: 250px;
  height: calc(100% - 2.5rem);
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
}

.kanban-card-wrapper {
  padding: 0.5rem;
  background-color: #282828;
  border-radius: 0.5rem;
}
`;
