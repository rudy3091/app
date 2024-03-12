import { Store } from '../../Store';

export interface CalendarState {
  year: number;
  month: number;
  showListView: boolean;
}

export type CalendarAction =
  | { type: 'toggleListView' }
  | { type: 'previousMonth' }
  | { type: 'nextMonth' }
  | { type: 'gotoToday' };

export const calendarStore = new Store<CalendarState, CalendarAction>(
  {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    showListView: false,
  },
  (state, action) => {
    switch (action.type) {
      case 'toggleListView':
        return { ...state, showListView: !state.showListView };
      case 'previousMonth':
        return {
          ...state,
          month: state.month === 1 ? 12 : state.month - 1,
          year: state.month === 1 ? state.year - 1 : state.year,
        };
      case 'nextMonth':
        return {
          ...state,
          month: state.month === 12 ? 1 : state.month + 1,
          year: state.month === 12 ? state.year + 1 : state.year,
        };
      case 'gotoToday':
        return { ...state, month: new Date().getMonth() + 1, year: new Date().getFullYear() };
    }
  }
);

export const useCalendarStore = () => calendarStore;
