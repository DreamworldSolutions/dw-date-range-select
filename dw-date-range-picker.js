import { html, css } from '@dreamworld/pwa-helpers/lit.js';
import { DwCompositeDialog } from '@dreamworld/dw-dialog/dw-composite-dialog.js';

// Litepicker element
import 'litepicker/dist/litepicker';
import 'litepicker/dist/plugins/keyboardnav';
import 'litepicker/dist/plugins/mobilefriendly';

import dayjs from 'dayjs/esm/index.js';
import datePickerStyle from './dw-date-range-picker-style.js';

import '@dreamworld/dw-icon-button';
import '@dreamworld/dw-date-input';

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
          --dw-popover-min-width: 500px;
          --dw-popover-border-radius: 18px;
          --litepicker-day-margin: 0px;
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
          height: 88px;
          padding: 16px;
          box-sizing: border-box;
          border-bottom: 1px solid var(--mdc-theme-divider-color);
        }

        :host([mobile-mode]) .header {
          height: 96px;
          padding: 24px 24px 16px 24px;
        }

        :host([mobile-mode]) .container {
          font-size: 24px;
          font-weight: 400;
          line-height: 32px;
        }

        :host([mobile-mode]) .container .title {
          color: rgba(0, 0, 0, 0.38);
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

        .litepicker .container__days .day-item.is-end-date,
        .litepicker .container__days .day-item.is-start-date {
          color: var(--litepicker-is-start-color);
          background-color: blue;
          border-radius: 5%;
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

        .container__days > div {
          --litepicker-day-width: 70px;
          margin: 4px 0;
        }

        :host([mobile-mode]) .litepicker .container__days > div,
        :host([mobile-mode]) .litepicker .container__days > a {
          max-width: 53px;
          max-height: 56px;
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

        .container dw-icon-button {
          height: 48px;
          width: 48px;
          padding-left: 12px;
          --dw-icon-color: lightskyblue;
        }

        :host([mobile-mode]) .container dw-icon-button {
          height: 32px;
          width: 32px;
          padding-left: 12px;
        }

        .date-container {
          display: flex;
          align-items: center;
        }
      `,
    ];
  }

  constructor() {
    super();
    this._onSelected = this._onSelected.bind(this);
  }

  static get properties() {
    return {
      /**
       * start and end date. e.g. { start: "2021-04-01", end: "2022-03-30" }
       */
      value: { type: Object },

      /**
       * prefered date input format
       * it should be `dd/mm/yyyy`(default) or `mm/dd/yyyy`
       */
      inputFormat: { type: String },

      /**
       * date value format
       * default `yyyy-mm-dd`.
       */
      valueFormat: { type: String },

      /**
       * The minimum allowed date (inclusively).
       */
      minDate: { type: String },

      /**
       * The maximum allowed date (inclusively).
       */
      maxDate: { type: String },

      /**
       * Input property.
       * Display in mobile mode (full screen).
       */
      mobileMode: { type: Boolean, reflect: true, attribute: 'mobile-mode' },

      tabletMode: { type: Boolean, reflect: true, attribute: 'tablet-mode' },
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
          ${this.tabletMode || this.mobileMode ? html`<div>Select Range</div>` : ''}
          <div class="container">
            <div class="date-container">
              ${this.tabletMode || this.mobileMode
                ? html`${this.value?.start ? html`<div>${this._getStartDateText()}</div>` : html` <div class="title">Start Date</div>`}`
                : html` <dw-date-input label="Start date" .value=${this.value?.start} placeholder="DD / MM / YYYY"></dw-date-input>`}
              <div class="pass">-</div>
              ${this.tabletMode || this.mobileMode
                ? html`${this.value?.end ? html`<div>${this._getEndDateText()}</div>` : html` <div class="title">End Date</div>`}`
                : html` <dw-date-input label="End date" .value=${this.value?.end} placeholder="DD / MM / YYYY"></dw-date-input>`}
            </div>
            ${!this.tabletMode && !this.mobileMode
              ? html`
                  <dw-icon-button
                    date-picker="false"
                    .buttonSize=${48}
                    .iconSize=${32}
                    @click=${this._onIconClick}
                    .icon=${'arrow_circle_right'}
                  ></dw-icon-button>
                `
              : ''}
            ${this.tabletMode || this.mobileMode
              ? html`
                  <dw-icon-button
                    date-picker="false"
                    .iconFont=${'OUTLINED'}
                    .buttonSize=${24}
                    @click=${this._onIconClick}
                    .icon=${'edit'}
                  ></dw-icon-button>
                `
              : ''}
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

    if (changedProps.has('minDate')) {
      this._setOptions({ minDate: this.minDate || null });
      if (!this.value && this.minDate) {
        this._goToDate(this.minDate);
      }
    }

    if (changedProps.has('maxDate')) {
      this._setOptions({ maxDate: this.maxDate || null });
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

  _getDayText() {
    if (!this.value) {
      return 'Selected Day';
    }

    return dayjs(this.value).format('dddd');
  }

  _getStartDateText() {
    if (!this.value.start) {
      return;
    }

    return dayjs(this.value.start).format('DD MMM YYYY');
  }

  _getEndDateText() {
    if (!this.value.end) {
      return;
    }

    return dayjs(this.value.end).format('DD MMM YYYY');
  }

  formatDateText(value) {
    return value && value.replace(/ /g, '').split(`${this.separator}`).join(` ${this.separator} `);
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
      numberOfColumns: 1,
      numberOfMonths: 1,
      firstDay: 0,
      inlineMode: true,
      format: this.valueFormat,
      scrollToDate: true,
      minDate: this.minDate || null,
      maxDate: this.maxDate || null,
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
    this._instance.show();
    this._setPickerDate();
    if (!this.value && this.minDate) {
      this._goToDate(this.minDate);
    }
  }

  _setPickerDate() {
    if (this.value && this._instance) {
      this._instance.setDateRange(this.value);
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

    this._instance && this._instance.off('selected', this._onSelected);
    this._instance && this._instance.hide();
    this._instance && this._instance.destroy();
    this._instance = undefined;
  }

  /**
   * Invoked when user choose date from calender.
   */
  _onSelected(date1, date2) {
    this._trigerValueChanged(date1, date2);
    this.close();
  }

  _trigerValueChanged(date1, date2) {
    date2 = date2 && date2.dateInstance ? date2.dateInstance : date2;
    const startDate = date1 ? dayjs(date1).startOf('day').format(this.valueFormat) : null;
    const endDate = date2 ? dayjs(date2).endOf('day').format(this.valueFormat) : null;

    if (startDate === this.value.start && endDate === this.value.start) {
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
