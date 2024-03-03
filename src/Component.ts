export type Root = () => HTMLElement;

export interface IComponent {
  root(): HTMLElement;
  children?: IComponent[];
  template(): string;
  render(): void;
  hydrate(): void;
  teardown(): void;
}

export abstract class Component implements IComponent {
  root = () => document.body;
  children: IComponent[] = [];

  public abstract template(): string;

  public alignChildren() {}

  public render() {
    this.root().innerHTML = this.template();
    this.alignChildren();
    this.children.forEach(child => child.render());
    this.children.forEach(child => child.hydrate());
  }

  public hydrate() {}

  public teardown() {
    this.children.forEach(child => child.teardown());
  }
}

export interface ComponentConstructor {
  new (root: () => HTMLElement): Component;
}

export function mount(root: () => HTMLElement, Comp: ComponentConstructor) {
  const component = new Comp(root);
  component.render();
  component.hydrate();
}
