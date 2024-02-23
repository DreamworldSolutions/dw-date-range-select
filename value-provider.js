import dayjs from 'dayjs/esm/index.js';

const DATE_FORMAT = 'YYYY-MM-DD';
var currentDate;

export const _setCurrentDate = timestamp => {
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
  return { end: dayjs(currentDate).format(DATE_FORMAT) };
};

/**
 *
 * @returns {Object} yesterday date in yyyy-mm-dd format
 */
export const yesterday = () => {
  return { end: dayjs(currentDate).subtract(1, 'd').format(DATE_FORMAT) };
};

/**
 *
 * @returns {Object} tomorrow date in yyyy-mm-dd format
 */
export const tomorrow = () => {
  return {
    end: dayjs(currentDate).add(1, 'd').format(DATE_FORMAT),
  };
};

/**
 * returns an object whose start & end is the current month’s first & last date.
 */
export const thisMonth = () => {
  return {
    start: dayjs(currentDate).startOf('month').format(DATE_FORMAT),
    end: dayjs(currentDate).endOf('month').format(DATE_FORMAT),
  };
};

/**
 * returns an object whose start & end is the last month’s first & last date.
 */
export const lastMonth = () => {
  return {
    start: dayjs(currentDate).subtract(1, 'months').startOf('month').format(DATE_FORMAT),
    end: dayjs(currentDate).subtract(1, 'months').endOf('month').format(DATE_FORMAT),
  };
};

/**
 * returns an object whose end is the current month’s last date.
 */
export const endOfThisMonth = () => {
  return {
    end: dayjs(currentDate).endOf('month').format(DATE_FORMAT),
  };
};

/**
 * returns an object whose end is the last month’s last date.
 */
export const endOfLastMonth = () => {
  return {
    end: dayjs(currentDate).subtract(1, 'months').endOf('month').format(DATE_FORMAT),
  };
};
