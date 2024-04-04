import { LitElement, html, css } from "@dreamworld/pwa-helpers/lit.js";
import { valueProvider, valueProviderFactory } from "../dw-date-range-select.js";
import { isEqual } from "lodash-es";

const DateRangeItems = [
  {
    label: "All",
    valueProvider: valueProvider.all,
  },
  {
    label: "This Month",
    valueProvider: valueProvider.thisMonth,
  },
  {
    label: "Last Month",
    valueProvider: valueProvider.lastMonth,
  },
  {
    label: "This Quarter",
    valueProvider: valueProviderFactory.thisQuarter("01/04"),
  },
  {
    label: "Last Quarter",
    valueProvider: valueProviderFactory.lastQuarter("01/04"),
  },
  // {
  //   label: "This Financial Year",
  //   valueProvider: valueProviderFactory.thisFinancialYear("01/04"),
  // },
  // {
  //   label: "Last Financial Year",
  //   valueProvider: valueProviderFactory.lastFinancialYear("01/04"),
  // },
  // {
  //   label: "Last 3 Months",
  //   valueProvider: valueProviderFactory.lastNMonths(3),
  // },
  // {
  //   label: "Last 2nd month",
  //   valueProvider: valueProviderFactory.lastNthMonth(2),
  // },
  // {
  //   label: "before 30 days",
  //   valueProvider: valueProviderFactory.beforeNDays(30),
  // },
  // {
  //   label: "today",
  //   valueProvider: valueProvider.today,
  // },
  // {
  //   label: "Last Week",
  //   valueProvider: valueProviderFactory.lastWeek(),
  // },
  // {
  //   label: "End of Last Week",
  //   valueProvider: valueProviderFactory.lastWeek(true),
  // },
  // {
  //   label: "End of Next Month",
  //   valueProvider: valueProviderFactory.nextMonth(true),
  // },
  {
    label: "Select date",
    showCustomRange: true
  },
];

export class DwDateRangeSelectDemo extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }

      dw-date-range-select {
        margin-top: 16px;
      }
    `,
  ];

  render() {
    return html`
      <span>Input Value Empty</span>
      <dw-date-range-select .items=${DateRangeItems}> </dw-date-range-select>

      <br />

      <div>Input value matches with one of items</div>
      <dw-date-range-select
        .label=${"Select Date"}
        .heading=${"Select Duration"}
        showClose
        .items=${DateRangeItems}
        .value=${valueProvider.lastMonth()}
        selectedTrailingIcon="done"
        @selected=${this._onSelected}
      >
      </dw-date-range-select>

      <br />

      <div>Input value does not matches with one of items</div>
      <dw-date-range-select
        .label=${"Select Date"}
        .items=${DateRangeItems}
        .value=${this.value}
        @selected=${this._onSelected}
      >
      </dw-date-range-select>
    `;
  }

  _onSelected(e) {
    console.log(e.detail);
  }
}

customElements.define("dw-date-range-select-demo", DwDateRangeSelectDemo);
