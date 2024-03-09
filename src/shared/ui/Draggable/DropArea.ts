import { Component, IComponent } from '../../../Component';

export class DropArea extends Component {
  constructor(
    private readonly component: IComponent,
    private readonly onDrop?: (draggingId: string, dropId: string) => void
  ) {
    super();
    this.dragOver = this.dragOver.bind(this);
    this.drop = this.drop.bind(this);
    this.root = () => this.component.root();
    this.children = [this.component];
  }

  public template(): string {
    return this.component.template();
  }

  public dragOver(ev: DragEvent): void {
    ev.preventDefault();
  }

  public drop(ev: DragEvent): void {
    ev.preventDefault();
    const draggingId = ev.dataTransfer?.getData('text/plain') ?? '';
    const dropTarget = ev.target as HTMLElement;
    const dropId = dropTarget.closest('[data-dragging-data]')?.getAttribute('data-dragging-data') ?? '';
    this.onDrop?.(draggingId, dropId);
  }

  public hydrate(): void {
    this.root().addEventListener('dragover', this.dragOver);
    this.root().addEventListener('drop', this.drop);
  }

  public teardown(): void {
    this.root().removeEventListener('dragover', this.dragOver);
    this.root().removeEventListener('drop', this.drop);
  }
}
