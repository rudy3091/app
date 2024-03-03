import { Component } from '../../Component';

export class DraggableArea extends Component {
  constructor(private readonly component: Component, private readonly onDragStart?: (ev: DragEvent) => void) {
    super();
    this.dragStart = this.dragStart.bind(this);
    this.root = this.component.root;
    this.children = [this.component];
  }

  public template(): string {
    return this.component.template();
  }

  public dragStart(ev: DragEvent): void {
    this.onDragStart?.(ev);
    const target = ev.target as HTMLElement;
    const data = target.getAttribute('data-dragging-data') ?? '';
    ev.dataTransfer?.setData('text/plain', data);
  }

  public hydrate(): void {
    this.root().addEventListener('dragstart', this.dragStart);
  }

  public teardown(): void {
    this.root().removeEventListener('dragstart', this.dragStart);
  }
}
