import moment from "moment/dist/moment";

const DATE_FORMAT = "YYYY-MM-DD";
var currentDate;
export const _setCurrentDate = (timestamp) => {
  currentDate = timestamp;
};

/**
 * factory function (valueProvider)
 * returns a function (which acts as valueProvider and returns last N months start and end date)
 * @param {Number} n is positive integer
 */
export const lastNMonths = (n) => {
  return () => {
    return {
      start: moment(currentDate).subtract(n, "months").startOf("month").format(DATE_FORMAT),
      end: moment(currentDate).subtract(1, "months").endOf("month").format(DATE_FORMAT),
    };
  };
};

/**
 * factory function (valueProvider)
 * returns a function (which acts as valueProvider and returns this Quarter start and end date)
 * @param {String} fyStartsFrom is String in the format “dd/mm”.
 * @param {Boolean} endDate is boolen, default value is false. If true, it returns only the this quarter's end date.
*/
export const thisQuarter = (fyStartsFrom, endDate = false) => {
  return () => {
    if (endDate) {
      return {
        end: moment(currentDate).endOf("quarter").format(DATE_FORMAT),
      };
    }

    return {
      start: moment(currentDate).startOf("quarter").format(DATE_FORMAT),
      end: moment(currentDate).endOf("quarter").format(DATE_FORMAT),
    };
  };
};

/**
 * factory function (valueProvider)
 * returns a function (which acts as valueProvider and returns last Quarter start and end date)
 * @param {String} fyStartsFrom is String in the format “dd/mm”.
 * @param {Boolean} endDate is boolen, default value is false. If true, it returns only the last quarter's end date.
 */
export const lastQuarter = (fyStartsFrom, endDate = false) => {
  return () => {
    if (endDate) {
      return {
        end: moment(currentDate).subtract(1, "Q").endOf("quarter").format(DATE_FORMAT),
      };
    }

    return {
      start: moment(currentDate).subtract(1, "Q").startOf("quarter").format(DATE_FORMAT),
      end: moment(currentDate).subtract(1, "Q").endOf("quarter").format(DATE_FORMAT),
    };
  };
};

/**
 * factory function (valueProvider)
 * returns a function (which acts as valueProvider and returns this financian year start and end date)
 * @param {String} startsFrom is String in the format “dd/mm”.
 * @param {Boolean} endDate is boolen, default value is false. If true, it returns only the current financial year's end date.
 */
export const thisFinancialYear = (startsFrom, endDate = false) => {
  let startsFromDay = moment(startsFrom, "DD/MM").date();
  let startsFromMonth = moment(startsFrom, "DD/MM").month();
  return () => {
    if (endDate) {
      return {
        end: moment(currentDate)
          .month(startsFromMonth - 1)
          .date(startsFromDay)
          .add(1, "y")
          .endOf("month")
          .format(DATE_FORMAT),
      };
    }

    return {
      start: moment(currentDate).month(startsFromMonth).date(startsFromDay).format(DATE_FORMAT),
      end: moment(currentDate)
        .month(startsFromMonth - 1)
        .date(startsFromDay)
        .add(1, "y")
        .endOf("month")
        .format(DATE_FORMAT),
    };
  };
};

/**
 * factory function (valueProvider)
 * returns a function (which acts as valueProvider and returns last financian year start and end date)
 * @param {String} startsFrom is String in the format “dd/mm”.
 * @param {Boolean} endDate is boolen, default value is false. If true, it returns only the last financial year's end date.
 */
export const lastFinancialYear = (startsFrom, endDate = false) => {
  let startsFromDay = moment(startsFrom, "DD/MM").date();
  let startsFromMonth = moment(startsFrom, "DD/MM").month();
  return () => {
    if (endDate) {
      return {
        end: moment(currentDate)
          .month(startsFromMonth - 1)
          .date(startsFromDay)
          .add(1, "y")
          .endOf("month")
          .subtract(1, "years")
          .format(DATE_FORMAT),
      };
    }

    return {
      start: moment(currentDate)
        .month(startsFromMonth)
        .date(startsFromDay)
        .subtract(1, "years")
        .format(DATE_FORMAT),
      end: moment(currentDate)
        .month(startsFromMonth - 1)
        .date(startsFromDay)
        .add(1, "y")
        .endOf("month")
        .subtract(1, "years")
        .format(DATE_FORMAT),
    };
  };
};

/**
 * Computed last Nth Month start and end date (N is a positive integer)
 * @param {Number} n last nth month
 * @returns {Function} function (which acts as valueProvider and returns last Nth Month start and end date)
 */
export const lastNthMonth = (n) => {
  return () => {
    return {
      start: moment(currentDate).subtract(n, "months").startOf("month").format(DATE_FORMAT),
      end: moment(currentDate).subtract(n, "months").endOf("month").format(DATE_FORMAT),
    };
  };
};

/**
 * only the end date is provided.
 * If n is not a positive integer then return the current day as the end date and throw a warning log.
 * @param {*} n last n days
 * @returns {Function} function (which acts as valueProvider and returns before N days (from today)
 */
export const beforeNDays = (n) => {
  return () => {
    return {
      end: moment(currentDate).subtract(n, "days").format(DATE_FORMAT),
    };
  };
};
