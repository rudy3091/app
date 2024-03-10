import { Component, Root } from '../../Component';
import { bootstrapCss } from '../../shared';
import { useCalendarStore } from '../application';
import { Month, MonthService, Week } from '../domain';
import { Year } from '../domain/Year';
import { DayOfWeek } from '../domain/shared';
import { CalendarAction } from './CalendarAction';
import { CalendarListView } from './CalendarListView';
import { CalendarRow } from './CalendarRow';

type T = {
  date: Date;
  data: string;
};

export class Calendar extends Component {
  private year: Year<T>;
  private month: Month<T>;
  private calendarStore = useCalendarStore();
  private calendarAction = new CalendarAction(() => this.root().querySelector('.calendar-action-slot')!);
  private calendarListView = new CalendarListView<T>(() => this.root().querySelector('.calendar-list-slot')!);

  constructor(public root: Root, year: number, month: number) {
    super();
    this.year = new Year(year);
    this.month = new Month(month, this.year.isLeapYear());
    this.year.months.push(this.month);
    this.render = this.render.bind(this);
    this.alignChildren();
  }

  private constructWeeks(): Week<T>[] {
    const firstDay = this.month.getFirstDay();
    const lastDateOfMonth = this.month.lastDate();
    const formerMonthDays = new MonthService().getFormerMonth(this.month, this.year.number).lastDate();
    return new Array(6).fill(0).map((_, index) => {
      const firstDayOfWeek = index === 0 ? firstDay : DayOfWeek.Sunday;
      const firstDateOfWeek = index * 7 - firstDay + 1;
      return new Week<T>(index, firstDayOfWeek, firstDateOfWeek, lastDateOfMonth, formerMonthDays);
    });
  }

  public alignChildren(): void {
    if (this.calendarStore.state.showListView) {
      this.calendarListView.scope = this.year;
      this.children = [this.calendarAction, this.calendarListView];
      return;
    }

    if (this.month.weeks.length === 0) this.month.weeks = this.constructWeeks();

    this.children = this.month.weeks.map(
      (week, index) =>
        new CalendarRow<T>(() => this.root().querySelector(`.calendar-row-slot:nth-child(${index + 1})`)!, week)
    );
    this.children.push(this.calendarAction);
  }

  template() {
    if (this.calendarStore.state.showListView) {
      return `
        <section class="calendar-section">
          <div class="calendar-title">
            <span></span>
            <div class="calendar-action-slot"></div>
          </div>
          <div class="calendar-body calendar-listview">
            <div class="calendar-list-slot"></div>
          </div>
        </section>
      `;
    }

    return `
      <section class="calendar-section">
        <div class="calendar-title">
          <span class="calendar-year-month">
            ${this.year.number} / ${this.month.number}
          </span>
          <div class="calendar-action-slot"></div>
        </div>
        <ul class="calendar-head">
          <li class="calendar-head-label calendar-head-sunday">Sun</li>
          <li class="calendar-head-label">Mon</li>
          <li class="calendar-head-label">Tue</li>
          <li class="calendar-head-label">Wed</li>
          <li class="calendar-head-label">Thu</li>
          <li class="calendar-head-label">Fri</li>
          <li class="calendar-head-label calendar-head-saturday">Sat</li>
        </ul>
        <div class="calendar-body">
          ${`<div class="calendar-row-slot"></div>`.repeat(6)}
        </div>
      </section>
    `;
  }

  public hydrate(): void {
    this.calendarStore.subscribe(this.render);
  }

  public teardown(): void {
    this.calendarStore.unsubscribe(this.render);
  }
}

bootstrapCss`
.calendar-section {
  width: 640px;
  height: 480px;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background-color: #181818;
  border-radius: 0.5rem;
}

.calendar-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.calendar-year-month {
  font-weight: 700;
}

.calendar-action-slot {
  position: relative;
  display: flex;
}

.calendar-head {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  padding-bottom: 0.5rem;
}

.calendar-body {
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  height: 100%;
}

.calendar-head-label {
  padding: 0 0.5rem;
  font-weight: 700;
  list-style: none;
}

.calendar-head-sunday {
  color: #ff5e5e;
}

.calendar-head-saturday {
  color: #5e5eff;
}

.calendar-body.calendar-listview {
  display: block;
}

.calendar-list-slot {
  height: 100%;
  overflow-y: scroll;
}
`;
