export const _setCurrentDate = (timestamp) => {};

/**
 * factory function (valueProvider)
 * returns a function (which acts as valueProvider and returns last N months start and end date)
 * @param {Number} n is positive integer
 */
export const lastNMonths = (n) => {};

/**
 * factory function (valueProvider)
 * returns a function (which acts as valueProvider and returns this Quarter start and end date)
 * @param {String} fyStartsFrom is String in the format “dd/mm”.
 */
export const thisQuarter = (fyStartsFrom) => {};

/**
 * factory function (valueProvider)
 * returns a function (which acts as valueProvider and returns last Quarter start and end date)
 * @param {String} fyStartsFrom is String in the format “dd/mm”.
 */
export const lastQuarter = (fyStartsFrom) => {};

/**
 * factory function (valueProvider)
 * returns a function (which acts as valueProvider and returns this financian year start and end date)
 * @param {String} startsFrom is String in the format “dd/mm”.
 */
export const thisFinancialYear = (startsFrom) => {};

/**
 * factory function (valueProvider)
 * returns a function (which acts as valueProvider and returns last financian year start and end date)
 * @param {String} startsFrom is String in the format “dd/mm”.
 */
export const lastFinancialYear = (startsFrom) => {};
