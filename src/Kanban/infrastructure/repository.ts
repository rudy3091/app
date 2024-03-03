import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { CardDto, ColumnDto } from '.';

export const supabaseClient = createClient(
  import.meta.env.VITE_SUPABASE_URL as string,
  import.meta.env.VITE_SUPABASE_KEY as string,
  { auth: { storage: window.localStorage } }
);

export interface ColumnRepositoryAdapter {
  save(column: ColumnDto): Promise<void>;
  saveAll(columns: ColumnDto[]): Promise<void>;
  find(id: string): Promise<ColumnDto | null>;
  findAll(): Promise<ColumnDto[]>;
  findAllWithCards(): Promise<(ColumnDto & { cards: CardDto[] })[]>;
}

export class ColumnRepositoryAdapterImpl implements ColumnRepositoryAdapter {
  private client: SupabaseClient = supabaseClient;
  private readonly tableName = 'kanban-column';
  private readonly cardsTableName = 'kanban-card';

  public async save(column: ColumnDto) {
    const result = await this.client.from(this.tableName).upsert(column);
    if (result.error) throw result.error;
  }

  public async saveAll(columns: ColumnDto[]) {
    const result = await this.client.from(this.tableName).upsert(columns);
    if (result.error) throw result.error;
  }

  public async find(id: string) {
    const result = await this.client.from(this.tableName).select('*').eq('id', id);
    if (result.error) throw result.error;
    return result.data[0] as ColumnDto;
  }

  public async findAll() {
    const result = await this.client.from(this.tableName).select('*');
    if (result.error) throw result.error;
    return result.data as ColumnDto[];
  }

  public async findAllWithCards() {
    const result = await this.client.from(this.tableName).select(`
        id,
        name,
        cards: "${this.cardsTableName}" (*)
      `);
    if (result.error) throw result.error;
    return result.data as (ColumnDto & { cards: CardDto[] })[];
  }
}

export interface CardRepositoryAdapter {
  save(card: CardDto): Promise<void>;
  saveAll(cards: CardDto[]): Promise<void>;
  delete(card: CardDto): Promise<void>;
  find(id: string): Promise<CardDto | null>;
  findAll(): Promise<CardDto[]>;
  findAllByColumnId(columnId: string): Promise<CardDto[]>;
}

export class CardRepositoryAdapterImpl implements CardRepositoryAdapter {
  private client: SupabaseClient = supabaseClient;
  private readonly tableName = 'kanban-card';

  public async save(card: CardDto) {
    const result = await this.client.from(this.tableName).upsert(card);
    if (result.error) throw result.error;
  }

  public async saveAll(cards: CardDto[]) {
    const result = await this.client.from(this.tableName).upsert(cards);
    if (result.error) throw result.error;
  }

  public async delete(card: CardDto) {
    const result = await this.client.from(this.tableName).delete().eq('id', card.id);
    if (result.error) throw result.error;
  }

  public async find(id: string) {
    const result = await this.client.from(this.tableName).select('*').eq('id', id);
    if (result.error) throw result.error;
    return result.data[0] as CardDto;
  }

  public async findAll() {
    const result = await this.client.from(this.tableName).select('*').order('stack');
    if (result.error) throw result.error;
    return result.data as CardDto[];
  }

  public async findAllByColumnId(columnId: string) {
    const result = await this.client.from(this.tableName).select('*').eq('column', columnId);
    if (result.error) throw result.error;
    return result.data as CardDto[];
  }
}
