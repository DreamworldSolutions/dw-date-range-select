import dayjs from 'dayjs/esm/index.js';
import customParseFormat from 'dayjs/esm/plugin/customParseFormat';
import quarterOfYear from 'dayjs/esm/plugin/quarterOfYear';
import isoWeek from 'dayjs/esm/plugin/isoWeek';
dayjs.extend(quarterOfYear);
dayjs.extend(customParseFormat);
dayjs.extend(isoWeek);

const DATE_FORMAT = 'YYYY-MM-DD';
var currentDate;
export const _setCurrentDate = timestamp => {
  currentDate = timestamp;
};

export const nextMonth = (endDate = false) => {
  return () => {
    if (endDate) {
      return {
        end: dayjs(currentDate).add(1, 'months').endOf('month').format(DATE_FORMAT),
      };
    }

    return {
      start: dayjs(currentDate).add(1, 'months').startOf('month').format(DATE_FORMAT),
      end: dayjs(currentDate).add(1, 'months').endOf('month').format(DATE_FORMAT),
    };
  };
};

/**
 * factory function (valueProvider)
 * returns a function (which acts as valueProvider and returns last N months start and end date)
 * @param {Number} n is positive integer
 */
export const lastNMonths = n => {
  return () => {
    return {
      start: dayjs(currentDate).subtract(n, 'months').add(1, 'days').format(DATE_FORMAT),
      end: dayjs(currentDate).format(DATE_FORMAT),
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
        end: dayjs(currentDate).endOf('quarter').format(DATE_FORMAT),
      };
    }

    return {
      start: dayjs(currentDate).startOf('quarter').format(DATE_FORMAT),
      end: dayjs(currentDate).endOf('quarter').format(DATE_FORMAT),
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
        end: dayjs(currentDate).subtract(1, 'Q').endOf('quarter').format(DATE_FORMAT),
      };
    }

    return {
      start: dayjs(currentDate).subtract(1, 'Q').startOf('quarter').format(DATE_FORMAT),
      end: dayjs(currentDate).subtract(1, 'Q').endOf('quarter').format(DATE_FORMAT),
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
  const startsFromDay = dayjs(startsFrom, 'DD/MM').date();
  const startsFromMonth = dayjs(startsFrom, 'DD/MM').month();

  return () => {
    let fyStartFrom = dayjs(currentDate).month(startsFromMonth).date(startsFromDay);
    if (dayjs(currentDate).isBefore(fyStartFrom.format(DATE_FORMAT))) {
      fyStartFrom = fyStartFrom.subtract(1, 'y');
    }

    if (endDate) {
      return {
        end: fyStartFrom.add(1, 'y').subtract(1, 'd').format(DATE_FORMAT),
      };
    }

    return {
      start: fyStartFrom.format(DATE_FORMAT),
      end: fyStartFrom.add(1, 'y').subtract(1, 'd').format(DATE_FORMAT),
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
  const startsFromDay = dayjs(startsFrom, 'DD/MM').date();
  const startsFromMonth = dayjs(startsFrom, 'DD/MM').month();

  return () => {
    let fyStartFrom = dayjs(currentDate).month(startsFromMonth).date(startsFromDay);
    if (dayjs(currentDate).isBefore(fyStartFrom.format(DATE_FORMAT))) {
      fyStartFrom = fyStartFrom.subtract(1, 'y');
    }
    const start = fyStartFrom.subtract(1, 'y');
    if (endDate) {
      return {
        end: start.add(1, 'y').subtract(1, 'd').format(DATE_FORMAT),
      };
    }

    return {
      start: start.format(DATE_FORMAT),
      end: start.add(1, 'y').subtract(1, 'd').format(DATE_FORMAT),
    };
  };
};

/**
 * Computed last Nth Month start and end date (N is a positive integer)
 * @param {Number} n last nth month
 * @returns {Function} function (which acts as valueProvider and returns last Nth Month start and end date)
 */
export const lastNthMonth = n => {
  return () => {
    return {
      start: dayjs(currentDate).subtract(n, 'months').startOf('month').format(DATE_FORMAT),
      end: dayjs(currentDate).subtract(n, 'months').endOf('month').format(DATE_FORMAT),
    };
  };
};

/**
 * only the end date is provided.
 * If n is not a positive integer then return the current day as the end date and throw a warning log.
 * @param {*} n last n days
 * @returns {Function} function (which acts as valueProvider and returns before N days (from today)
 */
export const beforeNDays = n => {
  return () => {
    return {
      end: dayjs(currentDate).subtract(n, 'days').format(DATE_FORMAT),
    };
  };
};

/**
 * This week's duration. Note: Week start with Monday.
 * @param {Boolean} endDate only returns end date when `true`
 * @returns {Object} returns this week's start and end date
 */
export const thisWeek = (endDate = false) => {
  return () => {
    if (endDate) {
      return {
        end: dayjs(currentDate).endOf('isoWeek').format(DATE_FORMAT),
      };
    }
    return {
      start: dayjs(currentDate).startOf('isoWeek').format(DATE_FORMAT),
      end: dayjs(currentDate).endOf('isoWeek').format(DATE_FORMAT),
    };
  };
};

/**
 * Next week's duration. Note: Week start with Monday.
 * @param {Boolean} endDate only returns end date when `true`
 * @returns returns next week's start and end date
 */
export const nextWeek = (endDate = false) => {
  return () => {
    if (endDate) {
      return {
        end: dayjs(currentDate).endOf('isoWeek').add(1, 'w').format(DATE_FORMAT),
      };
    }

    return {
      start: dayjs(currentDate).startOf('isoWeek').add(1, 'w').format(DATE_FORMAT),
      end: dayjs(currentDate).endOf('isoWeek').add(1, 'w').format(DATE_FORMAT),
    };
  };
};

export const lastWeek = (endDate = false) => {
  return () => {
    if (endDate) {
      return {
        end: dayjs(currentDate).endOf('isoWeek').subtract(1, 'w').format(DATE_FORMAT),
      };
    }

    return {
      start: dayjs(currentDate).startOf('isoWeek').subtract(1, 'w').format(DATE_FORMAT),
      end: dayjs(currentDate).endOf('isoWeek').subtract(1, 'w').format(DATE_FORMAT),
    };
  };
};
