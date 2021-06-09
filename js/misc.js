/**
 * Calls the function or class function until it returns true, every pollTime.
 *
 * @param {function|class} funcOrClass - either a function or a class (with cooresponding funcName) to check.
 * @param {string} funcName - class function name. only relevant if funcOrClass is a class
 * @param {number} pollTime - time in betweeen calls
 * @return {promise} - resolves when func returns affirmative response.
 */
function waitForFinish(funcOrClass, funcName, pollTime = 400) {
  let poll;

  if (typeof funcOrClass === 'function') {
    poll = (resolve) => {
      if (!funcOrClass()) resolve();
      else setTimeout(() => poll(resolve), pollTime);
    };
  } else {
    poll = (resolve) => {
      if (!funcOrClass[funcName](funcOrClass)) resolve();
      else setTimeout(() => poll(resolve), pollTime);
    };
  }

  return new Promise(poll);
}

/**
 * Promise function that waits a designated amount of milliseconds
 *
 * @param {number} ms
 * @return {boolean} - true on resolution.
 */
function timeoutPromise(ms) {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        return resolve(true);
      }, ms);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
}

/**
 * Creates an array of integers that goes from 'start' to 'end' stepping by 'step'
 * --emulation of python's range function
 *
 * @param {number} start - starting integer
 * @param {number} stop - ending integer
 * @param {number} step - steps between each integer
 * @return {array} - array of integers
 */
 function range(start, stop, step) {
  if (stop === undefined) {
    // one param defined
    stop = start;
    start = 0;
  }
  if (step === undefined) {
    step = 1;
  }
  const result = [];
  for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
    result.push(i);
  }

  return result;
}

/**
 * Checks a password against specified criteria to guarentee its password-like.
 *
 * @param {string} password - password to be validated.
 * @return {boolean} - Whether or not the password met specified criteria.
 */
 function validatePassword(password) {
  if (!password.match((/^(?=(?:\S*\d))(?=(?:\S*[A-Za-z]))(?=\S*[^A-Za-z0-9])\S{8,}/))) {
    return false;
  } else {
    return true;
  }
}

/**
 * Takes in a string and makes sure it looks like a number.
 *
 * @param {string} val
 * @return {boolean}
 */
function isNumber(val) {
  return val !== '' && /^-?\d*\.?\d*$/.test(val);
};

/**
 * Converts string to title case
 * ex. i am a string => I Am A String
 *
 * @param {string} str
 * @return {string}
 */
function toTitleCase(str) {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

/**
 * Converts string to a style the database likes for column names.
 * ex. i am &%^$ string, aren't i? => i_am______string__aren_t_i
 *
 * @param {string} str
 * @return {string}
 */
function toDatabaseCase(str) {
  return str.toLowerCase().replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, '_');
}

export {
  waitForFinish,
  timeoutPromise,
  range,
  validatePassword,
  isNumber,
  toTitleCase,
  toDatabaseCase
};