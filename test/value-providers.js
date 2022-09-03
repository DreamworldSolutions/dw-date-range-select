import { all, thisMonth, lastMonth, _setCurrentDate } from "../value-provider.js";
import { currentDate, thisMonthData, lastMonthData } from "./value-providers-data.js";
import assert from "assert";

describe("value-provider", function () {
  _setCurrentDate(currentDate);
  describe("#all()", function () {
    it("returns undefined", function () {
      assert.strictEqual(all(), undefined);
    });
  });

  describe("#thisMonth()", function () {
    it("returns this month", function () {
      assert.deepStrictEqual(thisMonth(), thisMonthData);
    });
  });

  describe("#lastMonth()", function () {
    it("returns last month", function () {
      assert.deepStrictEqual(lastMonth(), lastMonthData);
    });
  });
});
