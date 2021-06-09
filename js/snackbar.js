/*
  SNACKBAR

  Requires element named 'saved-snackbar'
*/

/**
 * Shows snackbar with provided text.
 *
 * @param {string} text
 */
 async function startSnackbar(text) {
  try {
    const savedSnackbar = document.getElementById('saved-snackbar');
    if (savedSnackbar) {
      savedSnackbar.innerHTML = text;
      savedSnackbar.classList.add('show');
    }

    // If there is no timeout here the snackbar doesn't get shown because
    // Ag-grid takes over the page to do its processing.
    await timeoutPromise(500);
  } catch (err) {
    return errorHandler({err: err, context: 'startSnackbar'});
  }
}

/**
 * Waits designated amount of time and then hides the snackbar.
 *
 * @param {element} savedSnackbar
 * @param {integer} time - ms
 */
async function snackbarWaiter(savedSnackbar, time) {
  try {
    await timeoutPromise(time);

    savedSnackbar.classList.add('hide');
    savedSnackbar.classList.remove('show');
  } catch (err) {
    return errorHandler({err: err, context: 'snackbarWaiter'});
  }
}

/**
 * Displays new text on snackbar, waits designated time, then hides snackbar.
 *
 * @param {string} text
 * @param {integer} time
 */
async function endSnackbar(text, time = 3000) {
  try {
    const savedSnackbar = document.getElementById('saved-snackbar');
    if (savedSnackbar) {
      savedSnackbar.innerHTML = text;
      await snackbarWaiter(savedSnackbar, time);
    }
  } catch (err) {
    return errorHandler({err: err, context: 'endSnackbar'});
  }
}

/**
 * Shows snackbar with text, waits designated time, then hides snackbar.
 *
 * @param {string} text
 * @param {integer} time
 */
async function quickSnackbar(text, time = 5000) {
  try {
    const savedSnackbar = document.getElementById('saved-snackbar');
    if (savedSnackbar) {
      savedSnackbar.innerHTML = text;
      savedSnackbar.classList.add('show');

      // If there is no timeout here the snackbar doesn't get shown because
      // Ag-grid takes over the page to do its processing.
      await timeoutPromise(500);

      snackbarWaiter(savedSnackbar, time);
    }
  } catch (err) {
    return errorHandler({err: err, context: 'quickSnackbar'});
  }
}

/**
 * Makes the snackbar take up essentially the entire screen.
 */
async function inflateSnackbar() {
  const savedSnackbar = document.getElementById('saved-snackbar');
  if (savedSnackbar) {
    savedSnackbar.classList.add('inflate');
  }
}

/**
 * Reverts the snackbar to it's original size after being inflated.
 */
function deflateSnackbar() {
  const savedSnackbar = document.getElementById('saved-snackbar');
  if (savedSnackbar) {
    savedSnackbar.classList.remove('inflate');
  }
}

export {
  startSnackbar,
  snackbarWaiter,
  endSnackbar,
  quickSnackbar,
  inflateSnackbar,
  deflateSnackbar
};