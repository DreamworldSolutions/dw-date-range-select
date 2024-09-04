import { html, css } from '@dreamworld/pwa-helpers/lit.js';
import { DwCompositeDialog } from '@dreamworld/dw-dialog/dw-composite-dialog.js';

// Litepicker element
import 'litepicker/dist/litepicker';
import 'litepicker/dist/plugins/keyboardnav';
import 'litepicker/dist/plugins/mobilefriendly';

import dayjs from 'dayjs/esm/index.js';
import datePickerStyle from './dw-date-range-picker-style.js';
import { subtitle1, headline5 } from '@hisab/ui-components/typography.js';

import '@dreamworld/dw-icon-button';
import '@dreamworld/dw-date-input/date-input.js';
import { currentYearFormat } from '@dreamworld/dw-date-input/constants.js';

/**
 * Providing a solution to select date.
 *
 * ## Events
 *  - `change` Fire when user choose any date from calendar.
 *
 * ## Usage Pattern:
 *  - <dw-date-range-picker value="" @change="">
 *    </dw-date-range-picker>
 */
export class DwDateRangePicker extends DwCompositeDialog {
  static get styles() {
    return [
      super.styles,
      datePickerStyle,
      css`
        :host {
          --dw-popover-width: 360px;
          --dw-popover-min-width: 360px;
          --dw-popover-border-radius: 18px;
          --litepicker-day-margin: 0px;
        }

        :host([type='modal']) .mdc-dialog {
          z-index: 100;
        }

        :host([type='modal']:not([has-footer]):not([custom-content-padding-applied])) .mdc-dialog .mdc-dialog__content {
          padding: 0px;
        }

        :host([type='modal']:not([has-footer])) .mdc-dialog.mdc-dialog--scrollable .mdc-dialog__surface {
          padding-bottom: 0px;
        }

        :host([type='modal']:not([has-header])) .mdc-dialog.mdc-dialog--scrollable .mdc-dialog__surface {
          padding-top: 0px;
        }

        .header {
          padding: 16px;
          box-sizing: border-box;
          border-bottom: 1px solid var(--mdc-theme-divider-color);
        }

        :host([mobile-mode]) .header {
          height: auto;
          padding: 24px 24px 16px 24px;
        }

        :host([mobile-mode]) .container {
          font-size: 24px;
          font-weight: 400;
          line-height: 32px;
        }

        :host([mobile-mode]) .container .title {
          color: var(--mdc-theme-text-disabled-on-background);
        }

        .range-title {
          ${subtitle1};
          color: var(--mdc-theme-text-secondary-on-background);
        }

        .date,
        .title {
          ${headline5};
        }

        .title {
          color: var(--mdc-theme-text-disabled-on-background);
        }

        .header .day {
          font-weight: 400;
          font-size: 16px;
          line-height: 24px;
          letter-spacing: 0.15px;
          color: var(--mdc-theme-text-secondary-on-surface);
        }

        .header .date {
          font-weight: 400;
          font-size: 24px;
          line-height: 32px;
          letter-spacing: 0.15px;
        }

        .header .container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        #popover_dialog__surface {
          overflow: hidden;
          border-radius: 18px;
        }

        #datepicker {
          display: flex;
          justify-content: center;
        }

        #dialog-content {
          overflow: hidden;
        }

        .pass {
          padding: 0 12px;
        }

        .litepicker .container__days .day-item {
          border-radius: 50%;
        }

        .litepicker .container__days .day-item.is-in-range {
          --litepicker-is-in-range-color: var(--hisab-activated-background-color);
        }

        :host(:not([mobile-mode])) .litepicker .container__days .day-item.is-in-range {
          padding: 4px 35px;
          --litepicker-day-margin: 4px 0;
        }

        .litepicker .container__months,
        .litepicker .container__months .month-item {
          width: 100%;
        }

        :host([mobile-mode]) .litepicker,
        :host([mobile-mode]) .litepicker .container__months,
        :host([mobile-mode]) .litepicker .container__months .month-item {
          width: 100%;
          max-width: 392px;
          box-sizing: border-box;
          padding: 0px;
        }

        :host([mobile-mode]) {
          --litepicker-day-width: calc(100% / 7);
          --litepicker-day-height: calc(100vw / 7);
          --litepicker-day-margin: 0px;
        }

        .litepicker .container__months .month-item-weekdays-row > div {
          height: 40px;
          width: 40px;
          padding: 4px 14px;
        }

        :host(:not([mobile-mode])) .container__days > div {
          --litepicker-day-width: 40px;
          --litepicker-day-margin: 4px 15px;
        }

        :host([mobile-mode]) .litepicker .container__days > div,
        :host([mobile-mode]) .litepicker .container__days > a {
          max-width: 53px;
          max-height: 56px;
          --litepicker-day-margin: 4px 0;
        }

        :host([mobile-mode]) .litepicker .container__months .month-item-weekdays-row > div {
          max-width: 53px;
          max-height: 48px;
        }

        :host([mobile-mode]) .litepicker .container__tooltip {
          display: none;
        }

        :host([mobile-mode]) #dialog-content {
          overflow-x: hidden;
        }

        .container .submit {
          height: 48px;
          width: 48px;
          padding-left: 12px;
          --dw-icon-color: var(--mdc-theme-primary);
        }

        :host([mobile-mode]) .container dw-icon-button {
          padding-left: 12px;
        }

        .date-container {
          display: flex;
          align-items: baseline;
        }

        .litepicker .container__days .day-item::before {
          background-color: var(--hisab-activated-background-color);
        }

        :host([mobile-mode]) .litepicker .container__days .day-item.is-start-date::before,
        :host([mobile-mode]) .litepicker .container__days .day-item.is-end-date::before {
          width: 53px;
          height: 53px;
          left: 0;
        }

        .litepicker .container__days .day-item.is-start-date::before {
          height: 40px;
          width: 55px;
          background-color: var(--hisab-activated-background-color);
          border-radius: 0;
          opacity: 1;
          border-top-left-radius: 28px;
          border-bottom-left-radius: 28px;
        }

        .litepicker .container__days .day-item.is-end-date::before {
          height: 40px;
          width: 55px;
          background-color: var(--hisab-activated-background-color);
          border-radius: 0;
          opacity: 1;
          border-top-right-radius: 28px;
          border-bottom-right-radius: 28px;
          left: -15px;
        }

        .litepicker .container__days .day-item.is-start-date.is-end-date::before {
          opacity: 0;
        }
      `,
    ];
  }

