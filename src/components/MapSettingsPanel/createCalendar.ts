import 'flatpickr/dist/flatpickr.min.css';
import flatpickr from 'flatpickr';
// import rangePlugin from 'flatpickr/dist/plugins/rangePlugin';
import { Russian } from 'flatpickr/dist/l10n/ru.js';
import { DATE_RANGE_SELECT } from '../../constants';
import { daysBehindRange } from '../../utils/daysBehindRange';
import { debounce } from '../../../@nextgis/packages/utils/src';
export interface CreateCalendarOptions {
  maxDate?: Date;
  minDate?: Date;
  startDate?: Date;
  endDate?: Date;
  timedelta: number;
  onChange: (val: { start?: Date; end?: Date }) => void;
}

export function createCalendar(options: CreateCalendarOptions): HTMLElement {
  const { onChange, maxDate, minDate, startDate, endDate, timedelta } = options;
  const html = document.createElement('div');
  html.className = 'field is-horizontal';
  html.innerHTML = `
  <button class="button calendar-open calendar-control-btn is-small">
    <i class="fa fa-calendar" aria-hidden="true"></i>
  </button>
    <div class="field">
        <input class="input input-from is-small" type="text" >
    </div>

    <div class="select is-small">
      <select class="select-input">
        ${DATE_RANGE_SELECT.map((x) => {
          return `<option ${timedelta === x[0] ? 'selected' : ''} value=${
            x[0]
          }>${x[1]}</option>`;
        })}
      </select>
    </div>
    <button class="button calendar-clean calendar-control-btn is-small">✖</button>
    `;

  // <div class="field">
  //     <input class="input input-to is-small" type="text" >
  // </div>

  const select = html.querySelector('.select-input') as HTMLSelectElement;
  const inputFrom = html.querySelector('.input.input-from') as HTMLInputElement;
  const calendarCleanBtn = html.querySelector(
    '.calendar-clean',
  ) as HTMLButtonElement;
  const calendarOpenBtn = html.querySelector(
    '.calendar-open',
  ) as HTMLButtonElement;
  const today = new Date();

  const changeFunction = debounce((prop: { start: Date; end: Date }) => {
    if (prop.start && prop.end) {
      onChange(prop);
    }
  });

  const defaultDate = startDate && endDate ? [startDate, endDate] : undefined;

  const datepicker = flatpickr(inputFrom, {
    mode: 'range',
    locale: Russian,
    allowInput: true,
    maxDate: maxDate || today,
    minDate,
    defaultDate,
    // plugins: [rangePlugin({ input: inputTo })],
    onChange: ([start, end]) => {
      select.value = '';
      updateCleanBtnDisplay();
      changeFunction({ start, end });
    },
  });
  const updateCleanBtnDisplay = () => {
    calendarCleanBtn.style.display =
      Number(select.value) === timedelta ? 'none' : 'block';
  };
  updateCleanBtnDisplay();

  const setRange = (val: number) => {
    updateCleanBtnDisplay();
    const [start, end] = daysBehindRange(val, endDate);
    datepicker.setDate([start, end]);
    changeFunction({ start, end });
  };
  calendarOpenBtn.onclick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    datepicker.isOpen ? datepicker.close() : datepicker.open();
  };
  calendarCleanBtn.onclick = () => {
    select.value = String(timedelta);
    setRange(timedelta);
  };

  select.onchange = () => {
    updateCleanBtnDisplay();
    setRange(Number(select.value));
  };

  // calendar.on('select', () => {
  //   // const val = calendar.value(); // string - string
  //   onChange({ ...calendar.date });
  // });

  return html;
}
