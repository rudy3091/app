import { useCalendarStore } from '../application';

export interface Action {
  readonly label: string;
  do(): void;
}

export class NextMonth implements Action {
  public readonly label = 'Next';
  public do(): void {
    console.log('Next month');
  }
}

export class PrevMonth implements Action {
  public readonly label = 'Prev';
  public do(): void {
    console.log('Prev month');
  }
}

export class GotoToday implements Action {
  public readonly label = 'Today';
  public do(): void {
    console.log('Today');
  }
}

export class ToggleListView implements Action {
  public readonly label = 'Toggle list view';
  private calendarStore = useCalendarStore();
  public do(): void {
    this.calendarStore.dispatch({ type: 'toggleListView' });
  }
}
