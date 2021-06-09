/**
 * Checks if the two given arrays are the same
 *
 * @param {object} a - array
 * @param {object} b - array
 * @return {boolean}
 */
 function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) {
      if (typeof a[i] === 'object' && a[i].length === undefined &&
          typeof b[i] === 'object' && b[i].length === undefined &&
          isEquivalent(a[i], b[i])) {

      } else if (typeof a[i] === 'object' && a[i].length !== undefined &&
                 typeof b[i] === 'object' && b[i].length !== undefined &&
                 arraysEqual(a[i], b[i])) {

      } else {
        return false;
      }
    }
  }
  return true;
}

/**
 * Checks if the two given objects are the same, namely having the exact same
 * properties with the exact same values in each.
 *
 * @param {object} a
 * @param {object} b
 * @return {boolean}
 */
function isEquivalent(a, b) {
  const aProps = Object.getOwnPropertyNames(a);
  const bProps = Object.getOwnPropertyNames(b);

  if (aProps.length != bProps.length) {
    return false;
  }

  for (let i = 0; i < aProps.length; i++) {
    const propName = aProps[i];

    if (a[propName] !== b[propName]) {
      if (typeof a[propName] === 'object' && a[propName].length === undefined &&
          typeof b[propName] === 'object' && b[propName].length === undefined &&
          isEquivalent(a[propName], b[propName])) {

      } else if (typeof a[propName] === 'object' && a[propName].length !== undefined &&
                 typeof b[propName] === 'object' && b[propName].length !== undefined &&
                 arraysEqual(a[propName], b[propName])) {

      } else {
        return false;
      }
    }
  }

  return true;
}

export {
  arraysEqual,
  isEquivalent
};