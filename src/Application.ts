import './style.ts';
import { Component, Root, mount } from './Component.ts';
import { KanbanBoard } from './Kanban/ui/index.ts';
import { bootstrapCss } from './shared.ts';

export class Application extends Component {
  public kanbanBoard: KanbanBoard;

  constructor(public root: Root) {
    super();
    this.kanbanBoard = new KanbanBoard(() => this.root().querySelector('.kanban-board-slot')!);
    this.children.push(this.kanbanBoard);
  }

  public template(): string {
    return `
      <div class="kanban-board-slot"></div>
    `;
  }
}

mount(() => document.body, Application);

bootstrapCss`
.kanban-board-slot {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: scroll;
}
`;
