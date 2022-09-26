import moment from "moment/dist/moment";

const DATE_FORMAT = "YYYY-MM-DD";
var currentDate;

export const _setCurrentDate = (timestamp) => {
  currentDate = timestamp;
};

/**
 * When duration is all
 * @returns {Object} undefined
 */
export const all = () => {};

/**
 * returns an object whose start & end is the current month’s first & last date.
 * @param {Boolean} end is boolen, default value is false. If true, it returns only this month's end date.
 */
export const thisMonth = (end = false) => {
  return {
    start: moment(currentDate).startOf("month").format(DATE_FORMAT),
    end: moment(currentDate).endOf("month").format(DATE_FORMAT),
  };
};

/**
 * returns an object whose start & end is the last month’s first & last date.
 * @param {Boolean} end is boolen, default value is false. If true, it returns only last month's end date.
 */
export const lastMonth = (end = false) => {
  if (end) {
    return {
      end: moment(currentDate).endOf("month").format(DATE_FORMAT),
    };
  }

  return {
    start: moment(currentDate).subtract(1, "months").startOf("month").format(DATE_FORMAT),
    end: moment(currentDate).subtract(1, "months").endOf("month").format(DATE_FORMAT),
  };
};

/**
 * returns an object whose end is the current month’s last date.
 */
export const endOfThisMonth = () => {
  return {
    end: moment(currentDate).endOf("month").format(DATE_FORMAT),
  };
};

/**
 * returns an object whose end is the last month’s last date.
 */
export const endOfLastMonth = () => {
  return {
    end: moment(currentDate).subtract(1, "months").endOf("month").format(DATE_FORMAT),
  };
};
