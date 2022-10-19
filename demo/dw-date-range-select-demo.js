import { LitElement, html, css } from "lit";
import "../dw-date-range-select.js";
import { all, thisMonth, lastMonth, today } from "../value-provider";
import {
  lastNMonths,
  thisQuarter,
  lastQuarter,
  thisFinancialYear,
  lastFinancialYear,
  beforeNDays,
  lastNthMonth,
  lastWeek,
  nextMonth,
} from "../value-provider-factory";

const DateRangeItems = [
  {
    label: "All",
    valueProvider: all,
  },
  {
    label: "This Month",
    valueProvider: thisMonth,
  },
  {
    label: "Last Month",
    valueProvider: lastMonth,
  },
  {
    label: "This Quarter",
    valueProvider: thisQuarter("01/04"),
  },
  {
    label: "Last Quarter",
    valueProvider: lastQuarter("01/04"),
  },
  {
    label: "This Financial Year",
    valueProvider: thisFinancialYear("01/04"),
  },
  {
    label: "Last Financial Year",
    valueProvider: lastFinancialYear("01/04"),
  },
  {
    label: "Last 3 Months",
    valueProvider: lastNMonths(3),
  },
  {
    label: "Last 2nd month",
    valueProvider: lastNthMonth(2),
  },
  {
    label: "before 30 days",
    valueProvider: beforeNDays(30),
  },
  {
    label: "today",
    valueProvider: today,
  },
  {
    label: "Last Week",
    valueProvider: lastWeek(),
  },
  {
    label: "End of Last Week",
    valueProvider: lastWeek(true),
  },
  {
    label: "End of Next Month",
    valueProvider: nextMonth(true),
  },
];

export class DwDateRangeSelectDemo extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
    `,
  ];

  render() {
    return html`
      <!-- <span>Input Value Empty</span>
      <dw-date-range-select .items=${DateRangeItems}> </dw-date-range-select> -->

      <br />

      <span>Input value matches with one of items</span>
      <dw-date-range-select
        .heading=${"Select Duration"}
        showClose
        .items=${DateRangeItems}
        .value=${lastMonth()}
        selectedTrailingIcon="done"
        @selected=${this._onSelected}
      >
      </dw-date-range-select>

      <br />

      <span>Input value does not matches with one of items</span>
      <dw-date-range-select
        .items=${DateRangeItems}
        .value=${{ start: "2021-04-01", end: "2022-03-30" }}
        @selected=${this._onSelected}
      >
      </dw-date-range-select>
    `;
  }

  _onSelected(e) {
    console.log({ event: e, detail: e.detail, valueProvider: e.detail.valueProvider() });
  }
}

customElements.define("dw-date-range-select-demo", DwDateRangeSelectDemo);
