import { Store } from '../../Store';
import { Card, Column } from '../domain';

export interface KanbanState {
  columns: Column[];
}

export type KanbanAction =
  | { type: 'columnsLoaded'; payload: unknown[] /* Column object in json format */ }
  | { type: 'moveCardInColumn'; payload: { from: number; to: number; column: Column } }
  | { type: 'moveCardOutsideColumn'; payload: { cardId: string; columnId: string } }
  | { type: 'addCard'; payload: { columnId: string; card: Card } }
  | { type: 'deleteCard'; payload: string }
  | { type: 'saveColumns' };

export const kanbanStore = new Store<KanbanState, KanbanAction>(
  {
    columns: [],
  },
  (state, action) => {
    switch (action.type) {
      case 'columnsLoaded':
        return { ...state, columns: action.payload.map((column: unknown) => Column.fromDto(column)) };

      case 'moveCardInColumn': {
        const { from, to, column } = action.payload;
        column.moveCardInColumn(from, to);
        return { ...state };
      }

      case 'moveCardOutsideColumn': {
        const { cardId, columnId } = action.payload;
        const fromColumn = state.columns.find(column => column.hasCardWithId(cardId))!;
        const from = fromColumn.cards.findIndex(card => card.id === cardId);
        const toColumn = state.columns.find(column => column.hasCardWithId(columnId))!;
        if (!toColumn /* dropped to empty column */) {
          const toColumn = state.columns.find(column => column.id === columnId)!;
          fromColumn.moveCardToColumnByIndex(from, toColumn, 0);
          return { ...state };
        }
        const to = toColumn.cards.findIndex(card => card.id === columnId);
        fromColumn.moveCardToColumnByIndex(from, toColumn, to);
        return { ...state };
      }

      case 'addCard': {
        const { columnId, card } = action.payload;
        const column = state.columns.find(column => column.id === columnId)!;
        column.addCard(card);
        return { ...state };
      }

      case 'deleteCard': {
        const cardId = action.payload;
        const column = state.columns.find(column => column.hasCardWithId(cardId))!;
        column.deleteCard(cardId);
        return { ...state };
      }

      case 'saveColumns':
        return { ...state };

      default:
        return state;
    }
  }
);

export const useKanbanStore = () => {
  return kanbanStore;
};