  constructor() {
    super();
    this._onSelected = this._onSelected.bind(this);
    this._onPreselect = this._onPreselect.bind(this);
    this.tabindex = -1;
  }

  static get properties() {
    return {
      /**
       * start and end date. e.g. { start: "2021-04-01", end: "2022-03-30" }
       */
      value: { type: Object },

      /**
       * preferred date input format
       * it should be `dd/mm/yyyy`(default) or `mm/dd/yyyy`
       */
      inputFormat: { type: String },

      /**
       * date value format
       * default `yyyy-mm-dd`.
       */
      valueFormat: { type: String },

      /**
       * Input property.
       * Display in mobile mode (full screen).
       */
      mobileMode: { type: Boolean, reflect: true, attribute: 'mobile-mode' },

      tabletMode: { type: Boolean, reflect: true, attribute: 'tablet-mode' },

      /**
       * Date represent format
       * default `dd mmm yyyy`
       */
      dateRepresentationFormat: { type: String },

      tabindex: { type: String, reflect: true },
    };
  }

  /**
   * Getter of `inputFormat` property.
   */
  get inputFormat() {
    return (this._inputFormat && this._inputFormat.toUpperCase()) || this._inputFormat;
  }

  /**
   * Setter of `inputFormat` property.
   */
  set inputFormat(value) {
    let oldValue = this._inputFormat;
    if (value === oldValue) {
      return;
    }
    this._inputFormat = value;
    this.requestUpdate('inputFormat', oldValue);
  }

  /**
   * Getter of `valueFormat` property.
   */
  get valueFormat() {
    return (this._valueFormat && this._valueFormat.toUpperCase()) || this._valueFormat;
  }

  /**
   * Setter of `valueFormat` property.
   */
  set valueFormat(value) {
    let oldValue = this._valueFormat;
    if (value === oldValue) {
      return;
    }
    this._valueFormat = value;
    this.requestUpdate('valueFormat', oldValue);
  }

  willUpdate(changedProps) {
    super.willUpdate(changedProps);
    if (changedProps.has('inputFormat')) {
      this.separator = this.inputFormat ? this.inputFormat.slice(2, 3) : '/';
    }
  }

  get _contentTemplate() {
    return html`
      <div>
        <div class="header" date-picker="false">
          <div class="range-title">Select Range</div>
          <div class="container">
            <div class="date-container">
              ${this.value?.start ? html`<div class="date">${this._getStartDateText()}</div>` : html` <div class="title">Start Date</div>`}

              <div class="pass">-</div>
              ${this.value?.end ? html`<div class="date">${this._getEndDateText()}</div>` : html` <div class="title">End Date</div>`}
            </div>

            <dw-icon-button date-picker="false" .iconFont=${'OUTLINED'} @click=${this._onIconClick} .icon=${'edit'}></dw-icon-button>
          </div>
        </div>
        <div id="datepicker" date-picker="false"></div>
      </div>
    `;
  }

