<!-- cspell:words litepicker Litepicker -->
# @dreamworld/dw-date-range-select [![Published on npm](https://img.shields.io/npm/v/@dreamworld/dw-date-range-select.svg)](https://www.npmjs.com/package/@dreamworld/dw-date-range-select)

A Lit Web Component that extends `dw-select` to provide a Material Design date range selector. Users choose from a configurable list of predefined date range items or open a custom calendar picker / manual input dialog to enter an arbitrary date range.

---

## 1. User Guide

### Installation & Setup

```bash
yarn add @dreamworld/dw-date-range-select
```

Import the component and the value utilities:

```js
// Register the custom element
import '@dreamworld/dw-date-range-select/dw-date-range-select.js';

// Import named exports for building item lists
import { valueProvider, valueProviderFactory } from '@dreamworld/dw-date-range-select/dw-date-range-select.js';
```

---

### Basic Usage

```js
import { LitElement, html } from '@dreamworld/pwa-helpers/lit.js';
import { valueProvider, valueProviderFactory } from '@dreamworld/dw-date-range-select/dw-date-range-select.js';

const DateRangeItems = [
  { label: 'All',            valueProvider: valueProvider.all },
  { label: 'This Month',     valueProvider: valueProvider.thisMonth },
  { label: 'Last Month',     valueProvider: valueProvider.lastMonth },
  { label: 'This Quarter',   valueProvider: valueProviderFactory.thisQuarter('01/04') },
  { label: 'Last Quarter',   valueProvider: valueProviderFactory.lastQuarter('01/04') },
  { label: 'Select date',    showCustomRange: true },
];

class MyApp extends LitElement {
  render() {
    return html`
      <dw-date-range-select
        label="Select Date"
        heading="Select Duration"
        showClose
        .items=${DateRangeItems}
        .value=${valueProvider.lastMonth()}
        selectedTrailingIcon="done"
        @selected=${this._onSelected}
      ></dw-date-range-select>
    `;
  }

  _onSelected(e) {
    console.log(e.detail); // { start: "YYYY-MM-DD", end: "YYYY-MM-DD" }
  }
}
```

---

### API Reference

#### `<dw-date-range-select>`

Extends `DwSelect`. All `dw-select` properties are inherited.

##### Props

| Name | Type | Default | Required | Description |
|---|---|---|---|---|
| `value` | `Object` | — | No | Current value. Shape: `{ start?, end?, valueProvider?, label?, showCustomRange?, showUpToDate? }` |
| `valueFormat` | `String` | `'YYYY-MM-DD'` | No | dayjs format string for `start`/`end` date values |
| `dateRepresentationFormat` | `String` | `'DD MMM YYYY'` | No | dayjs format string used when rendering the selected value in the trigger |
| `dateInputFormat` | `String` | `'dd/mm/yyyy'` | No | Format hint shown in manual date input fields (lowercase, e.g. `'dd/mm/yyyy'` or `'mm/dd/yyyy'`) |
| `inputFormat` | `String` | `'DD/MM/YYYY'` | No | dayjs format string used internally for date input parsing |
| `hideCustomRange` | `Boolean` | `false` | No | When `true`, removes the item with `showCustomRange: true` from the list and suppresses the calendar picker |
| `triggerElement` | `Object` | self | No | DOM element used as the popover trigger anchor. Defaults to the component itself |
| `appendTo` | `Object\|String` | `'parent'` | No | Portal target for the dropdown/dialog. Passed directly to `dw-select` |
| `zIndex` | `Number` | `9999` | No | CSS z-index applied to the dropdown and picker dialogs |
| `mobileMode` | `Boolean` | `false` | No | Renders pickers as full-screen modal dialogs. Reflected as `mobile-mode` attribute |
| `tabletMode` | `Boolean` | `false` | No | Enables tablet-optimized layout. Reflected as `tablet-mode` attribute |
| `darkTheme` | `Boolean` | `false` | No | Applies dark theme to dialogs. Reflected as `dark-theme` attribute |
| `showUpToDateDivider` | `Boolean` | `false` | No | Renders a visual divider before items that have `showUpToDate: true` |

