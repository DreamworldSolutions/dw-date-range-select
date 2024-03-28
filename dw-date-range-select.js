import { html } from "@dreamworld/pwa-helpers/lit.js";
import { DwSelect } from "@dreamworld/dw-select/dw-select.js";
import isEqual from "lodash-es/isEqual";

import * as _valueProvider from "./value-provider.js";
import * as _valueProviderFactory from "./value-provider-factory.js";

/**
 * Date range input control is used to input a custom duration.
 *
 * ## Behaviour
 * - It overrides all the beahviors of dw-select input control.
 * - Default Input
 *  - Dates to render “Last 12 months” are set in End date and Start date.
 * - Pre - set input
 *  - Always opens the calendar view by default.
 *  - Shows the dates in as secondary detail in respective tabs.
 * - Reopen
 *  - When custom date range is set, opens view for selecting duration. This means default list of duration is not presented.
 * - Disable Date in Calendar
 *  - Based on start date, End date is validated.
 *    - In calendar view, Dates before the start date are disabled.
 *    - In Edit view, shows error when End date is less than start date.
 * - Switching Tabs
 *  - When Date is selected auto switches to the empty tab.
 *  - If Date is selected from Calendar view, switches to the calendar view of empty tab. And If Date is given through EDIT view, switches to the EDIT view of empty tab.
 * - Date selection
 *  - On selecting a date, switches to next tab.
 *  - Selection for both the dates is compulsory. As a result, when user skip to add any date switches to the empty tab. e.g.  User skip “From date” and manually moves to “To date”, on selecting date the control moves to the “From date”.
 * - Close
 *  - When both dates are available, the sheet having calendar view gets automatically closed.
 * - Validation
 *  - Validate the “start” and “end” dates.
 *  - While inputting the dates using EDIT, shows error in “End date” when “start” date is greater than “end” date and vice versa.
 *  - In Calendar view, such case does not happen as the respective dates are disabled.
 *    - Dates less than “start” date are disable for “END date” selection.
 *    - Dates greater than “end” date are disable for “START date” selection.
 */

export class DwDateRangeSelect extends DwSelect {
  constructor() {
    super();
    this._onDateRangeSelected = this._onDateRangeSelected.bind(this);
    this.valueTextProvider = (item) => item.label;
    this.valueEquator = (v1, v2) => {
      if (!v1 && !v2) {
        return v1 === v2;
      }
    
      if (v1 && v2 && v1.hasOwnProperty("valueProvider") && v2.hasOwnProperty("valueProvider")) {
        return isEqual(v1.valueProvider(), v2.valueProvider());
      }
      if (v1 && v1.hasOwnProperty("valueProvider")) {
        return isEqual(v1.valueProvider(), v2);
      }
      return isEqual(v1, v2);
    };
  }

  get _dialogTemplate() {
    return html`
      ${super._dialogTemplate}
      ${this.dateRangePickerTemplate}
      ${this.dateRangeInputDialogTemplate}
    `;
  }

  get dateRangeInputDialogTemplate() {
    return html`
      <dw-date-input-dialog
        date-picker="false"
        .type=${"modal"}
        .placement=${'center'}
        .inputFormat="${this.inputFormat}"
        .valueFormat=${this.valueFormat}
        .dateRepresentationFormat="${this.dateRepresentationFormat}"
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
        .value="${this.value}"
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
        .errorMessages="${this._errorMessages}"
        @dw-dialog-closed=${(e) => this._triggerDateInputDialogOpenedChanged(false)}
        @dw-dialog-opened=${(e) => this._triggerDateInputDialogOpenedChanged(true)}
        @mode-changed=${this._onDateInputDialogModeChanged}
        @change=${this._onChange}
      >
      </dw-date-input-dialog>
    `;
  }

  get dateRangePickerTemplate() {
    return html`
      <dw-date-picker
        date-picker="false"
        .type=${this.mobileMode ? "modal" : "popover"}
        .popoverAnimation=${"expand"}
        .placement=${'bottom'}
        .mobileMode=${this.mobileMode}
        .tabletMode=${this.tabletMode}
        .showTrigger=${true}
        .appendTo=${this.appendTo}
        .zIndex=${this.zIndex}
        .value=${this.value}
        .minDate="${this.minDate}"
        .maxDate="${this.maxDate}"
        .inputFormat=${this.inputFormat}
        .valueFormat=${this.valueFormat}
        .dateRepresentationFormat="${this.dateRepresentationFormat}"
        .triggerElement=${this.triggerElement}
        @dw-dialog-closed=${(e) => this._triggerDatePickerOpenedChanged(false)}
        @dw-dialog-opened=${(e) => this._triggerDatePickerOpenedChanged(true)}
        @mode-changed=${this._onDatePickerModeChanged}
        @change=${this._onDatePickerValueChanged}
      >
      </dw-date-picker>
    `;
  }

  get datePicker() {
    return this.renderRoot.querySelector("dw-date-picker");
  }

  get dateInputDialog() {
    return this.renderRoot.querySelector("dw-date-input-dialog");
  }

  async _onSelect(e) {
    const value = this.value;
    const selectedItem = e.detail;
    this.value = this._valueProvider(selectedItem);
    this._selectedValueText = this._getValue(selectedItem);
    if (!this._vkb && typeof this._triggerElement?.focus === 'function') {
      this._triggerElement.focus();
    }
    this._query = undefined;
    await this.updateComplete;

    this.reportValidity();
    
    //TODO: this function called only when showCustomRange this is not fount or false
    //Otherwise: open date range select dialog.
    // this._dispatchSelected(value);
  }

  _triggerDateInputDialogOpenedChanged(opened) {
    this.dispatchEvent(
      new CustomEvent("date-range-input-dialog-opened-changed", {
        detail: {
          opened,
        },
      })
    );
  }

  _triggerDatePickerOpenedChanged(opened) {
    this.dispatchEvent(
      new CustomEvent("date-range-picker-opened-changed", {
        detail: {
          opened,
        },
      })
    );
  }

  _onDatePickerModeChanged(e) {
    if (this.dateInputDialog) {
      this.dateInputDialog.opened = true;
    }
  }

  _onDateInputDialogModeChanged(e) {
    if (this.datePicker) {
      this.datePicker.opened = true;
    }
  }
}

customElements.define("dw-date-range-select", DwDateRangeSelect);

export const valueProvider = _valueProvider;
export const valueProviderFactory = _valueProviderFactory;
