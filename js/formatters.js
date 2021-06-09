/**
 * Formatter Function
 * Takes in a string that should be a date and attempts to format it to
 * be of the form: MM/DD/YY
 * Designed to be the one stop shop string dates get sent into before
 * attempting to convert them to other types, so all conversions come
 * from the same source format.
 * Add more cases to this as requirements dictate.
 *
 * @param {object} value
 * @return {string}
 */
function toDateFormat(value) {
  // trim the value first
  value = value.trim();

  // convert - to /
  value = value.replace(/\d( |-)/g, (match) => {
    return match.replace(/( |-)/g, '/');
  });

  // add 0's to single digits
  const parts = value.split('/');
  value = '';

  for (let i = 0; i < parts.length; i++) {
    if (parts[i].length == 1) {
      parts[i] = '0' + parts[i];
    }

    value += parts[i] + '/';
  }

  value = value.substring(0, value.length - 1);

  // variations of yyyy/mm/dd
  // '2020/02/01' -> '02/01/20'
  if (value.length === 10 && /[\d]{4}\/[\d]{2}\/[\d]{2}/.test(value)) {
    const year = value.substring(0, 4);
    const monthAndDay = value.substring(5);

    value = `${monthAndDay}/${year}`;
  }

  // variations of mm/dd/yy
  // '01/02' -> '01/02/20'
  // '01/02' -> '01/02/20'
  if (value.length === 5 && /[\d]{2}\/[\d]{2}/.test(value)) {
    const currYear = new Date().getFullYear().toString().slice(-2);
    value = value += '/' + currYear;
  }

  // '01/02/2020' -> '01/02/20'
  if (value.length === 10 && /[\d]{2}\/[\d]{2}/.test(value)) {
    value = value.substring(0, value.length - 4) + value.substring(value.length - 2);
  }

  // '010202' -> '01/02/02'
  if (value.length === 6 && /[\d]{6}/.test(value)) {
    value = value.replace(/[\d]{2}/g, (match) => {
      return match += '/';
    });
    value = value.substring(0, value.length - 1);
  }

  // '0102' -> '01/02/20'
  if (value.length === 4 && /[\d]{4}/.test(value)) {
    const currYear = new Date().getFullYear().toString().slice(-2);

    if (value.slice(-2) == currYear) {
      const dayAndMonth = value.substring(0, 2);
      value = dayAndMonth.replace(/\d/g, (num) => {
        return '0' + num + '/';
      });
      value += currYear;
    } else {
      value = value.replace(/[\d]{2}/g, (match) => {
        return match += '/';
      });
      value = value += currYear;
    }
  }

  // '12' -> '01/02/20'
  if (value.length === 2 && /[\d]{2}/.test(value)) {
    value = value.replace(/\d/g, (num) => {
      return '0' + num + '/';
    });
    const currYear = new Date().getFullYear().toString().slice(-2);
    value = value += currYear;
  }

  return value;
}

/**
 * Formatter Function
 * Takes in a string that should be a date and attempts to format it to
 * be of the form: YYYY-MM-DD
 *
 * @param {object} date
 * @return {string}
 */
function dateToYYYYMMDD(date) {
  date = toDateFormat(date);

  const thisYearPrefix = String((new Date()).getFullYear()).substring(0, 2);

  const month = date.substring(0, 2);
  const day = date.substring(3, 5);
  const year = thisYearPrefix + date.substring(6, 9);

  return `${year}-${month}-${day}`;
}

/**
 * Formatter Function
 * Takes in a string that should be a date and attempts to format it to
 * be of the form: MM/DD/YYYY
 *
 * @param {object} date
 * @return {string}
 */
function dateToMMDDYYYY(date) {
  date = toDateFormat(date);

  const month = date.substring(0, 2);
  const day = date.substring(3, 5);
  const year = date.substring(6, 9);
  const currYear = new Date().getFullYear().toString().slice(0, 2);

  return `${month}/${day}/${currYear}${year}`;
}

export {
  toDateFormat,
  dateToYYYYMMDD,
  dateToMMDDYYYY
};