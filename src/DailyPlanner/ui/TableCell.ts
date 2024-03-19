import { Component, Root } from '../../Component';
import { bootstrapCss } from '../../shared';
import { Color } from '../../shared/application';

export class TableCell extends Component {
  public isInputMode: boolean = false;

  constructor(
    public root: Root,
    public content: string,
    public readonly onEdit: (content: string) => void,
    public readonly resetInputMode: () => void
  ) {
    super();
    this.toggleInputMode = this.toggleInputMode.bind(this);
    this.submit = this.submit.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }

  public template(): string {
    return `
      <div class="dp-table-cell-content">
        ${this.isInputMode ? `<input class="dp-table-cell-input" value="${this.content}" />` : this.content}
      </div>
    `;
  }

  public toggleInputMode(): void {
    this.isInputMode = !this.isInputMode;
    this.render();
    const input = this.root().querySelector('.dp-table-cell-input') as HTMLInputElement;
    if (!input) return;
    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);
  }

  public submit(): void {
    const input = this.root().querySelector('.dp-table-cell-input') as HTMLInputElement;
    if (!input || this.content === input.value) return;
    this.content = input.value;
    this.toggleInputMode();
    this.onEdit(this.content);
    this.resetInputMode();
  }

  public handleEnter(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.submit();
      this.resetInputMode();
    }
  }

  public hydrate(): void {
    this.root().addEventListener('click', this.toggleInputMode);
    this.root().addEventListener('keydown', this.handleEnter);
    this.root().addEventListener('focusout', this.submit);
  }

  public teardown(): void {
    this.root().removeEventListener('click', this.toggleInputMode);
    this.root().removeEventListener('keydown', this.handleEnter);
    this.root().removeEventListener('focusout', this.submit);
  }
}

bootstrapCss`
.dp-table-cell-content {
  min-height: 2.5rem;
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  cursor: text;
}

.dp-table-cell-input {
  width: 100%;
  height: 100%;
  padding: 0.5rem 0;
  font-size: 0.9rem;
  border: none;
  border-bottom: 1px solid transparent;
  background-color: transparent;
  color: inherit;
  transition: border-color 0.2s ease-in-out;
}

.dp-table-cell-input:focus {
  border: none;
  border-bottom: 1px solid ${Color.Gray700};
  outline: none;
  font-family: inherit;
  font-size: 0.9rem;
}
`;
