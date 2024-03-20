import { html, css } from "@dreamworld/pwa-helpers/lit.js";
import { DwCompositeDialog } from '@dreamworld/dw-dialog/dw-composite-dialog.js';

// Litepicker element
import 'litepicker/dist/litepicker';
import 'litepicker/dist/plugins/keyboardnav';
import 'litepicker/dist/plugins/mobilefriendly';

import dayjs from 'dayjs/esm/index.js';

import '@dreamworld/dw-icon-button';
import '@dreamworld/dw-button';
import './date-input';

/**
 * Providing a solution to select date.
 *
 * ## Events
 *  - `value-changed` Fire when user choose any date from calendar.
 *
 * ## Usage Pattern:
 *  - <dw-date-range-input-dialog value="" @value-changed="">
 *    </dw-date-range-input-dialog>
 */
export class DwDateRangeInputDialog extends DwCompositeDialog {
  static get styles() {
    return [
      super.styles,
      css`
        :host([type="modal"]) .mdc-dialog__title {
          padding: 0px;
        }

        :host([type="modal"]) .mdc-dialog__title::before {
          display: none;
        }

        :host([type="modal"]) .mdc-dialog .mdc-dialog__surface {
          min-width: 328px;
        }

        :host([type="modal"]) .mdc-dialog__actions {
          padding-right: 24px;
          height: 48px;
        }

        .header {
          height: 88px;
          padding: 16px 24px;
          box-sizing: border-box;
          border-bottom: 1px solid var(--mdc-theme-divider-color);
        }

        .header .day {
          font-weight: 400;
          font-size: 16px;
          line-height: 24px;
          letter-spacing: 0.15px;
        }

        .header .date {
          font-weight: 400;
          font-size: 24px;
          line-height: 32px;
          letter-spacing: 0.15px;
        }

        .header .date-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        date-input {
          padding: 16px 0px;
        }

        .date-container dw-icon-button {
          height: 32px;
          width: 32px;
        }
      `
    ]
  }

  static get properties() {
    return {
      /**
       * Current input value entered by user
       */
      value: { type: String },

      /**
       * The label for this element.
       */
      label: { type: String },

      /**
       * Set to true to disable this input.
       */
      disabled: { type: Boolean },

      /**
       * Set to true for input without label.
       */
      noLabel: { type: Boolean },

      /**
       * Set this to show input with helper text
       */
      hint: { type: String },

      /**
       * Always show the helper text despite focus.
       */
      hintPersistent: { type: Boolean },

      /**
       * Set to true to mark the input as required.
       */
      required: { type: Boolean },

      /**
       * A placeholder text in addition to the label.
       */
      placeholder: { type: String },

      /**
       * The error message to display when the input is invalid.
       */
      errorMessages: { type: Object },

      /**
       * Set to true to make input field readonly.
       */
      readOnly: { type: Boolean },

      /**
       * True if the last call to `reportValidity` is invalid.
       */
      invalid: { type: Boolean },

      /**
       * The minimum allowed date (inclusively).
       */
      minDate: { type: String },

      /**
       * The maximum allowed date (inclusively).
       */
      maxDate: { type: String },

      /**
       * Set to true to auto-select text on focus
       */
      autoSelect: { type: Boolean },

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
       * Set to true to make it dense
       */
      dense: { type: Boolean },

      /**
       * A string which used to check whether user has updated value or not
       * When `originalValue` and `value` is different input style is changed
       */
      originalValue: { type: String },

      /**
       * Set to true to highLight textfield when value is changed
       * Make sure to provide `originalValue` when setting this to true
       * It will highLight field when `value` and `originalValue` is not same
       */
      highlightChanged: { type: Boolean },

      /**
       * Input property.
       * `true` if when to show hint text in oneline. Default hint text is shown in dropdown width area in multiline.
       */
      noHintWrap: { type: Boolean, reflect: true },

      /**
       * Input property
       * It could be either `String` or `Function`.
       */
      error: { type: Object },

      /**
       * Input property.
       * Set `true` to show error message when user selects future date.
       */
      showFutureError: { type: Boolean, reflect: true },

      /**
       * Input property.
       * Set `true` to enable warning when user enters future date.
       * Note: Error has high priority so when error message is displayed, this warning will not be displayed
       */
      showFutureWarning: { type: Boolean, reflect: true },

      /**
       * Input property.
       * Text to show the warning message.
       * It could be either `String` or `Function`.
       */
      warning: { type: Object },

      /**
       * Whether to show hint in tooltip
       * tip trigger on hover of info, warning, and error icon button at trail.
       */
      hintInTooltip: { type: Boolean },

      /**
       * Whether to show error in tooltip
       * tip trigger on hover of info, warning, and error icon button at trail.
       */
      errorInTooltip: { type: Boolean },

      /**
       * Whether to show warning in tooltip
       * tip trigger on hover of info, warning, and error icon button at trail.
       */
      warningInTooltip: { type: Boolean },

      /**
       * Tooltip actions for hint text
       */
      hintTooltipActions: { type: Array },

      /**
       * Tooltip actions for error text
       */
      errorTooltipActions: { type: Array },

      /**
       * Tooltip actions for warning text
       */
      warningTooltipActions: { type: Array },

      /**
       * Tooltip placement
       * for more see tippyJs doc: https://atomiks.github.io/tippyjs/v6/all-props/#placement
       */
      tipPlacement: { type: String },
    }
  }

