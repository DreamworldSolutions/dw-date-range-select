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
    this.valueTextProvider = (item) => item.label;
    this.valueEquator = (v1, v2) => {
      if (v1.hasOwnProperty("valueProvider") && v2.hasOwnProperty("valueProvider")) {
        return isEqual(v1.valueProvider(), v2.valueProvider());
      }
      if (v1.hasOwnProperty("valueProvider")) {
        return isEqual(v1.valueProvider(), v2);
      }
      return isEqual(v1, v2);
    };
  }
}

customElements.define("dw-date-range-select", DwDateRangeSelect);

export const valueProvider = _valueProvider;
export const valueProviderFactory = _valueProviderFactory;