##### Events

| Event | Detail | Description |
|---|---|---|
| `selected` | Selected item object (from `dw-select`) | Fired after any item selection, including after custom date ranges are confirmed |
| `date-range-picker-opened` | — | Fired when the calendar picker dialog opens |
| `date-range-picker-closed` | — | Fired when the calendar picker dialog closes |
| `date-range-input-dialog-opened` | — | Fired when the manual input dialog opens |
| `date-range-input-dialog-closed` | — | Fired when the manual input dialog closes |
| `up-to-date-picker-opened-changed` | `{ opened: Boolean }` | Fired when the "up to date" single-date picker opens or closes |

---

#### `<dw-date-range-picker>`

Internal calendar picker dialog (`dw-composite-dialog`). Powered by [Litepicker](https://litepicker.com).

##### Props

| Name | Type | Default | Required | Description |
|---|---|---|---|---|
| `value` | `Object` | — | No | `{ start: "YYYY-MM-DD", end: "YYYY-MM-DD" }` |
| `inputFormat` | `String` | — | No | Preferred date input format: `'DD/MM/YYYY'` or `'MM/DD/YYYY'`. Normalized to uppercase internally |
| `valueFormat` | `String` | — | No | dayjs format string for the date values returned. Normalized to uppercase internally |
| `dateRepresentationFormat` | `String` | — | No | Display format for date labels in the picker header |
| `mobileMode` | `Boolean` | `false` | No | Full-screen modal layout. Reflected as `mobile-mode` |
| `tabletMode` | `Boolean` | `false` | No | Tablet layout. Reflected as `tablet-mode` |
| `tabindex` | `String` | `'-1'` | No | Tab index. Reflected as attribute |

##### Events

| Event | Detail | Description |
|---|---|---|
| `change` | `{ start: String, end: String }` | Fired when both dates are selected in the calendar |
| `mode-changed` | `{ mode: 'INPUT', autoFocusSelector: String }` | Fired when the user clicks the edit icon to switch to manual input mode |

---

#### `<dw-date-range-input-dialog>`

Internal manual date entry dialog (`dw-composite-dialog`) with Start date and End date text inputs.

##### Props

| Name | Type | Default | Required | Description |
|---|---|---|---|---|
| `value` | `Object` | — | No | `{ start: "YYYY-MM-DD", end: "YYYY-MM-DD" }` |
| `label` | `String` | — | No | Dialog label |
| `disabled` | `Boolean` | `false` | No | Disables both date inputs |
| `noLabel` | `Boolean` | `false` | No | Hides field labels |
| `hint` | `String` | — | No | Helper text shown below inputs |
| `hintPersistent` | `Boolean` | `false` | No | Always shows hint text regardless of focus state |
| `required` | `Boolean` | `false` | No | Marks inputs as required |
| `placeholder` | `String` | — | No | Placeholder text for inputs |
| `errorMessages` | `Object` | — | No | Map of error keys to message strings. Supports `endBeforeStart` key |
| `readOnly` | `Boolean` | `false` | No | Makes inputs read-only |
| `invalid` | `Boolean` | `false` | No | Forces invalid state on both inputs |
| `minDate` | `String` | — | No | Minimum selectable date (inclusive) in `valueFormat` |
| `maxDate` | `String` | — | No | Maximum selectable date (inclusive) in `valueFormat` |
| `autoSelect` | `Boolean` | `false` | No | Auto-selects input text on focus |
| `inputFormat` | `String` | — | No | Preferred date input format. Normalized to uppercase |
| `valueFormat` | `String` | — | No | dayjs format for stored date values. Normalized to uppercase |
| `dense` | `Boolean` | `false` | No | Compact input layout |
| `originalValue` | `String` | — | No | Reference value used by `highlightChanged` to detect modifications |
| `highlightChanged` | `Boolean` | `false` | No | Highlights inputs when their value differs from `originalValue` |
| `noHintWrap` | `Boolean` | `false` | No | Constrains hint text to a single line. Reflected as attribute |
| `error` | `Object` | — | No | Error message string or function for both inputs |
| `showFutureError` | `Boolean` | `false` | No | Shows an error when a future date is entered. Reflected as attribute |
| `showFutureWarning` | `Boolean` | `false` | No | Shows a warning when a future date is entered. Reflected as attribute |
| `warning` | `Object` | — | No | Warning message string or function |
| `hintInTooltip` | `Boolean` | `false` | No | Renders hint in a tooltip instead of inline |
| `errorInTooltip` | `Boolean` | `false` | No | Renders error in a tooltip instead of inline |
| `warningInTooltip` | `Boolean` | `false` | No | Renders warning in a tooltip instead of inline |
| `hintTooltipActions` | `Array` | — | No | Action buttons shown in the hint tooltip |
| `errorTooltipActions` | `Array` | — | No | Action buttons shown in the error tooltip |
| `warningTooltipActions` | `Array` | — | No | Action buttons shown in the warning tooltip |
| `tipPlacement` | `String` | — | No | Tippy.js placement string for tooltips (e.g. `'top'`, `'bottom-start'`) |
| `darkTheme` | `Boolean` | `false` | No | Dark theme. Reflected as `dark-theme` attribute |

##### Events

| Event | Detail | Description |
|---|---|---|
| `change` | — | Fired on the element when Apply is clicked and validation passes. Read `element.value` for the new `{ start, end }` object |
| `mode-changed` | `{ mode: 'PICKER' }` | Fired when the user clicks the calendar icon to switch to the calendar picker |

##### Methods

| Method | Signature | Returns | Description |
|---|---|---|---|
| `checkValidity` | `() => void` | — | Runs validity check on both date inputs |
| `reportValidity` | `() => Boolean` | `true` if both inputs are valid | Validates and displays errors on both inputs |
| `validate` | `() => Boolean` | `true` if valid | Alias for `reportValidity` |
| `formatDateText` | `(value: String) => String` | Formatted string | Reformats a date string by inserting spaces around the separator character |

---

### Data Models

#### `DateRangeItem`

Objects passed to the `.items` array of `<dw-date-range-select>`.

| Property | Type | Required | Description |
|---|---|---|---|
| `label` | `String` | Yes | Display text shown in the dropdown list and in the trigger when the item is selected |
| `valueProvider` | `Function` | No | Zero-argument function that returns `{ start?, end? }`. Used to compute the actual date range |
| `showCustomRange` | `Boolean` | No | When `true`, selecting this item opens the calendar picker dialog instead of setting a value directly |
| `showUpToDate` | `Boolean` | No | When `true`, selecting this item opens a single-date picker. The chosen date is stored as `{ end }` |

#### Value Object

The shape of `<dw-date-range-select>.value`:

```js
{
  start: "YYYY-MM-DD",       // optional — not present for "up to date" ranges
  end:   "YYYY-MM-DD",       // optional — not present for "all" ranges
  valueProvider: Function,   // optional — function that re-derives start/end dynamically
  // ...any other properties copied from the matched DateRangeItem
}
```

---

### `valueProvider` API

Static date range functions exported as `valueProvider` from `dw-date-range-select.js`.

```js
import { valueProvider } from '@dreamworld/dw-date-range-select/dw-date-range-select.js';
```

| Function | Signature | Returns | Description |
|---|---|---|---|
| `all` | `() => undefined` | `undefined` | Represents an unbounded "all" range |
| `today` | `() => Object` | `{ end }` | Today's date |
| `yesterday` | `() => Object` | `{ end }` | Yesterday's date |
| `tomorrow` | `() => Object` | `{ end }` | Tomorrow's date |
| `thisMonth` | `() => Object` | `{ start, end }` | First and last day of the current calendar month |
| `lastMonth` | `() => Object` | `{ start, end }` | First and last day of the previous calendar month |
| `endOfThisMonth` | `() => Object` | `{ end }` | Last day of the current calendar month |
| `endOfLastMonth` | `() => Object` | `{ end }` | Last day of the previous calendar month |
| `_setCurrentDate` | `(timestamp) => void` | — | Override "today" for all calculations. Intended for testing |

---

### `valueProviderFactory` API

Factory functions exported as `valueProviderFactory` from `dw-date-range-select.js`. Each factory returns a **function** (`valueProvider`) that computes dates at call time.

```js
import { valueProviderFactory } from '@dreamworld/dw-date-range-select/dw-date-range-select.js';
```

| Factory | Signature | Returned provider returns | Description |
|---|---|---|---|
| `nextMonth` | `(endDate?: Boolean = false) => Function` | `{ start, end }` or `{ end }` | Start and end of next calendar month. Pass `true` for end date only |
| `lastNMonths` | `(n: Number) => Function` | `{ start, end }` | Range from N months ago (+1 day) through today |
| `thisQuarter` | `(fyStartsFrom: String, endDate?: Boolean = false) => Function` | `{ start, end }` or `{ end }` | Start and end of the current calendar quarter |
| `lastQuarter` | `(fyStartsFrom: String, endDate?: Boolean = false) => Function` | `{ start, end }` or `{ end }` | Start and end of the previous calendar quarter |
| `thisFinancialYear` | `(startsFrom: String, endDate?: Boolean = false) => Function` | `{ start, end }` or `{ end }` | Current financial year. `startsFrom` is a `"DD/MM"` string (e.g. `"01/04"` for 1 April) |
| `lastFinancialYear` | `(startsFrom: String, endDate?: Boolean = false) => Function` | `{ start, end }` or `{ end }` | Previous financial year. `startsFrom` format: `"DD/MM"` |
| `lastNthMonth` | `(n: Number) => Function` | `{ start, end }` | Start and end of the calendar month N months ago (e.g. `1` = last month, `2` = two months ago) |
| `beforeNDays` | `(n: Number) => Function` | `{ end }` | The date that was N days before today |
| `thisWeek` | `(endDate?: Boolean = false) => Function` | `{ start, end }` or `{ end }` | Monday–Sunday of the current ISO week |
| `nextWeek` | `(endDate?: Boolean = false) => Function` | `{ start, end }` or `{ end }` | Monday–Sunday of the next ISO week |
| `lastWeek` | `(endDate?: Boolean = false) => Function` | `{ start, end }` or `{ end }` | Monday–Sunday of the previous ISO week |
| `_setCurrentDate` | `(timestamp) => void` | — | Override "today" for all factory calculations. Intended for testing |

**Usage:**

```js
// Factory call returns a valueProvider function; assign it to an item
{ label: 'Last 3 Months',    valueProvider: valueProviderFactory.lastNMonths(3) }
{ label: 'This FY',          valueProvider: valueProviderFactory.thisFinancialYear('01/04') }
{ label: 'End of Last Week', valueProvider: valueProviderFactory.lastWeek(true) }
```

---

### CSS Custom Properties

These custom properties are defined in `dw-date-range-picker-style.js` and can be overridden from the host application to theme the Litepicker calendar.

| Property | Default | Description |
|---|---|---|
| `--litepicker-day-width` | `40px` | Width of each day cell |
| `--litepicker-day-height` | `40px` | Height of each day cell |
| `--litepicker-day-margin` | `4px` | Margin around each day cell |
| `--litepicker-container-months-color-bg` | `var(--mdc-theme-surface)` | Calendar background color |
| `--litepicker-container-months-box-shadow-color` | `#ddd` | Calendar box shadow color |
| `--litepicker-month-header-color` | `#333` | Month/year header text color |
| `--litepicker-month-weekday-color` | `var(--mdc-theme-text-primary-on-surface)` | Weekday header label color |
| `--litepicker-month-week-number-color` | `var(--mdc-theme-text-primary-on-surface)` | Week number color |
| `--litepicker-day-color` | `var(--mdc-theme-text-primary-on-surface)` | Default day text color |
| `--litepicker-day-color-hover` | `var(--mdc-theme-primary)` | Day text color on hover |
| `--litepicker-is-today-color` | `var(--mdc-theme-primary)` | Today's date text color |
| `--litepicker-is-in-range-color` | `#bbdefb` | Background of days within the selected range |
| `--litepicker-is-start-color` | `#fff` | Text color of the start date |
| `--litepicker-is-start-color-bg` | `var(--mdc-theme-primary)` | Background of the start date |
| `--litepicker-is-end-color` | `#fff` | Text color of the end date |
| `--litepicker-is-end-color-bg` | `var(--mdc-theme-primary)` | Background of the end date |
| `--litepicker-is-locked-color` | `#9e9e9e` | Disabled/locked day color |
| `--litepicker-button-prev-month-color` | `var(--mdc-theme-text-secondary-on-surface)` | Previous-month button icon color |
| `--litepicker-button-next-month-color` | `var(--mdc-theme-text-secondary-on-surface)` | Next-month button icon color |
| `--litepicker-tooltip-color-bg` | `var(--mdc-theme-surface)` | Tooltip background color |
| `--litepicker-highlighted-day-color` | `#333` | Highlighted day text color |
| `--litepicker-highlighted-day-color-bg` | `#ffeb3b` | Highlighted day background color |
| `--activated-background-color` | `#02AFCD1F` | Background fill for the range highlight and start/end `::before` overlays in `<dw-date-range-picker>` |
| `--dw-popover-width` | `360px` | Width of the calendar popover |
| `--dw-popover-min-width` | `360px` | Minimum width of the calendar popover |
| `--dw-popover-border-radius` | `18px` | Border radius of the calendar popover |

---

### Advanced Usage

#### Custom Range with Calendar Picker

Add an item with `showCustomRange: true` to enable the calendar dialog:

```js
{ label: 'Select date', showCustomRange: true }
```

When selected, `<dw-date-range-picker>` opens. On confirmation the component sets `value` to:

```js
{
  ...item,           // spreads the showCustomRange item
  valueProvider: () => ({ start: "YYYY-MM-DD", end: "YYYY-MM-DD" })
}
```

#### "Up To Date" Single Date Picker

Add an item with `showUpToDate: true` to open a single-date picker:

```js
{ label: 'Up to date', showUpToDate: true }
```

On selection, `value` is set to:

```js
{
  ...item,
  valueProvider: () => ({ end: "YYYY-MM-DD" })
}
```

Use `showUpToDateDivider` on the host to render a divider above such items.

#### Switching Between Calendar and Input Mode

The user can toggle between calendar and manual input by clicking the edit icon in `<dw-date-range-picker>` (fires `mode-changed` → `INPUT`) or the calendar icon in `<dw-date-range-input-dialog>` (fires `mode-changed` → `PICKER`). This is managed automatically by `<dw-date-range-select>` via its internal `_dialogMode` state (`'PICKER'` | `'INPUT'` | `'UP_TO_DATE_PICKER'`).

#### Overriding "Today" for Testing

Both `valueProvider` and `valueProviderFactory` expose `_setCurrentDate(timestamp)` to pin the reference date:

```js
import { valueProvider, valueProviderFactory } from '@dreamworld/dw-date-range-select/dw-date-range-select.js';

valueProvider._setCurrentDate('2024-01-15');
valueProviderFactory._setCurrentDate('2024-01-15');
```

---

## 2. Developer Guide / Architecture

### Architecture Overview

```
<dw-date-range-select>          (dw-date-range-select.js)
  extends DwSelect
  │
  ├── <dw-date-range-picker>        (dw-date-range-picker.js)
  │     extends DwCompositeDialog
  │     wraps Litepicker (calendar UI)
  │
  ├── <dw-date-range-input-dialog>  (dw-date-range-input-dialog.js)
  │     extends DwCompositeDialog
  │     contains two <date-input> fields
  │
  └── <dw-date-picker>              (@dreamworld/dw-date-input)
        used for "up to date" single-date selection

valueProvider.js              — Static date range computation functions
valueProviderFactory.js       — Factory functions that produce valueProvider functions
dw-date-range-picker-style.js — Shared Litepicker CSS injected into DwDateRangePicker styles
```

### Design Patterns

| Pattern | Where applied |
|---|---|
| **Factory** | `valueProviderFactory` — each exported function returns a zero-argument `valueProvider` function, enabling parameterized date ranges (e.g. financial year start) to be stored as plain functions on list items |
| **Strategy (valueProvider)** | Each `DateRangeItem.valueProvider` is an interchangeable strategy for computing `{ start, end }` at runtime |
| **Composite** | `DwDateRangePicker` and `DwDateRangeInputDialog` both extend `DwCompositeDialog`, composing dialog chrome (header, content, footer) with domain-specific content |
| **Web Components / Lit** | All UI is implemented as Lit-based custom elements; state is declared via `static get properties()` and rendered reactively |

### Dialog Mode State Machine

`<dw-date-range-select>` maintains an internal `_dialogMode` property that drives which sub-dialog is rendered:

```
null / 'null'
    │
    ├─── item with showCustomRange selected ──► PICKER
    │         │                                   │
    │         │  user clicks edit icon             │  user clicks calendar icon
    │         └──────────────────────────► INPUT ◄─┘
    │                        │
    │         apply/cancel closes dialog
    │                        │
    └────────────────────────┘ (resets to null)

    ├─── item with showUpToDate selected ──► UP_TO_DATE_PICKER
    │                     │
    │         date selected / dialog closed
    │                     │
    └─────────────────────┘ (resets to null)
```

### Module Responsibilities

| File | Responsibility |
|---|---|
| `dw-date-range-select.js` | Orchestrates item selection, dialog mode switching, value normalization, and event dispatching. Exports `valueProvider` and `valueProviderFactory` |
| `dw-date-range-picker.js` | Manages Litepicker lifecycle (create, show, hide, destroy on each open/close); fires `change` with `{ start, end }` |
| `dw-date-range-input-dialog.js` | Renders two `<date-input>` fields with cross-field end-date validation; fires `change` on Apply |
| `dw-date-range-picker-style.js` | Exports a Lit `css` tagged template of Litepicker base styles and component overrides |
| `value-provider.js` | Pure functions for fixed relative ranges (today, yesterday, this month, etc.) |
| `value-provider-factory.js` | Parameterized factories for configurable ranges (quarters, financial years, N-month windows, weeks). Uses dayjs plugins: `quarterOfYear`, `customParseFormat`, `isoWeek` |

### Key Dependencies

| Package | Role |
|---|---|
| `@dreamworld/dw-select` | Base list-select component that `DwDateRangeSelect` extends |
| `@dreamworld/dw-dialog` | Provides `DwCompositeDialog` base class |
| `@dreamworld/dw-date-input` | `<date-input>` field used in `DwDateRangeInputDialog`; `<dw-date-picker>` used for up-to-date mode |
| `@dreamworld/dw-icon-button` | Icon buttons in dialog headers |
| `@dreamworld/material-styles` | Typography and MDC theme tokens |
| `@dreamworld/pwa-helpers` | Lit re-exports |
| `dayjs` | All date arithmetic and formatting |
| `litepicker` | Calendar UI rendered inside `DwDateRangePicker` |
| `lodash-es` | `isEqual`, `find`, `without` utilities |
