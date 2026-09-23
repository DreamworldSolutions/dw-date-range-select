import { html, css } from '@dreamworld/pwa-helpers/lit.js';
import { DwCompositeDialog } from '@dreamworld/dw-dialog/dw-composite-dialog.js';

import '@dreamworld/dw-button';
import '@dreamworld/dw-input/dw-input.js';
import DeviceInfo from '@dreamworld/device-info';

/**
 * Collects an age window expressed in days, e.g. "45 - 120 Days".
 *
 * ## Behaviour
 * - Only whole, non-negative numbers can be entered; decimals, minus signs and letters are rejected as
 *   the user types, and stripped out of pasted text.
 * - `Apply` stays disabled until both fields hold a value and `From <= To`.
 * - When `From > To` an inline error is shown under the `From` field. The text comes from the
 *   consumer through `errorMessages.fromGreaterThanTo`, so this element stays language-agnostic.
 * - `From == To` is valid and yields a single day's age. There is no upper bound.
 * - Renders as a modal on the `small` layout and as a popover otherwise.
 *
 * ## Events
 *  - `change` Fired on a valid Apply, with `{ daysFrom, daysTo }` in its detail.
 *
 * ## Usage Pattern:
 *  - <dw-days-range-input-dialog .value=${{ daysFrom, daysTo }} @change="">
 *    </dw-days-range-input-dialog>
 */
export class DwDaysRangeInputDialog extends DwCompositeDialog {
  static get styles() {
    return [
      super.styles,
      css`
        :host([type='modal']) .mdc-dialog__title {
          padding: 0px;
        }

        :host([type='modal']) .mdc-dialog__title::before {
          display: none;
        }

        :host([type='modal']) .mdc-dialog .mdc-dialog__surface {
          min-width: 328px;
        }

        :host([type='modal']) .mdc-dialog__actions {
          padding-right: 24px;
          height: 48px;
        }

        /* The popover surface defaults to 280px, too narrow for two fields. */
        :host([type='popover']) {
          --dw-popover-width: auto;
          --dw-popover-min-width: 328px;
        }

        .header {
          font-weight: 500;
          font-size: 20px;
          line-height: 24px;
          letter-spacing: 0.15px;
        }

        :host([type='modal']) .header {
          display: flex;
          align-items: center;
          height: 64px;
          padding: 16px 16px 16px 24px;
          box-sizing: border-box;
          border-bottom: 1px solid var(--mdc-theme-divider-color);
        }

        /* The modal and popover templates name the content element differently. */
        .mdc-dialog__content,
        .dialog__content {
          display: flex;
          align-items: flex-start;
        }

        :host([type='modal']) .mdc-dialog__content {
          padding: 0 24px;
        }

        :host([type='modal'][layout='small']) .mdc-dialog__content {
          padding: 0 12px;
        }

        :host([type='popover']) .dialog__content {
          padding: 0 16px;
        }

        dw-input {
          padding: 21px 0 28px 0;
          flex: 1;
        }

        .separator {
          padding: 0 8px;
          align-self: center;
        }

        :host([dark-theme][type='modal']) .mdc-dialog .mdc-dialog__surface {
          box-shadow: none;
        }

        :host([type='modal']) .mdc-dialog footer {
          --dw-dialog-divider-color: transparent;
          gap: 8px;
        }

        /* The popover footer is a plain <footer>, so it needs its own action row. */
        :host([type='popover']) footer {
          display: flex;
          justify-content: flex-end;
          gap: 8px;
          padding-top: 0;
        }
      `,
    ];
  }

  static get properties() {
    return {
      /**
       * Applied days window. e.g. { daysFrom: 45, daysTo: 120 }
       * Pre-fills both fields when set.
       */
      value: { type: Object },

      /**
       * Error messages keyed by reason. This element reads `fromGreaterThanTo` only.
       */
      errorMessages: { type: Object },

      /**
       * Dialog title. Supplied by the consumer, as this element holds no language-specific text.
       */
      heading: { type: String },

      /**
       * Label of the `From` field.
       */
      fromLabel: { type: String },

      /**
       * Label of the `To` field.
       */
      toLabel: { type: String },

      /**
       * Label of the Cancel action. Falls back to English when the consumer supplies nothing.
       */
      cancelLabel: { type: String },

      /**
       * Label of the Apply action. Falls back to English when the consumer supplies nothing.
       */
      applyLabel: { type: String },

      /**
       * It's representing app's current theme is dark or not.
       */
      darkTheme: {
        type: Boolean,
        reflect: true,
        attribute: 'dark-theme',
      },

      _inputFrom: { type: String },

      _inputTo: { type: String },

      _invalid: { type: Boolean },

      /**
       * Represents current layout in String.
       * An Enum: possible values - `small`, `medium`, `large`, `hd` and `fullhd`
       */
      _layout: { type: String, reflect: true, attribute: 'layout' },
    };
  }

