import { ColumnType } from './Column';

export interface ColumnParams {
  key: string;
  name: string;
  type?: ColumnType;
  width?: string;
}

export class ColumnMapper {
  constructor(private columns: ColumnParams[]) {}

  public getColumnNames(): string[] {
    return this.columns.map(c => c.name);
  }

  public getColumnKeys(): string[] {
    return this.columns.map(c => c.key);
  }

  public getColumnTypes(): ColumnType[] {
    return this.columns.map(c => c.type || ColumnType.Text);
  }

  public getColumnWidths(): string[] {
    return this.columns.map(c => c.width || 'auto');
  }

  public hideColumn(column: string): void {
    this.columns = this.columns.filter(c => c.key !== column);
  }
}
