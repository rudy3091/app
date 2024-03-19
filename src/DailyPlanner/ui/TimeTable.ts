import { Component, Root } from '../../Component';
import { TimeBlock, TimeBlockService } from '../domain/TimeBlock';
import { ColumnMapper, ColumnParams } from '../domain/ColumnMapper';
import { TimeTableRow } from './TimeTableRow';
import { bootstrapCss } from '../../shared';
import { Color } from '../../shared/application';

export class TimeTable extends Component {
  private columns: ColumnMapper;
  private readonly start: number = 9;
  private readonly end: number = 21;
  private blocks: TimeBlock[] = TimeBlockService.fromRange(this.start, this.end, '');

  constructor(public root: Root, columns: ColumnParams[]) {
    super();
    this.columns = new ColumnMapper(columns);
  }

  public resetBlocks(): void {
    this.blocks = TimeBlockService.fromRange(this.start, this.end, '');
  }

  public alignChildren(): void {
    this.children = this.blocks.map(
      (block, index) =>
        new TimeTableRow(
          () => this.root().querySelector(`.dp-table-row-slot:nth-child(${index + 1})`)!,
          block,
          this.columns,
          () => TimeBlockService.save(this.blocks)
        )
    );
  }

  public template() {
    return `
      <table class="dp-table">
        <colgroup>
          ${this.columns
            .getColumnWidths()
            .map(width => `<col style="width: ${width}" />`)
            .join('')}
        </colgroup>

        <thead class="dp-thead">
          <tr>
            ${this.columns
              .getColumnNames()
              .map(column => `<th>${column}</th>`)
              .join('')}
          </tr>
        </thead>

        <tbody class="dp-tbody">
          ${`<tr class="dp-table-row-slot"></tr>`.repeat(this.blocks.length)}
        </tbody>
      </table>
    `;
  }
}

bootstrapCss`
.dp-table {
  width: 100%;
  border-collapse: collapse;
}

.dp-thead {
  text-align: left;
  border-bottom: 1px solid ${Color.Gray100};
}

.dp-thead th {
  padding: 0.5rem 1rem;
}
`;
