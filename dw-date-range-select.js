import { html } from '@dreamworld/pwa-helpers/lit.js';
import { DwSelect } from '@dreamworld/dw-select/dw-select.js';
import isEqual from 'lodash-es/isEqual';
import find from 'lodash-es/find';
import dayjs from 'dayjs/esm/index.js';
import without from 'lodash-es/without.js';

import * as _valueProvider from './value-provider.js';
import * as _valueProviderFactory from './value-provider-factory.js';
import './dw-date-range-picker.js';
import './dw-date-range-input-dialog.js';
import './dw-days-range-input-dialog.js';
import '@dreamworld/dw-date-input/dw-date-picker.js';

/**
 * Date range input control is used to input a custom duration.
 *
 * ## Behaviour
 * - It overrides all the behaviours of dw-select input control.
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

// An applied days window. Bounds may be numbers or strings - a consumer rebuilding from URL params has strings.
const _hasDaysRange = v => !!v && typeof v === 'object' && v.daysFrom !== undefined && v.daysTo !== undefined;

export class DwDateRangeSelect extends DwSelect {
  constructor() {
    super();
    this.valueTextProvider = (item, customLabel) => {
      if (customLabel) {
        const value = (this.value && this.value.valueProvider && this.value.valueProvider()) || this.value;
        if ((!item || item.showCustomRange || item === 'SELECT_DATE') && value && value.start === value.end) {
          const text = `${dayjs(value.start).format(this.dateRepresentationFormat)}`;
          return text;
        }

        if ((!item || item.showUpToDate) && value && value.end && !value.start) {
          return dayjs(value.end).format(this.dateRepresentationFormat);
        }

        if ((!item || item.showCustomRange || item === 'SELECT_DATE') && value && value.start && value.end) {
          return `${dayjs(value.start).format(this.dateRepresentationFormat)} - ${dayjs(value.end).format(this.dateRepresentationFormat)}`;
        }
        return item.label;
      }
      return item.label;
    };

    this.valueEquator = (v1, v2) => {
      if (!v1 && !v2) {
        return v1 === v2;
      }

      // Compared first: after a reload the value is rebuilt from page params with no `valueProvider`, so the
      // branches below would miss it. Coerced, because those params arrive as strings.
      if (_hasDaysRange(v1) && _hasDaysRange(v2)) {
        return Number(v1.daysFrom) === Number(v2.daysFrom) && Number(v1.daysTo) === Number(v2.daysTo);
      }

      if (v1 && v2 && v1.hasOwnProperty('valueProvider') && v2.hasOwnProperty('valueProvider')) {
        return isEqual(v1.valueProvider(), v2.valueProvider());
      }
      if (v1 && v1.hasOwnProperty('valueProvider')) {
        return isEqual(v1.valueProvider(), v2);
      }

      if (isEqual(v1, v2)) {
        return true;
      }

      if (v1 === 'SELECT_DATE' || (v1 && v1.showCustomRange && v1 && v2 && ((v2.start && v2.end) || v2.showCustomRange))) {
        return true;
      }

      if (v1 && v1.showUpToDate && v2 && v2.end && !v2.start) {
        return true;
      }

      // Matches the bare dropdown item against a value, which is how the list highlights the selected option.
      // Two values that both carry a window are handled above.
      if (v1 && v1.showDaysRange && v2 && (v2.showDaysRange || _hasDaysRange(v2))) {
        return true;
      }

      return false;
    };

    this.appendTo = 'parent';
    this.zIndex = 9999;
    this.mobileMode = false;
    this.tabletMode = false;
    this.valueFormat = 'YYYY-MM-DD';
    this.inputFormat = 'DD/MM/YYYY';
    this.dateRepresentationFormat = 'DD MMM YYYY';
    this.dateInputFormat = 'dd/mm/yyyy';
    this._inputDialogAutoFocusSelector = '#start-date';
  }

  static get properties() {
    return {
      /**
       * Selected list item object.
       * `object` in case of single selection;
       * `object[]` in case of multiple selections.
       */
      value: { type: Object },

      /**
       * date value format
       * default `yyyy-mm-dd`.
       */
      valueFormat: { type: String },

      /**
       * Date represent format
       * default `dd mmm yyyy`
       */
      dateRepresentationFormat: { type: String },

      hideCustomRange: { type: Boolean },

      // START: Date-picker properties
      /**
       * Date-picker
       * Trigger element for which `popover` dialog is opened.
       */
      triggerElement: { type: Object },

      /**
       * Date-picker
       * Element in which content will be appended. Default is parent element of trigger element.
       */
      appendTo: { type: Object },

      /**
       * Date-picker
       * Input property.
       * Element z-index, default value is 9999.
       */
      zIndex: { type: Number },

      /**
       * Date-picker
       * Input property.
       * Display in mobile mode (full screen).
       */
      mobileMode: { type: Boolean, reflect: true, attribute: 'mobile-mode' },

      /**
       * Date-picker
       * Input property.
       * Display in tablet mode.
       */
      tabletMode: { type: Boolean, reflect: true, attribute: 'tablet-mode' },

      /**
       * It's representing app's current theme is dark or not.
       */
      darkTheme: {
        type: Boolean,
        reflect: true,
        attribute: 'dark-theme',
      },

      /**
       * Represents current company's date input format.
       */
      dateInputFormat: { type: String },

      /**
       * Possible values: 'PICKER', 'UP_TO_DATE_PICKER', 'INPUT', 'DAYS_RANGE_INPUT' & `null`
       */
      _dialogMode: { type: String },

      /**
       * Heading of the days-range dialog. Supplied by the consumer; this package holds no
       * language-specific text.
       */
      daysRangeHeading: { type: String },

      /**
       * Label of the days-range dialog's `From` field.
       */
      daysRangeFromLabel: { type: String },

      /**
       * Label of the days-range dialog's `To` field.
       */
      daysRangeToLabel: { type: String },

      /**
       * Label of the days-range dialog's Cancel action.
       */
      daysRangeCancelLabel: { type: String },

      /**
       * Label of the days-range dialog's Apply action.
       */
      daysRangeApplyLabel: { type: String },

      /**
       * Selector for the element to auto-focus in input dialog
       * @private
       */
      _inputDialogAutoFocusSelector: { type: String },

      /**
       * Whether to show custom upto date item border.
       * Default is false.
       */
      showUpToDateDivider: { type: Boolean },

      // END: Date-picker properties
    };
  }

  render() {
    return html`${super.render()} ${this.dateRangePickerTemplate} ${this.dateRangeInputDialogTemplate} ${this.upToDatePickerTemplate}
    ${this.daysRangeInputDialogTemplate}`;
  }

  get upToDatePickerTemplate() {
    if (this._dialogMode !== 'UP_TO_DATE_PICKER') {
      return;
    }

    const value = this.value?.end || this.value?.valueProvider?.()?.end;

    return html`
      <dw-date-picker
        .opened=${true}
        date-picker="false"
        .type=${this.mobileMode ? 'modal' : 'popover'}
        .popoverAnimation=${'expand'}
        .placement=${'bottom'}
        .mobileMode=${this.mobileMode}
        .tabletMode=${this.tabletMode}
        .showTrigger=${true}
        .appendTo=${this.appendTo}
        .zIndex=${this.zIndex}
        .value=${value}
        .minDate="${this.minDate}"
        .maxDate="${this.maxDate}"
        .inputFormat=${this.dateInputFormat}
        .valueFormat=${this.valueFormat}
        .dateRepresentationFormat="${this.dateRepresentationFormat}"
        .triggerElement=${this.triggerElement}
        @dw-dialog-closed=${() => this._triggerUpToDatePickerOpenedChanged(false)}
        @dw-dialog-opened=${() => this._triggerUpToDatePickerOpenedChanged(true)}
        @change=${this._onUpToDateChanged}
      >
      </dw-date-picker>
    `;
  }

  get daysRangeInputDialogTemplate() {
    // The popover anchors only on the `opened` false-to-true transition, so gate on the trigger existing.
    if (this._dialogMode !== 'DAYS_RANGE_INPUT' || !this.triggerElement) {
      return;
    }

    // Bound exactly as the picker is:
    // - `showTrigger` decides the popover offset; without it the dialog is dragged up over the dropdown.
    // - `placement: bottom` is what makes the modal a bottom sheet. The popover path ignores it.

    return html`
      <dw-days-range-input-dialog
        .opened=${true}
        date-picker="false"
        .type=${this.mobileMode || this._layout === 'small' ? 'modal' : 'popover'}
        .popoverAnimation=${'expand'}
        .placement=${'bottom'}
        .mobileMode=${this.mobileMode}
        .tabletMode=${this.tabletMode}
        .showTrigger=${true}
        .appendTo=${this.appendTo}
        .zIndex=${this.zIndex}
        .triggerElement=${this.triggerElement}
        ._layout=${this._layout}
        .heading=${this.daysRangeHeading}
        .fromLabel=${this.daysRangeFromLabel}
        .toLabel=${this.daysRangeToLabel}
        .cancelLabel=${this.daysRangeCancelLabel}
        .applyLabel=${this.daysRangeApplyLabel}
        .darkTheme=${this.darkTheme}
        .errorMessages=${this.errorMessages}
        .value=${this.value}
        @dw-dialog-closed=${() => this._triggerDaysRangeInputDialogOpenedChanged(false)}
        @dw-dialog-opened=${() => this._triggerDaysRangeInputDialogOpenedChanged(true)}
        @change=${this._onDaysRangeChanged}
      >
      </dw-days-range-input-dialog>
    `;
  }

  get dateRangeInputDialogTemplate() {
    if (this.hideCustomRange || this._dialogMode !== 'INPUT') {
      return;
    }
    return html`
      <dw-date-range-input-dialog
        .opened=${true}
        date-picker="false"
        .type=${'modal'}
        .placement=${'center'}
        .inputFormat="${this.dateInputFormat ? this.dateInputFormat : this.inputFormat}"
        .valueFormat=${this.valueFormat}
        .dateRepresentationFormat="${this.dateRepresentationFormat}"
        .autoFocusSelector="${this._inputDialogAutoFocusSelector}"
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
        .darkTheme=${this.darkTheme}
        .hintInTooltip="${this.hintInTooltip}"
        .errorInTooltip="${this.errorInTooltip}"
        .warningInTooltip="${this.warningInTooltip}"
        .hintTooltipActions="${this.hintTooltipActions}"
        .errorTooltipActions="${this.errorTooltipActions}"
        .warningTooltipActions="${this.warningTooltipActions}"
        .tipPlacement="${this.tipPlacement}"
        .errorMessages="${this.errorMessages}"
        @dw-dialog-closed=${e => this._triggerDateRangeInputDialogOpenedChanged(false)}
        @dw-dialog-opened=${e => this._triggerDateRangeInputDialogOpenedChanged(true)}
        @mode-changed=${() => {
          this._changeDialogMode('PICKER');
        }}
        @change=${this._onChange}
      >
      </dw-date-range-input-dialog>
    `;
  }

  get dateRangePickerTemplate() {
    if (this.hideCustomRange || this._dialogMode !== 'PICKER') {
      return;
    }
    return html`
      <dw-date-range-picker
        .opened=${true}
        date-picker="false"
        .type=${this.mobileMode ? 'modal' : 'popover'}
        .popoverAnimation=${'expand'}
        .placement=${'bottom'}
        .mobileMode=${this.mobileMode}
        .tabletMode=${this.tabletMode}
        .value="${this.value}"
        .showTrigger=${true}
        .appendTo=${this.appendTo}
        .zIndex=${this.zIndex}
        .minDate="${this.minDate}"
        .maxDate="${this.maxDate}"
        .inputFormat="${this.dateInputFormat ? this.dateInputFormat : this.inputFormat}"
        .valueFormat=${this.valueFormat}
        .dateRepresentationFormat="${this.dateRepresentationFormat}"
        .triggerElement=${this.triggerElement}
        .errorMessages="${this.errorMessages}"
        @dw-dialog-closed=${e => this._triggerDateRangePickerOpenedChanged(false)}
        @dw-dialog-opened=${e => this._triggerDateRangePickerOpenedChanged(true)}
        @mode-changed=${e => {
          this._changeDialogMode('INPUT', e?.detail);
        }}
        @change=${this._onDatePickerValueChanged}
      >
      </dw-date-range-picker>
    `;
  }

  /**
   * Returns String that represents current value
   * @override
   */
  _getValue(value) {
    var text;
    try {
      text = this.valueTextProvider(value, true);
    } catch (e) {
      text = '';
    }

    if (text) {
      return text;
    }

    if (typeof value === 'string') {
      return value;
    }

    return '';
  }

  _onTrigger() {
    super._onTrigger();
    this._dialogMode = 'null';
  }

  _onDialogOpenToggle() {
    super._onDialogOpenToggle();
    this._dialogMode = 'null';
  }

  _onDatePickerValueChanged(e) {
    const value = e?.detail || {};
    const selectedItem = find(this.items, 'showCustomRange');
    const DATE_FORMAT = 'YYYY-MM-DD';
    if (value.start && value.end) {
      const valueProvider = function () {
        return { start: dayjs(value.start).format(DATE_FORMAT), end: dayjs(value.end).format(DATE_FORMAT) };
      };
      this.value = {
        ...selectedItem,
        ...{
          valueProvider,
        },
      };
      this._selectedValueText = this._getValue(selectedItem);
      this._dispatchSelected(value);
      setTimeout(() => {
        this.validate();
      }, 0);
    }
  }

  _onChange(e) {
    const value = e?.target?.value || {};
    const selectedItem = find(this.items, 'showCustomRange');
    const DATE_FORMAT = 'YYYY-MM-DD';
    if (value.start && value.end) {
      const valueProvider = function () {
        return { start: dayjs(value.start).format(DATE_FORMAT), end: dayjs(value.end).format(DATE_FORMAT) };
      };
      this.value = {
        ...selectedItem,
        ...{
          valueProvider,
        },
      };
      this._selectedValueText = this._getValue(selectedItem);
      this._dispatchSelected(value);
      setTimeout(() => {
        this.validate();
      }, 0);
    }
  }

  firstUpdated(changeProps) {
    super.firstUpdated && super.firstUpdated(changeProps);
    if (!this.triggerElement) {
      this.triggerElement = this;
    }
  }

  willUpdate(props) {
    if (this.hideCustomRange === true) {
      this._hideCustomRange();
    }
    super.willUpdate(props);
  }

  _hideCustomRange() {
    const selectedItem = find(this.items, 'showCustomRange');
    const value = this.items;
    this.items = value && value.includes(selectedItem) ? without(value, selectedItem) : value;
  }

  get dateRangePicker() {
    return this.renderRoot.querySelector('dw-date-range-picker');
  }

  get dateRangeInputDialog() {
    return this.renderRoot.querySelector('dw-date-range-input-dialog');
  }

  get daysRangeInputDialog() {
    return this.renderRoot.querySelector('dw-days-range-input-dialog');
  }

  async _onSelect(e) {
    if (e?.detail?.showCustomRange) {
      this._dialogMode = 'PICKER';
      return;
    }

    if (e?.detail?.showUpToDate) {
      this._dialogMode = 'UP_TO_DATE_PICKER';
      return;
    }

    if (e?.detail?.showDaysRange) {
      this._dialogMode = 'DAYS_RANGE_INPUT';
      return;
    }

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
    this._dispatchSelected(value);
  }

  _triggerDateRangeInputDialogOpenedChanged(opened) {
    if (!opened) {
      this._dialogMode = null;
    }

    if (opened) {
      this.dispatchEvent(new CustomEvent('date-range-input-dialog-opened'));
    } else {
      this.dispatchEvent(new CustomEvent('date-range-input-dialog-closed'));
    }
  }

  _onDaysRangeChanged(e) {
    const daysFrom = e?.detail?.daysFrom;
    const daysTo = e?.detail?.daysTo;
    if (daysFrom === undefined || daysTo === undefined) {
      return;
    }

    const previousValue = this.value;
    const selectedItem = find(this.items, 'showDaysRange');
    this.value = {
      ...selectedItem,
      ...{
        daysFrom,
        daysTo,
        valueProvider: _valueProviderFactory.daysRange(daysFrom, daysTo),
      },
    };
    this._dispatchSelected(previousValue);
    setTimeout(() => {
      this.validate();
    }, 0);
  }

  /**
   * A days-range value carries its window; the item it matches does not, so render from the value.
   * @override
   */
  _setSelectedValueText() {
    if (_hasDaysRange(this.value)) {
      this._selectedValueText = this._getValue(this.value);
      return;
    }

    super._setSelectedValueText();
  }

  _triggerDaysRangeInputDialogOpenedChanged(opened) {
    if (!opened) {
      this._dialogMode = null;
    }

    if (opened) {
      this.dispatchEvent(new CustomEvent('days-range-input-dialog-opened'));
    } else {
      this.dispatchEvent(new CustomEvent('days-range-input-dialog-closed'));
    }
  }

  _triggerDateRangePickerOpenedChanged(opened) {
    if (!opened) {
      this._dialogMode = null;
    }

    if (opened) {
      this.dispatchEvent(new CustomEvent('date-range-picker-opened'));
    } else {
      this.dispatchEvent(new CustomEvent('date-range-picker-closed'));
    }
  }

  _changeDialogMode(mode, detail) {
    this._dialogMode = mode;

    if (mode === 'INPUT' && detail?.autoFocusSelector) {
      this._inputDialogAutoFocusSelector = detail.autoFocusSelector;
    }
  }

  _onUpToDateChanged(e) {
    const value = e?.detail?.value || '';
    const selectedItem = find(this.items, 'showUpToDate');
    const DATE_FORMAT = 'YYYY-MM-DD';
    if (value) {
      const valueProvider = function () {
        return { end: dayjs(value).format(DATE_FORMAT) };
      };
      this.value = {
        ...selectedItem,
        ...{
          valueProvider,
        },
      };
    }
    this._selectedValueText = this._getValue(selectedItem);
    this._dispatchSelected(this.value);
    setTimeout(() => {
      this.validate();
    }, 0);
  }

  _triggerUpToDatePickerOpenedChanged(opened) {
    if (!opened) {
      this._dialogMode = null;
    }

    this.dispatchEvent(
      new CustomEvent('up-to-date-picker-opened-changed', {
        detail: {
          opened,
        },
      })
    );
  }
}

customElements.define('dw-date-range-select', DwDateRangeSelect);

export const valueProvider = _valueProvider;
export const valueProviderFactory = _valueProviderFactory;
