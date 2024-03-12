import { useCalendarStore } from '../application';

export interface Action {
  readonly label: string;
  do(): void;
}

export class NextMonth implements Action {
  public readonly label = 'Next';
  private calendarStore = useCalendarStore();
  public do(): void {
    this.calendarStore.dispatch({ type: 'nextMonth' });
  }
}

export class PrevMonth implements Action {
  public readonly label = 'Prev';
  private calendarStore = useCalendarStore();
  public do(): void {
    this.calendarStore.dispatch({ type: 'previousMonth' });
  }
}

export class GotoToday implements Action {
  public readonly label = 'Today';
  private calendarStore = useCalendarStore();
  public do(): void {
    this.calendarStore.dispatch({ type: 'gotoToday' });
  }
}

export class ToggleListView implements Action {
  public readonly label = 'Toggle list view';
  private calendarStore = useCalendarStore();
  public do(): void {
    this.calendarStore.dispatch({ type: 'toggleListView' });
  }
}
