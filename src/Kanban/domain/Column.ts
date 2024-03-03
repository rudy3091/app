import { Card } from './Card';
import { ColumnDto, ColumnRepositoryAdapter, ColumnRepositoryAdapterImpl } from '../infrastructure';

export class Column {
  public cards: Card[] = [];

  constructor(public readonly id: string, public name: string) {}

  public static fromDto(dto: any) {
    if (!dto.id || !dto.name) throw new Error('Invalid JSON');
    const column = new Column(dto.id, dto.name);
    column.cards = dto.cards
      .map((card: any) => new Card(card.id, card.title, card.description, card.stack, dto.id))
      .sort((a: Card, b: Card) => a.stack - b.stack);
    return column;
  }

  public hasCardWithId(id: string) {
    return this.cards.some(card => card.id === id);
  }

  public moveCardInColumn(from: number, to: number) {
    const [removed] = this.cards.splice(from, 1);
    this.cards.splice(to, 0, removed);
    this.cards.forEach((card, index) => (card.stack = index));
  }

  public moveCardToColumnByIndex(index: number, to: Column, targetIndex: number) {
    const [removed] = this.cards.splice(index, 1);
    removed.column = to.id;
    to.cards.splice(targetIndex, 0, removed);
    to.cards.forEach((card, index) => (card.stack = index));
  }

  public addCard(card: Card) {
    card.column = this.id;
    this.cards.push(card);
  }

  public deleteCard(id: string) {
    this.cards = this.cards.filter(card => card.id !== id);
  }

  public toString() {
    return JSON.stringify(this);
  }

  public toDto(): ColumnDto {
    return {
      id: this.id,
      name: this.name,
    };
  }
}

export class ColumnService {
  private readonly repository: ColumnRepositoryAdapter = new ColumnRepositoryAdapterImpl();

  public async save(column: Column) {
    await this.repository.save(column.toDto());
  }

  public async saveAll(columns: Column[]) {
    await this.repository.saveAll(columns.map(column => column.toDto()));
  }

  public async find(name: string) {
    const column = await this.repository.find(name);
    return Column.fromDto(column);
  }

  public async findAll() {
    const columns = await this.repository.findAll();
    return columns.map(Column.fromDto);
  }

  public async findAllWithCards() {
    const columns = await this.repository.findAllWithCards();
    return columns.map(column => ({
      ...column,
      cards: column.cards.map(Card.fromDto),
    }));
  }
}
