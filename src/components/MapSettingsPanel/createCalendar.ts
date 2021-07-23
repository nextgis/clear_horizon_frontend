import 'flatpickr/dist/flatpickr.min.css';
import flatpickr from 'flatpickr';
import rangePlugin from 'flatpickr/dist/plugins/rangePlugin';
import { Russian } from 'flatpickr/dist/l10n/ru.js';
export interface CreateCalendarOptions {
  maxDate?: Date;
  minDate?: Date;
  startDate?: Date;
  endDate?: Date;
  onChange: (val: { start?: Date; end?: Date }) => void;
}

export function createCalendar(options: CreateCalendarOptions): HTMLElement {
  const html = document.createElement('div');
  html.className = 'field is-horizontal';
  html.innerHTML = `
    <div class="field">
        <input class="input input-from is-small" type="text" >
    </div>
    <div class="field">
        <input class="input input-to is-small" type="text" >
    </div>
    `;

  const inputFrom = html.querySelector('.input.input-from') as HTMLInputElement;
  const inputTo = html.querySelector('.input.input-to') as HTMLInputElement;
  const input = [inputFrom, inputTo];
  const { onChange, maxDate, minDate, startDate, endDate } = options;

  const today = new Date();

  const defaultDate = startDate && endDate ? [startDate, endDate] : undefined;

  flatpickr(input, {
    mode: 'range',
    locale: Russian,
    allowInput: true,
    maxDate: maxDate || today,
    minDate,
    defaultDate,
    plugins: [rangePlugin({ input: inputTo })],
    onChange: ([start, end]) => {
      onChange({ start, end });
    },
  });

  // calendar.on('select', () => {
  //   // const val = calendar.value(); // string - string
  //   onChange({ ...calendar.date });
  // });

  return html;
}
