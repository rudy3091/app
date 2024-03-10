import { Component, Root } from '../../Component';
import { bootstrapCss } from '../../shared';
import { Month, MonthService, Week } from '../domain';
import { Year } from '../domain/Year';
import { DayOfWeek } from '../domain/shared';
import { CalendarRow } from './CalendarRow';

export class Calendar<T> extends Component {
  private year: Year<T>;
  private month: Month<T>;

  constructor(public root: Root, year: number, month: number) {
    super();
    this.year = new Year(year);
    this.month = new Month(month, this.year.isLeapYear());
    this.alignChildren();
  }

  public alignChildren(): void {
    const firstDay = this.month.getFirstDay();
    const lastDateOfMonth = this.month.lastDate();
    const formerMonthDays = new MonthService().getFormerMonth(this.month, this.year.number).lastDate();
    this.children = new Array(6).fill(0).map((_, index) => {
      const firstDayOfWeek = index === 0 ? firstDay : DayOfWeek.Sunday;
      const firstDateOfWeek = index * 7 - firstDay + 1;
      return new CalendarRow(
        () => this.root().querySelector(`.calendar-row-slot:nth-child(${index + 1})`)!,
        new Week(index, firstDayOfWeek, firstDateOfWeek, lastDateOfMonth, formerMonthDays)
      );
    });
  }

  template() {
    return `
      <section class="calendar-section">
        <div class="calendar-title">${this.year.number} / ${this.month.number}</div>
        <div class="calendar-head">
          <span class="calendar-head-label calendar-head-sunday">Sun</span>
          <span class="calendar-head-label">Mon</span>
          <span class="calendar-head-label">Tue</span>
          <span class="calendar-head-label">Wed</span>
          <span class="calendar-head-label">Thu</span>
          <span class="calendar-head-label">Fri</span>
          <span class="calendar-head-label calendar-head-saturday">Sat</span>
        </div>
        <div class="calendar-body">
          ${`<div class="calendar-row-slot"></div>`.repeat(this.children.length)}
        </div>
      </section>
    `;
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
  font-weight: 700;
  margin-bottom: 0.5rem;
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
}

.calendar-head-sunday {
  color: #ff5e5e;
}

.calendar-head-saturday {
  color: #5e5eff;
}
`;
