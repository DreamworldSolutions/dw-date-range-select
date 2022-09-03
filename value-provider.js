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
