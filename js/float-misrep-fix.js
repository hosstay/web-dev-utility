/**
 * This function solves Javascript's float misrepresentation
 *
 * @param {number} n float to fix
 * @return {number} float without float misrepresentation
*/
function fixFloatError(n) {
  return Math.round(n * 1000000000) / 1000000000;
}

/**
 * This function rounds floats while accounting for float misrepresentation
 *
 * @param {number} n float to round
 * @param {number} i integer rounding place
 * @return {number} float rounded
*/
function roundFloat(n, i=0) {
  i = i === 0 ? 1 : (Math.pow(10, i));
  let r = n * i;
  r = fixFloatError(r);
  r = Math.round(r);
  r = r / i;
  r = fixFloatError(r);
  return r;
}

/**
 * This function rounds floats while accounting for float misrepresentation
 * and also converts it to a string with the specified number of digits after the decimal.
 *
 * @param {number} n float to round
 * @param {number} i integer rounding place
 * @return {string} float rounded and given specified number of digits after the decimal.
*/
function fixedToFixed(n, i) {
  n = String(roundFloat(n, i));

  const decimalLocation = n.search(/\./);

  if (i > 0) {
    if (decimalLocation !== -1) {
      while (n.match(/\.(\d*)/)[1].length !== i) {
        n += '0';
      }
    } else {
      n += '.';
      for (let j = 0; j < i; j++) {
        n += '0';
      }
    }
  }

  return n;
}

export {
  fixFloatError,
  roundFloat,
  fixedToFixed
};