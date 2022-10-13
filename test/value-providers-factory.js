import {
  beforeNDays,
  lastFinancialYear,
  lastNMonths,
  lastNthMonth,
  lastQuarter,
  thisFinancialYear,
  thisQuarter,
  _setCurrentDate,
} from "../value-provider-factory.js";
import {
  beforeNDaysData,
  currentDate,
  lastFinancialYearData,
  lastNMonthisData,
  lastNthMonthData,
  lastQuarterData,
  thisFinancialYearData,
  thisQuarterData,
} from "./value-providers-data.js";
import { deepStrictEqual } from "assert";

describe("value-provider-factory", function () {
  _setCurrentDate(currentDate);
  describe("#lastNMonths(n)", function () {
    it("returns a function", function () {
      deepStrictEqual(lastNMonths(4)(), lastNMonthisData);
    });
  });
  describe("#thisQuarter(fyStartsFrom)", function () {
    it("returns a function", function () {
      deepStrictEqual(thisQuarter("01/04")(), thisQuarterData);
    });
  });
  describe("#lastQuarter(fyStartsFrom)", function () {
    it("returns a function", function () {
      deepStrictEqual(lastQuarter("01/04")(), lastQuarterData);
    });
  });
  describe("#thisFinancialYear(startsFrom)", function () {
    it("returns a function", function () {
      deepStrictEqual(thisFinancialYear("01/04")(), thisFinancialYearData);
    });
  });
  describe("#lastFinancialYear(startsFrom)", function () {
    it("returns a function", function () {
      deepStrictEqual(lastFinancialYear("01/04")(), lastFinancialYearData);
    });
  });
  describe("#lastNthMonth(n)", function () {
    it("returns a function", function () {
      deepStrictEqual(lastNthMonth(2)(), lastNthMonthData);
    });
  });
  describe("#lastNthMonth(n)", function () {
    it("returns a function", function () {
      deepStrictEqual(beforeNDays(45)(), beforeNDaysData);
    });
  });
});
