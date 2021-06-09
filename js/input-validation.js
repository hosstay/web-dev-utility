import {toTitleCase} from './utility';
import {dateToYYYYMMDD,
  dateToMMDDYYYY} from './formatters';

// Load Modifier
function loadDateMMDDYYYYModifier(value) {
  return dateToMMDDYYYY(value);
};

// Character Validators
function charNumberValidator(event) {
  if (event.data !== null && !/^[0-9]$/.test(event.data)) {
    event.target.value = event.target.value.substring(0, event.target.value.length - 1);
  }
};

function charDateValidator(event) {
  if (event.data !== null && !/^([0-9]|\/|-)$/.test(event.data)) {
    event.target.value = event.target.value.substring(0, event.target.value.length - 1);
  }
};

function charTaxIdValidator(event) {
  if (event.data !== null && !/^([0-9]|-)$/.test(event.data)) {
    event.target.value = event.target.value.substring(0, event.target.value.length - 1);
  }
};

function charLetterValidator(event) {
  if (event.data !== null && !/^[a-zA-Z]$/.test(event.data)) {
    event.target.value = event.target.value.substring(0, event.target.value.length - 1);
  }
};

function charPhoneValidator(event) {
  if (event.data !== null && !/^[\+\(\)\s\.0-9\-]$/.test(event.data)) {
    event.target.value = event.target.value.substring(0, event.target.value.length - 1);
  }
};

// Paste Validators
function pasteNumberValidator(event) {
  const paste = (event.clipboardData || window.clipboardData).getData('text');

  if (!/^[0-9]+$/.test(paste)) {
    event.returnValue = false;
  }
};

function pasteDateCharacterValidator(event) {
  const paste = (event.clipboardData || window.clipboardData).getData('text');

  if (!/^([0-9]|\/|-)+$/.test(paste)) {
    event.returnValue = false;
  }
};

function pasteTaxIdValidator(event) {
  const paste = (event.clipboardData || window.clipboardData).getData('text');

  if (!/^([0-9]|-)+$/.test(paste)) {
    event.returnValue = false;
  }
};

function pasteLetterValidator(event) {
  const paste = (event.clipboardData || window.clipboardData).getData('text');

  if (!/^[a-zA-Z]+$/.test(paste)) {
    event.returnValue = false;
  }
};

function pastePhoneValidator(event) {
  const paste = (event.clipboardData || window.clipboardData).getData('text');

  if (!/^[\+\(\)\s\.0-9\-]+$/.test(paste)) {
    event.returnValue = false;
  }
};

// Change Validators
function changeYesNoValidator(event) {
  if (/^(yes|no)$/i.test(event.target.value) || event.target.value === '') {
    event.target.classList.remove('invalid');
  } else {
    event.target.classList.add('invalid');
  }
};

function changeTaxIdValidator(event) {
  if (/^([0-9]{2}-[0-9]{7}|[0-9]{9})$/.test(event.target.value) || event.target.value === '') {
    event.target.classList.remove('invalid');
  } else {
    event.target.classList.add('invalid');
  }
};

function changePhoneValidator(event) {
  if (/^\+?[\s\.0-9]*\(?[0-9]{1,4}\)?[-\s\.0-9]*$/.test(event.target.value) || event.target.value === '') {
    event.target.classList.remove('invalid');
  } else {
    event.target.classList.add('invalid');
  }
};

function changeEmailValidator(event) {
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(event.target.value) || event.target.value === '') {
    event.target.classList.remove('invalid');
  } else {
    event.target.classList.add('invalid');
  }
};

function changePasswordValidator(event) {
  if (event.target.value.match(/^(?=(?:\S*\d))(?=(?:\S*[A-Za-z]))(?=\S*[^A-Za-z0-9])\S{8,}/) || event.target.value === '') {
    event.target.classList.remove('invalid');
  } else {
    event.target.classList.add('invalid');
  }
};

// Submit Modifier
function submitDateModifier(value) {
  return dateToYYYYMMDD(value);
};

function submitTaxIdModifier(value) {
  if (/^[0-9]{2}-[0-9]{7}$/.test(value)) {
    // Good
  } else if (/^[0-9]{9}$/.test(value)) {
    value = value.substring(0, 2) + '-' + value.substring(2);
  }

  return value;
};

function submitTitleCaseModifier(value) {
  return toTitleCase(value);
};

export {
  loadDateMMDDYYYYModifier,
  charNumberValidator,
  charDateValidator,
  charTaxIdValidator,
  charLetterValidator,
  charPhoneValidator,
  pasteNumberValidator,
  pasteDateCharacterValidator,
  pasteTaxIdValidator,
  pasteLetterValidator,
  pastePhoneValidator,
  changeYesNoValidator,
  changeTaxIdValidator,
  changePhoneValidator,
  changeEmailValidator,
  changePasswordValidator,
  submitDateModifier,
  submitTaxIdModifier,
  submitTitleCaseModifier
};