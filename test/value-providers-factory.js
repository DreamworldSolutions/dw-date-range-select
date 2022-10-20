import {
  beforeNDays,
  lastFinancialYear,
  lastNMonths,
  lastNthMonth,
  lastQuarter,
  lastWeek,
  nextMonth,
  nextWeek,
  thisFinancialYear,
  thisQuarter,
  thisWeek,
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
  endOfThisFinancialYearData,
  endOfLastFinancialYearData,
  nextMonthData,
  endOfNextMonthData,
  thisWeekData,
  EndOfThisWeekData,
  nextWeekData,
  EndOfNextWeekData,
  lastWeekData,
  EndOfLastWeekData,
} from "./value-providers-data.js";
import { deepStrictEqual } from "assert";

describe("value-provider-factory", function () {
  _setCurrentDate(currentDate);

  describe("#Last N Months(n)", function () {
    it("returns a function", function () {
      deepStrictEqual(lastNMonths(12)(), lastNMonthisData);
    });
  });

  describe("#This Quarter (fyStartsFrom)", function () {
    it("returns a function", function () {
      deepStrictEqual(thisQuarter("01/04")(), thisQuarterData);
    });
  });

  describe("#Last Quarter (fyStartsFrom)", function () {
    it("returns a function", function () {
      deepStrictEqual(lastQuarter("01/04")(), lastQuarterData);
    });
  });

  describe("#This Financial Year (startsFrom)", function () {
    it("returns a function", function () {
      deepStrictEqual(thisFinancialYear("01/04")(), thisFinancialYearData);
    });
  });

  describe("#Last Financial Year (startsFrom)", function () {
    it("returns a function", function () {
      deepStrictEqual(lastFinancialYear("01/04")(), lastFinancialYearData);
    });
  });

  describe("#Last Nth Month (2)", function () {
    it("returns a function", function () {
      deepStrictEqual(lastNthMonth(2)(), lastNthMonthData);
    });
  });

  describe("#Before N Days (45)", function () {
    it("returns a function", function () {
      deepStrictEqual(beforeNDays(45)(), beforeNDaysData);
    });
  });

  describe("#End Of This financial Year(n)", function () {
    it("returns a function", function () {
      deepStrictEqual(thisFinancialYear("01/04", true)(), endOfThisFinancialYearData);
    });
  });

  describe("#End Of Last financial Year(n)", function () {
    it("returns a function", function () {
      deepStrictEqual(lastFinancialYear("01/04", true)(), endOfLastFinancialYearData);
    });
  });

  describe("#Next Month", function () {
    it("Returns a function", function () {
      deepStrictEqual(nextMonth(false)(), nextMonthData);
    });
  });

  describe("#End Of Next Month", function () {
    it("Returns a function", function () {
      deepStrictEqual(nextMonth(true)(), endOfNextMonthData);
    });
  });

  describe("#This week", function () {
    it("Returns a function", function () {
      deepStrictEqual(thisWeek(false)(), thisWeekData);
    });
  });

  describe("#End Of This week", function () {
    it("Returns a function", function () {
      deepStrictEqual(thisWeek(true)(), EndOfThisWeekData);
    });
  });

  describe("#Next week", function () {
    it("Returns a function", function () {
      deepStrictEqual(nextWeek(false)(), nextWeekData);
    });
  });

  describe("#End Of Next week", function () {
    it("Returns a function", function () {
      deepStrictEqual(nextWeek(true)(), EndOfNextWeekData);
    });
  });

  describe("#Last week", function () {
    it("Returns a function", function () {
      deepStrictEqual(lastWeek(false)(), lastWeekData);
    });
  });

  describe("#End Of Next week", function () {
    it("Returns a function", function () {
      deepStrictEqual(lastWeek(true)(), EndOfLastWeekData);
    });
  });
});
