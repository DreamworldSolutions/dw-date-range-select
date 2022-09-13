import {
  lastFinancialYear,
  lastNMonths,
  lastQuarter,
  thisFinancialYear,
  thisQuarter,
  _setCurrentDate,
} from "../value-provider-factory.js";
import {
  currentDate,
  lastFinancialYearData,
  lastNMonthisData,
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
});
