import { CardDto, CardRepositoryAdapter, CardRepositoryAdapterImpl } from '../infrastructure';

export class Card {
  constructor(
    public readonly id: string,
    public title: string,
    public description: string,
    public stack: number,
    public column: string
  ) {}

  public static fromDto(dto: any) {
    return new Card(dto.id, dto.title, dto.description, dto.stack, dto.column);
  }

  public static fromString(str: string) {
    const sliced = str.split('\n');
    if (sliced[1] === '') {
      const [title, ...dscription] = sliced;
      return new Card('', title, dscription.join('\n').trimStart(), 0, '');
    }
    return new Card('', '', str, 0, '');
  }

  public toString() {
    return JSON.stringify(this);
  }

  public toDto(): CardDto {
    return {
      id: this.id === '' ? crypto.randomUUID() : this.id,
      title: this.title,
      description: this.description,
      stack: this.stack,
      column: this.column,
    };
  }
}

export class CardService {
  public readonly tableName = 'kanban-item';
  private readonly repository: CardRepositoryAdapter = new CardRepositoryAdapterImpl();

  public async save(card: Card) {
    await this.repository.save(card.toDto());
  }

  public async saveAll(entities: Card[]) {
    await this.repository.saveAll(entities.map(card => card.toDto()));
  }

  public async delete(card: Card) {
    await this.repository.delete(card);
  }

  public async find(id: string) {
    const card = await this.repository.find(id);
    return Card.fromDto(card);
  }

  public async findAll() {
    const cards = await this.repository.findAll();
    return cards.map(Card.fromDto);
  }

  public async findAllByColumnId(columnId: string) {
    const cards = await this.repository.findAllByColumnId(columnId);
    return cards.map(Card.fromDto);
  }
}