  /**
   * Getter of `inputFormat` property.
   */
  get inputFormat() {
    return this._inputFormat && this._inputFormat.toUpperCase() || this._inputFormat;
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
    this.requestUpdate("inputFormat", oldValue);
  }

  /**
   * Getter of `valueFormat` property.
   */
  get valueFormat() {
    return this._valueFormat && this._valueFormat.toUpperCase() || this._valueFormat;
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
    this.requestUpdate("valueFormat", oldValue);
  }

  constructor() {
    super();
    this.autoFocusSelector = 'date-input';
  }

  willUpdate(changedProps){
    super.willUpdate(changedProps);
    if (changedProps.has("inputFormat")) {
      this.separator = this.inputFormat ? this.inputFormat.slice(2, 3): '/';
    }
  }

  get _headerTemplate() {
    return html`
      <div class="header" date-picker="false">
        <div class="day">${this._getDayText()}</div>
        <div class="date-container">
          <div class="date">${this._getDateText()}</div>
          <dw-icon-button date-picker="false" .buttonSize=${32} @click=${this._onIconClick} .icon=${'date_range'}></dw-icon-button>
        </div>
      </div>
    `;
  }

  get _contentTemplate() {
    return html`
        <date-input
          .inputFormat="${this.inputFormat}"
          .valueFormat=${this.valueFormat}
          .label="${this.label}"
          ?disabled="${this.disabled}"
          .invalid=${this.invalid}
          ?noLabel="${this.noLabel}"
          ?required="${this.required}"
          ?readOnly="${this.readOnly}"
          ?autoSelect="${this.autoSelect}"
          ?dense="${this.dense}"
          ?hintPersistent="${this.hintPersistent}"
          .placeholder="${this.placeholder}"
          ?highlightChanged="${this.highlightChanged}"
          ?noHintWrap="${this.noHintWrap}"
          .date="${this.value}"
          .originalDate="${this.originalValue}"
          .name="${this.name}"
          .hint="${this.hint}"
          .minDate="${this.minDate}"
          .maxDate="${this.maxDate}"
          .showFutureWarning=${this.showFutureWarning}
          .showFutureError=${this.showFutureError}
          .warning=${this._warning}
          .error=${this._error}
          .hintInTooltip="${this.hintInTooltip}"
          .errorInTooltip="${this.errorInTooltip}"
          .warningInTooltip="${this.warningInTooltip}"
          .hintTooltipActions="${this.hintTooltipActions}"
          .errorTooltipActions="${this.errorTooltipActions}"
          .warningTooltipActions="${this.warningTooltipActions}"
          .tipPlacement="${this.tipPlacement}"
          .errorMessages="${this.errorMessages}"
          @change=${this._onChange}
        ></date-input>
      </div>
    `;
  }

  get dateInput() {
    return this.renderRoot.querySelector('date-input');
  }

  get _footerTemplate() {
    return html`
      <dw-button dismiss>Cancel</dw-button>
      <dw-button @click=${this._onApply}>Apply</dw-button>
    `;
  }

  _onChange(e) {
    if(e && e.target) {
      const dateInputed = dayjs(e.target.value, this.inputFormat);
      const date = dateInputed.isValid() ? dateInputed.format(this.valueFormat): "";
      this.value = date || this.value;
      this.validate();
    }
  }

  /**
   * Performs validatio of input
   * Returns true if validation is passedisValid
   */
  checkValidity() {
    return this.dateInput?.checkValidity();
  }

  /* Call this to perform validation of the date input */
  // TODO: remove this when `dw-form` elements are updated as per new specs.
  validate() {
    return this.reportValidity();
  }

  reportValidity() {
    return this.dateInput?.validate();
  }

  _onApply() {
    if(this.dateInput?.validate()) {
      this.value = this.dateInput?.value;
      this.dispatchEvent(new CustomEvent("change"));
      this.close();
    }
  }

  _onIconClick() {
    this.dispatchEvent(
      new CustomEvent('mode-changed', {
        detail: {
          mode: 'PICKER'
        },
      })
    );
    this.close();
  }

  _getDayText() {
    if(!this.value) {
      return 'Selected Day'
    }

    return dayjs(this.value).format('dddd');
  }

  _getDateText() {
    if(!this.value) {
      return 'Selected Date'
    }

    return this.formatDateText(dayjs(this.value, this.valueFormat).format(this.inputFormat));
  }

  formatDateText(value) {
    return value && value.replace(/ /g, "").split(`${this.separator}`).join(` ${this.separator} `);
  }
}

window.customElements.define('dw-date-range-input-dialog', DwDateRangeInputDialog);
