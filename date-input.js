import { css } from '@dreamworld/pwa-helpers/lit.js';
import { DwInput } from "@dreamworld/dw-input/dw-input";
import { dateParse } from "./date-parse";
import dayjs from 'dayjs/esm/index.js';
import customParseFormat from 'dayjs/esm/plugin/customParseFormat';
import isSameOrAfter from 'dayjs/esm/plugin/isSameOrAfter'
dayjs.extend(customParseFormat);
dayjs.extend(isSameOrAfter);

export class DateInput extends DwInput {
  static get styles() {
    return [
      super.styles,
      css`
        :host([readonly]) {
          --dw-input-outlined-idle-border-color: var(--mdc-theme-divider-color);
        }

        .mdc-text-field--focused:not(.mdc-text-field--invalid):not(.mdc-text-field--disabled) {
          --dw-icon-color: var(--mdc-theme-primary);
        }

        .mdc-text-field--with-leading-icon.mdc-text-field--dense .mdc-text-field__icon, 
        .mdc-text-field--with-trailing-icon.mdc-text-field--dense .mdc-text-field__icon {
          transform: scale(1);
          right: 4px;
          top: 4px;
        }

        .mdc-text-field--outlined .mdc-text-field__input {
          padding: var(--dw-date-input-padding, 12px 16px 14px);
        }
      `
    ]
  }
  static get properties() {
    return {

      date: { type: String },

      originalDate: { type: String },

      /**
       * Prefered date input format
       * It should be `dd/mm/yyyy` or `mm/dd/yyyy` or `dd-mm-yyyy` or `mm-dd-yyyy`
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
       * Set `true` to enable warning when user enters future date.
       * Note: Error has high priority so when error message is displayed, this warning will not be displayed
       */
      showFutureWarning: { type: Boolean, reflect: true },

      /**
       * Input property.
       * Set `true` to show error message when user select future date.
       */
      showFutureError: { type: Boolean, reflect: true }
    };
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
    this.clickableIcon = true;
    this.iconButtonSize = 40;
    this.iconSize = 20;
    this.inputFormat = "DD/MM/YYYY";
    this.valueFormat = "YYYY-MM-DD";
    this.separator = "/";
    this.showFutureError = false;
    this.showFutureWarning = false;
    this.autoSelect = true;
    this._onBlur = this._onBlur.bind(this);
    this.addEventListener("enter", this._onEnter);
    this.addEventListener("paste", this._onPaste);
    this.addEventListener("blur", this._onBlur);
    this.addEventListener("input-blur", this._onBlur);
  }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback();
    this.originalValue = this.originalDate ? this.parseValue(dayjs(this.originalDate, this.valueFormat).format(this.inputFormat)) : '';
    this.updateComplete.then(() => {
      this._updateDateTextfieldValue();
    });
  }

  willUpdate(changedProps){
    super.willUpdate(changedProps);
    if (changedProps.has("inputFormat")) {
      this.separator = this.inputFormat ? this.inputFormat.slice(2, 3): '/';
    }

    if(changedProps.has('date')){
      this.value = this.date ? this.parseValue(dayjs(this.date, this.valueFormat).format(this.inputFormat)) : '';
    }

    if(changedProps.has('originalDate')){
      this.originalValue = this.originalDate ? this.parseValue(dayjs(this.originalDate, this.valueFormat).format(this.inputFormat)) : '';
    }
  }

  updated(changedProps) {
    super.updated && super.updated(changedProps);
    if (changedProps.has('date')) {
      this._updateDateTextfieldValue();
    }
  }

  /**
   * Updates text-field's value based on the current value of `value` property.
   * It applies formatting.
   */
  _updateTextfieldValue() {
    this._updateDateTextfieldValue();
  }

  /**
   * Updates text-field's value based on the current value of `value` property.
   * It applies formatting.
   */
  _updateDateTextfieldValue() {
    if (!this._textFieldInstance) {
      return;
    }

    let text = this.formatDateText(this.value);
    this._textFieldInstance.value = text || '';
  }

  formatDateText() {
    return this.value && this.value.replace(/ /g, "").split(`${this.separator}`).join(` ${this.separator} `);
  }

  parseDateValue(value) {
    if (!value) {
      return "";
    }
    return dateParse(value, this.inputFormat);
  }

  /**
   * @returns {String} Warning message by state
   */
  _customWarning() {
    if(!this.date) {
      return "";
    }
    if (this.showFutureWarning) {
      if (!dayjs().isSameOrAfter(this.date, 'day')) {
        return "Future date is selected";
      } else {
        return "";
      }
    }
    return "";
  }

  /**
   * Performs date validations like required, minDate, maxDate, invalid
   * @param {String} value - date entered by value
   * @returns {Boolean} returns false if it's invalid
   */
  _customError() {
    let value = this.value ? this.value.replace(/ /g, "") : '';
    const inputFormat = this.inputFormat ? this.inputFormat : "DD/MM/YYYY";
    if(!value){
      return '';
    }

    if (!dayjs(value, inputFormat, true).isValid()) {
      return this._errorMessages["invalidDate"];
    }
    
    value = dayjs(value, inputFormat).format(this.valueFormat);
    let errorText;
    let minDate = this.minDate && dayjs(this.minDate).format(this.valueFormat);
    let maxDate = this.maxDate && dayjs(this.maxDate).format(this.valueFormat);

    if (this.maxDate && this.minDate && (value > maxDate || value < minDate)) {
      errorText = this._errorMessages["minMaxDate"];
      errorText = errorText.replace("{maxDate}", this.maxDate);
      errorText = errorText.replace("{minDate}", this.minDate);
      return errorText;
    }

    if (this.maxDate && value > maxDate) {
      errorText = this.errorMessages && this.errorMessages["maxDate"] || '';
      return errorText.replace("{maxDate}", this.maxDate);
    }

    if (this.minDate && value < minDate) {
      errorText = this.errorMessages && this.errorMessages["minDate"] || '';
      return errorText.replace("{minDate}", this.minDate);
    }

    const todayDate = dayjs().format(this.valueFormat);
    if (this.showFutureError && value > todayDate) {
      return this._errorMessages["showFutureError"];
    }

    return super._customError();
  }

  _onInput(e) {
    if (!this._textFieldInstance) {
      console.warn('dw-input: Somehow "_onInput" method is triggered after "disconnectedCallback"');
      return;
    }
    
    const value = this.parseValue(this._textFieldInstance.value, true);
    this.___dateInputValue = value;
  }

  /**
   * Invokes on input blur
   * Validates input value
   */
  _onInputBlur(e) {
    super._onInputBlur && super._onInputBlur(e);
    this._dispatchInputBlur(e);
  }

  _dispatchInputBlur(e) {
    const value = e?.target?.value || '';
    this.dispatchEvent(
      new CustomEvent('input-blur', {
        detail: { value, event: e },
      })
    );
  }

  _onEnter(e) {
    const inputValue = e?.detail?.value || this._getCurrentInputValue();
    const value = this.parseDateValue(inputValue);
    this.value = value || inputValue;
    this.validate();
    this._updateDateTextfieldValue();
    this.dispatchEvent(new CustomEvent("change"));
  }

  _onPaste(e) {
    e.preventDefault && e.preventDefault();
    const paste = (e.clipboardData || window.clipboardData).getData("text");
    const inputValue = paste || this._getCurrentInputValue();
    const value = this.parseDateValue(inputValue);
    this.value = value || paste;
    this.validate();
    this._updateDateTextfieldValue();
    this.dispatchEvent(new CustomEvent("change"));
  }

  _onBlur(e) {
    const inputValue = e?.target?.value || e?.detail?.value || this._getCurrentInputValue() || this.___dateInputValue;
    const value = this.parseDateValue(inputValue);
    this.value = value || inputValue;
    this.validate();
    this._updateDateTextfieldValue();
    this.dispatchEvent(new CustomEvent("change"));
  }

  _getCurrentInputValue() {
    return this._textFieldInstance?.value || this._textFieldInstance?.input?.value || '';
  }

  showTrailingIconRipple() {
    const icon = this?.renderRoot?.querySelector('#trailingIcon');
    if(icon) {
      icon?.__onStart();
      setTimeout(() => {
        icon?.__fadeOut();
      }, 250)
    }
  }

  get _warning() {
    if (this.invalid) return;

    let warningMsg = "";

    warningMsg = this._customWarning();

    if (warningMsg) {
      return warningMsg;
    }

    return super._warning;
  }
}

window.customElements.define("date-input", DateInput);
