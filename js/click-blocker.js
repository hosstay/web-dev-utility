/*
  CLICK BLOCKER

  requires element for use as a click blocker
*/

/**
 * Shows click blocker.
 *
 * @param {string} elementName
 */
 async function startClickBlocker(elementName = 'click-blocker') {
  try {
    const clickBlocker = document.getElementById(elementName);

    if (clickBlocker) clickBlocker.className = 'show';
  } catch (err) {
    return errorHandler({err: err, context: 'startClickBlocker'});
  }
}

/**
 * Hides click blocker.
 *
 * @param {string} elementName
 */
async function endClickBlocker(elementName = 'click-blocker') {
  try {
    const clickBlocker = document.getElementById(elementName);

    if (clickBlocker) clickBlocker.className = 'hide';
  } catch (err) {
    return errorHandler({err: err, context: 'endClickBlocker'});
  }
}

export {
  startClickBlocker,
  endClickBlocker
};