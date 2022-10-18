import { strictEqual, deepStrictEqual } from "assert";
import { all, today, thisMonth, lastMonth, _setCurrentDate, yesterday, tomorrow } from "../value-provider.js";
import { currentDate, thisMonthData, lastMonthData, todayData, yesterdayData, tomorrowData } from "./value-providers-data.js";

describe("value-provider", function () {
  _setCurrentDate(currentDate);

  describe("#All()", function () {
    it("returns undefined", function () {
      strictEqual(all(), undefined);
    });
  });

  describe("#Today()", function () {
    it("returns Today Date", function () {
      deepStrictEqual(today(), todayData);
    });
  });

  describe("#Yesterday()", function () {
    it("returns Yesterday Date", function () {
      deepStrictEqual(yesterday(), yesterdayData);
    });
  });

  describe("#Tomorrow()", function () {
    it("returns tomorrow Date", function () {
      deepStrictEqual(tomorrow(), tomorrowData);
    });
  });

  describe("#This Month()", function () {
    it("returns this month", function () {
      deepStrictEqual(thisMonth(), thisMonthData);
    });
  });

  describe("#Last Month()", function () {
    it("returns last month", function () {
      deepStrictEqual(lastMonth(), lastMonthData);
    });
  });
});
