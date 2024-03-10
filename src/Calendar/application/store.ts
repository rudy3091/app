import { Store } from '../../Store';

export interface CalendarState {
  showListView: boolean;
}

export type CalendarAction = { type: 'toggleListView' };

export const calendarStore = new Store<CalendarState, CalendarAction>(
  {
    showListView: false,
  },
  (state, action) => {
    switch (action.type) {
      case 'toggleListView':
        return { ...state, showListView: !state.showListView };
    }
  }
);

export const useCalendarStore = () => calendarStore;