  constructor() {
    super();
    this.errorMessages = {};
    this.autoFocusSelector = '#from-days';
    this._inputFrom = '';
    this._inputTo = '';
    this._invalid = false;
    // `dw-input` re-reads `error` on every render, so keep the identity stable.
    this._validateFrom = this._validateFrom.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    // Fall back to the device's layout when the consumer does not bind one.
    this._layout = this._layout || DeviceInfo.info().layout;
  }

  willUpdate(changedProps) {
    super.willUpdate(changedProps);

    if (changedProps.has('value')) {
      this._inputFrom = this._toInputText(this.value?.daysFrom);
      this._inputTo = this._toInputText(this.value?.daysTo);
    }

    if (changedProps.has('_inputFrom') || changedProps.has('_inputTo') || changedProps.has('value')) {
      const from = this._toDays(this._inputFrom);
      const to = this._toDays(this._inputTo);
      this._invalid = from !== undefined && to !== undefined && from > to;
    }
  }

  get _headerTemplate() {
    return html`<div class="header">${this.heading}</div>`;
  }

  get _contentTemplate() {
    return html`<dw-input
        id="from-days"
        .label=${this.fromLabel}
        .value=${this._inputFrom}
        allowedPattern="[0-9]"
        inputmode="numeric"
        .invalid=${this._invalid}
        .error=${this._validateFrom}
        .darkTheme=${this.darkTheme}
        @input=${this._onFromInput}
      ></dw-input>

      <div class="separator">-</div>

      <dw-input
        id="to-days"
        .label=${this.toLabel}
        .value=${this._inputTo}
        allowedPattern="[0-9]"
        inputmode="numeric"
        .darkTheme=${this.darkTheme}
        @input=${this._onToInput}
      ></dw-input>`;
  }

  get _footerTemplate() {
    return html`
      <dw-button @click=${this._onCancel}>${this.cancelLabel || 'Cancel'}</dw-button>
      <dw-button ?disabled=${!this._applyEnabled} @click=${this._onApply}>${this.applyLabel || 'Apply'}</dw-button>
    `;
  }

  get daysFromInput() {
    return this.renderRoot.querySelector('#from-days');
  }

  get daysToInput() {
    return this.renderRoot.querySelector('#to-days');
  }

  // Apply needs both fields filled and a window that isn't inverted.
  get _applyEnabled() {
    return this._toDays(this._inputFrom) !== undefined && this._toDays(this._inputTo) !== undefined && !this._invalid;
  }

  /**
   * Lays the fields out and focuses the first. The popover never calls `_setFocusToElement`, and MDC
   * measures the fields while still hidden.
   * @override
   */
  _onDialogOpened(e) {
    super._onDialogOpened && super._onDialogOpened(e);
    this.daysFromInput && this.daysFromInput.layout && this.daysFromInput.layout();
    this.daysToInput && this.daysToInput.layout && this.daysToInput.layout();
    this.daysFromInput && this.daysFromInput.focus && this.daysFromInput.focus();
  }

  // Read as a function, so the message is re-derived on every validation pass.
  _validateFrom() {
    return this._invalid ? this.errorMessages?.fromGreaterThanTo : '';
  }

  // Only a whole non-negative number is a day count.
  _toDays(value) {
    return /^\d+$/.test(value === undefined || value === null ? '' : String(value)) ? Number(value) : undefined;
  }

  // Avoids rendering "undefined" when no value is bound.
  _toInputText(days) {
    return days === undefined || days === null ? '' : String(days);
  }

  /**
   * `allowedPattern` guards keystrokes but lets pasted text through if it has a digit, so strip it here.
   */
  _sanitize(inputEl) {
    const sanitized = (inputEl?.value || '').replace(/\D/g, '');
    if (inputEl && inputEl.value !== sanitized) {
      inputEl.value = sanitized;
    }
    return sanitized;
  }

  _onFromInput(e) {
    this._inputFrom = this._sanitize(e?.target);
  }

  _onToInput(e) {
    this._inputTo = this._sanitize(e?.target);
  }

  _onCancel() {
    this.close();
  }

  _onApply() {
    if (!this._applyEnabled) {
      return;
    }

    const daysFrom = this._toDays(this._inputFrom);
    const daysTo = this._toDays(this._inputTo);

    this.value = { daysFrom, daysTo };
    this.dispatchEvent(new CustomEvent('change', { detail: { daysFrom, daysTo } }));
    this.close();
  }
}

window.customElements.define('dw-days-range-input-dialog', DwDaysRangeInputDialog);
