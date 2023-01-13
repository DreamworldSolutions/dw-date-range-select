import moment from "moment";

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
 *
 * @returns {Object} today date in yyyy-mm-dd format
 */
export const today = () => {
  return {
    end: moment(currentDate).format(DATE_FORMAT),
  };
};

/**
 *
 * @returns {Object} yesterday date in yyyy-mm-dd format
 */
export const yesterday = () => {
  return {
    end: moment(currentDate).subtract(1, "d").format(DATE_FORMAT),
  };
};

/**
 *
 * @returns {Object} tomorrow date in yyyy-mm-dd format
 */
export const tomorrow = () => {
  return {
    end: moment(currentDate).add(1, "d").format(DATE_FORMAT),
  };
};

/**
 * returns an object whose start & end is the current month’s first & last date.
 */
export const thisMonth = () => {
  return {
    start: moment(currentDate).startOf("month").format(DATE_FORMAT),
    end: moment(currentDate).endOf("month").format(DATE_FORMAT),
  };
};

/**
 * returns an object whose start & end is the last month’s first & last date.
 */
export const lastMonth = () => {
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
