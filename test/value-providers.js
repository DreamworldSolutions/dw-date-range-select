import { strictEqual, deepStrictEqual } from "assert";
import { all, thisMonth, lastMonth, _setCurrentDate } from "../value-provider.js";
import { currentDate, thisMonthData, lastMonthData } from "./value-providers-data.js";

describe("value-provider", function () {
  _setCurrentDate(currentDate);

  describe("#All()", function () {
    it("returns undefined", function () {
      strictEqual(all(), undefined);
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
