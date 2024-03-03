export interface CardDto {
  id: string;
  title?: string;
  description: string;
  column: string;
  stack: number;
}

export interface ColumnDto {
  id: string;
  name: string;
}
