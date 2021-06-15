import 'bulma-calendar/dist/css/bulma-calendar.css';
import bulmaCalendar from 'bulma-calendar';
import { subMonths } from 'date-fns';

export interface CreateCalendarOptions extends bulmaCalendar.Options {
  onChange: (val: { start?: Date; end?: Date }) => void;
}

export function createCalendar(options: CreateCalendarOptions): HTMLElement {
  const html = document.createElement('div');
  html.className = 'calendar__content';

  const input = document.createElement('input');
  input.setAttribute('type', 'date');
  html.appendChild(input);
  const today = new Date();

  const { onChange, ...opt } = options;

  const calendar = bulmaCalendar.attach(input, {
    isRange: true,
    lang: 'ru',
    startDate: subMonths(today, 1),
    endDate: today,
    maxDate: today,
    dateFormat: 'yyyy-MM-dd',
    displayMode: 'dialog',
    showTodayButton: false,
    cancelLabel: 'Закрыть',
    clearLabel: 'Сбросить',
    enableMonthSwitch: true,
    enableYearSwitch: false,
    ...opt,
  })[0];
  calendar.on('select', () => {
    // const val = calendar.value(); // string - string
    onChange({ ...calendar.date });
  });

  return html;
}
