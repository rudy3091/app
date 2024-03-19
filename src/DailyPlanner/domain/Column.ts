export enum ColumnType {
  Text = 'text',
  Checkbox = 'checkbox',
}

export class Column {
  constructor(public readonly key: string, public readonly name: string, public readonly type = ColumnType.Text) {}
}