  updated(changedProps) {
    super.updated && super.updated(changedProps);
    if (changedProps.has('value')) {
      this._setPickerDate();
    }

    if (changedProps.has('valueFormat')) {
      this._setOptions({ format: this.valueFormat });
    }
  }

  _onIconClick() {
    this.dispatchEvent(
      new CustomEvent('mode-changed', {
        detail: {
          mode: 'INPUT',
        },
      })
    );
    this.close();
  }

  _getStartDateText() {
    if (!this.value?.start) {
      return;
    }

    const format = this._dateFormat(this.value?.start);
    return dayjs(this.value?.start).format(format);
  }

  _getEndDateText() {
    if (!this.value?.end) {
      return;
    }

    const today = dayjs();
    const format = this._dateFormat(this.value?.end);

    return dayjs(this.value?.end).format(format);
  }

  _dateFormat(date) {
    if (!date) return;

    const today = dayjs();
    const representationFormat = this.dateRepresentationFormat || this.inputFormat;
    return today.year() === dayjs(date).year() ? currentYearFormat[representationFormat] : representationFormat;
  }

  /**
   * Creates a new easepicker instance and return it.
   */
  _create() {
    const element = this.renderRoot.querySelector('#datepicker');
    return new Litepicker({
      element: element,
      singleMode: false,
      allowRepick: false,
      autoApply: true,
      numberOfColumns: 1,
      numberOfMonths: 1,
      firstDay: 0,
      inlineMode: true,
      format: this.valueFormat,
      scrollToDate: true,
      selectForward: true,
      plugins: ['keyboardnav', 'mobilefriendly'],
      buttonText: {
        previousMonth:
          '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15.705 7.41L14.295 6L8.29504 12L14.295 18L15.705 16.59L11.125 12L15.705 7.41Z"/></svg>',
        nextMonth:
          '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9.70498 6L8.29498 7.41L12.875 12L8.29498 16.59L9.70498 18L15.705 12L9.70498 6Z"/></svg>',
      },
    });
  }

  _show() {
    if (!this._instance) {
      this._instance = this._create();
    }

    this._instance.on('selected', this._onSelected);
    this._instance.on('preselect', this._onPreselect);
    this._instance.show();
    this._setPickerDate();
  }

  _setPickerDate() {
    if (this.value && this.value.start && this.value.end && this._instance) {
      this._instance.setDateRange(this.value.start, this.value.end);
      this._goToDate(this.value.start);
    }
  }

  _goToDate(value) {
    if (value && this._instance) {
      this._instance.gotoDate(value);
    }
  }

  _setOptions(options) {
    if (options && this._instance) {
      this._instance.setOptions(options);
    }
  }

  _hide() {
    if (!this._instance) {
      return;
    }

    this._instance && this._instance.off('preselect', this._onPreselect);
    this._instance && this._instance.off('selected', this._onSelected);
    this._instance && this._instance.hide();
    this._instance && this._instance.destroy();
    this._instance = undefined;
  }

  _onPreselect(date1, date2) {
    const startDate = this.__getDateInValueFormat(date1);
    const endDate = this.__getDateInValueFormat(date2);

    this.value = { ...this.value, start: startDate, end: endDate };
    this._preselectValue = { start: startDate, end: endDate };
  }

  /**
   * Invoked when user choose date from calender.
   */
  _onSelected(date1, date2) {
    this._trigerValueChanged(date1, date2);
    if (!this.__isCurrentDate(date1, date2)) {
      this._preselectValue = {};
      this.close();
    }
  }

  __isCurrentDate(date1, date2) {
    const startDate = this.__getDateInValueFormat(date1);
    const endDate = this.__getDateInValueFormat(date2);
    if (this._preselectValue && this._preselectValue.start && this._preselectValue.end) {
      if (this._preselectValue.start === startDate && this._preselectValue.end === endDate) {
        return false;
      }
    }
    return startDate === this.value?.start && endDate === this.value?.end;
  }

  __getDateInValueFormat(date) {
    date = date && date.dateInstance ? date.dateInstance : date;
    return date ? dayjs(date).format(this.valueFormat) : null;
  }

  _trigerValueChanged(date1, date2) {
    const startDate = this.__getDateInValueFormat(date1);
    const endDate = this.__getDateInValueFormat(date2);

    if (this.__isCurrentDate(date1, date2)) {
      return;
    }

    if (!dayjs(startDate).isValid() || !dayjs(endDate).isValid()) {
      return;
    }

    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {
          start: startDate,
          end: endDate,
        },
      })
    );
  }

  /**
   * @Override
   */
  _onOpenedChanged(opened) {
    super._onOpenedChanged && super._onOpenedChanged(opened);
    opened ? this._show() : this._hide();
  }
}

window.customElements.define('dw-date-range-picker', DwDateRangePicker);
