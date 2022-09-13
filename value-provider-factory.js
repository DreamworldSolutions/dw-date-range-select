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
 */
export const thisQuarter = (fyStartsFrom) => {
  return () => {
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
 */
export const lastQuarter = (fyStartsFrom) => {
  return () => {
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
 */
export const thisFinancialYear = (startsFrom) => {
  let startsFromDay = moment(startsFrom, "DD/MM").date();
  let startsFromMonth = moment(startsFrom, "DD/MM").month();
  return () => {
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
 */
export const lastFinancialYear = (startsFrom) => {
  let startsFromDay = moment(startsFrom, "DD/MM").date();
  let startsFromMonth = moment(startsFrom, "DD/MM").month();
  return () => {
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
