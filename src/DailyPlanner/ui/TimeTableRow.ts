import { Component, Root } from '../../Component';
import { bootstrapCss } from '../../shared';
import { ColumnMapper } from '../domain/ColumnMapper';
import { TimeBlock } from '../domain/TimeBlock';
import { TableCell } from './TableCell';

export class TimeTableRow extends Component {
  private cells: TableCell[] = [];

  constructor(
    public root: Root,
    public timeBlock: TimeBlock,
    public columns: ColumnMapper,
    public onUpdate?: () => void
  ) {
    super();
    this.alignChildren();
    this.resetInputMode = this.resetInputMode.bind(this);
  }

  public resetInputMode(): void {
    this.cells.forEach(cell => (cell.isInputMode = false));
  }

  public alignChildren(): void {
    this.cells = this.columns.getColumnKeys().map(
      (key, index) =>
        new TableCell(
          () => this.root().querySelector(`.dp-table-cell-slot:nth-child(${index + 1})`)!,
          this.timeBlock.getByKey(key),
          content => {
            this.timeBlock.set(key, content);
            this.onUpdate?.();
          },
          this.resetInputMode
        )
    );
    this.children = this.cells;
  }

  public template(): string {
    return this.columns
      .getColumnKeys()
      .map(_ => `<td class="dp-table-cell-slot"></td>`)
      .join('');
  }
}

bootstrapCss`
.dp-table-cell-slot {
  padding: 0.5rem 1rem;
}
`;
