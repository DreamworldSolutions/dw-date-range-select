import dayjs from "dayjs/esm/index.js";

/**
 *
 * @param {String} value input date in string in any below format
 *  - dd/mm/yyyy (or mm/dd/yyyy)
 *  - dd-mm-yyyy (or mm-dd-yyyy)
 *  - yyyy-mm-dd
 *  - yyyy/mm/dd
 *  - DD MMM, YYYY
 *  - DD MMM YYYY
 *  - MMM DD, YYYY
 *  - MMM DD YYYY
 * @param {String} format date format
 * @returns {String} parsed date in dd/mm/yyyy (default), mm/dd/yyyy
 */
export const dateParse = (value, format) => {
  value = value || "";
  value = value.trim();
  let date;
  if(!isNaN(value)) {
    date = parseSamrtFormat(value, format);
  } else {
    date = parseDate(value, format);
  }

  if(dayjs(date, format, true).isValid()) {
    return date;
  }

  date = parseDate(value.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '), format);
  return dayjs(date, format, true).isValid() ? date: null;
};

const knownFormats = [
  "DD/MM/YYYY",
  "MM/DD/YYYY",
  "DD-MM-YYYY",
  "MM-DD-YYYY",
  "YYYY-MM-DD",
  "YYYY/MM/DD",
  "DD / MM / YYYY",
  "MM / DD / YYYY",
  "DD - MM - YYYY",
  "MM - DD - YYYY",
  "YYYY - MM - DD",
  "YYYY / MM / DD",
  "DD MMM, YYYY",
  "DD MMM YYYY",
  "MMM DD, YYYY",
  "MMM DD YYYY",
  "MMMM D, YYYY",
  "MMMM DD, YYYY",
];

const sortKnownFormats = [
  "D MMMM",
  "MMMM D",
  "D MMM",
  "MMM D",
  "D MM",
  "MM D",
  "D M",
  "M D",
  "DD MMMM",
  "MMMM DD",
  "DD MMM",
  "MMM DD",
  "DD MM",
  "MM DD",
  "M DD",
  "DD M",
  "DD/MM",
  "MM/DD",
  "M/DD",
  "DD/M",
  "DD / MM",
  "MM / DD",
  "M / DD",
  "DD / M",
];

const parseDate = (value, format) => {
  if(dayjs(value, knownFormats, true).isValid()) {
    return dayjs(value, knownFormats, true).format(format);
  }

  if(dayjs(value, sortKnownFormats, true).isValid()) {
    const date = dayjs(value, sortKnownFormats, true).format(format);
    const month = dayjs(date, format).get('month') + 1;
    return dayjs(date, format).set('year', getNearestYear(month)).format(format);
  }
  return "";
}

const parseSamrtFormat = (value, format) => {
  let date = getParseDate(value, false)
  const daysInMonth = dayjs(`${date.year}-${date.month}`, ['YYYY-MM', 'YYYY-M'], true).daysInMonth();
  if(daysInMonth && !isNaN(daysInMonth) && daysInMonth < date.day) {
    date = getParseDate(value, true);
  }
  return dayjs().set('date', date.day).set('month', +date.month - 1).set('year', date.year).format(format);
};

const getParseDate = (value, onlyFirstDate) => {
  const month = findMonth(value, onlyFirstDate) || dayjs().get('month') + 1;
  return {
    day: findDate(value, onlyFirstDate) || dayjs().get('date'),
    month: month,
    year: findYear(value, onlyFirstDate) || getNearestYear(month)
  }
}

const findDate = (value, onlyFirstDate) => {
  if(!value) {
    return '';
  }

  if(value.length === 1) {
    return value
  }

  if(onlyFirstDate) {
    return value.charAt(0);
  }
  
  const nDate = (value.charAt(0) + value.charAt(1));
  return +nDate > 31 ? value.charAt(0): nDate;
}

const findMonth = (value, onlyFirstDate) => {
  const replaceValue = value.replace(new RegExp(`^${findDate(value, onlyFirstDate)}`), '');
  if(!replaceValue) {
    return '';
  }

  if(replaceValue.length === 1) {
    return (replaceValue);
  }

  const nMonth = replaceValue.charAt(0) + replaceValue.charAt(1);
  return +nMonth > 12 ? (replaceValue.charAt(0)): nMonth;
}

const findYear = (value, onlyFirstDate) => {
  const replaceValue = value.replace(new RegExp(`^${findDate(value, onlyFirstDate)}${findMonth(value, onlyFirstDate)}`), '');
  if(!replaceValue) {
    return '';
  }

  return replaceValue.length < 4 ? '' + (2000 + (+replaceValue)): replaceValue.slice(0, 4);
}

const getNearestYear = (month) => {
  month = month - 1;
  const cMonth = dayjs().get('month');
  const cYear = dayjs().get('year');
  if(cMonth === month) {
    return cYear;
  }
  
  const beforeMonth = cMonth > month;
  if(beforeMonth) {
    const diff1 = dayjs(`${cYear}-${cMonth}-01`).diff(`${cYear}-${month}-01`, 'month');
    const diff2 = dayjs(`${cYear + 1}-${month}-01`).diff(`${cYear}-${cMonth}-01`, 'month');
    return diff2 < diff1 ? cYear + 1: cYear;
  }

  const diff1 = dayjs(`${cYear}-${month}-01` ).diff(`${cYear}-${cMonth}-01`, 'month');
  const diff2 = dayjs(`${cYear}-${cMonth}-01`).diff(`${cYear - 1}-${month}-01`, 'month');
  return diff2 < diff1 ? cYear - 1: cYear;
}