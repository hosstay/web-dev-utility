/**
 *
 * RENDERER
 *
 **/

export function resizableTextAreaRenderer() {
}

resizableTextAreaRenderer.prototype.init = function(params) {
  this.input = document.createElement('textarea');
  this.input.classList.add('resizable-text-area');
  this.input.style.width = '10vw';
  this.input.style.height = '2.5vh';
  this.input.style.marginTop = '-0.3vh';
  this.input.style.marginLeft = '-0.1vw';
  this.input.style.overflow = 'hidden';
  this.input.style.resize = 'none';
  this.input.style.border = 'none';
  this.input.value = params.value;
};

resizableTextAreaRenderer.prototype.getGui = function() {
  return this.input;
};

/**
 *
 * EDITOR
 *
 **/

export function resizableTextAreaEditor() {
}

resizableTextAreaEditor.prototype.init = function(params) {
  function resizeTextarea(elem) {
    const findNumberOfNL = (str) => {
      let counter = 0;

      for (let i = 0; i < str.length; i++) {
        if (str[i] === '\n') {
          counter++;
        }
      }

      return counter;
    };

    const findLongestLine = (str) => {
      const lines = str.split('\n');

      let longestStr = '';

      for (let i = 0; i < lines.length; i++) {
        if (lines[i].length > longestStr.length) {
          longestStr = lines[i];
        }
      }

      return longestStr;
    };

    const element = this;

    element.parentElement.style.width = 'auto';
    element.parentElement.style.height = 'auto';
    element.parentElement.style.zIndex = '9999';
    element.parentElement.parentElement.style.zIndex = '9999';

    element.style.width = 'auto';
    element.style.height = 'auto';

    if (element === document.activeElement) {
      const numberOfNL = findNumberOfNL($(element).val());
      $(element).attr('rows', numberOfNL > 1 ? numberOfNL + 2: 3);
      const longestLineLength = findLongestLine($(element).val()).length;
      const calculatedCols = longestLineLength + longestLineLength * 0.084;
      $(element).attr('cols', calculatedCols > 22 ? calculatedCols : 22);
    }
  }

  const exitEvent = async (event) => {
    this.input.style.width = '9vw';
    this.input.style.height = '2vh';
    this.input.parentElement.style.zIndex = null;
    this.input.parentElement.parentElement.style.zIndex = null;
    params.stopEditing();
  };

  const handleKeyPresses = (event) => {
    const keyCode = event.keyCode || event.which;
    const KEY_TAB = 9;
    const KEY_ENTER = 13;
    const KEY_ESCAPE = 27;

    if (keyCode === KEY_ENTER) {
      event.preventDefault();
      this.input.value += '\n';
      return false;
    } else if (keyCode === KEY_TAB) {
      event.preventDefault();
      this.input.value += '\t';
      return false;
    } else if (keyCode === KEY_ESCAPE) {
      event.preventDefault();
      exitEvent(event);
    }
  };

  this.data = params.node.data;

  this.input = document.createElement('textarea');
  this.input.classList.add('resizable-text-area');
  this.input.style.width = '9vw';
  this.input.style.height = '2vh';
  this.input.style.overflow = 'hidden';
  this.input.style.resize = 'none';
  this.input.value = params.value;

  $(this.input).keyup(resizeTextarea);
  $(this.input).click(resizeTextarea);
  $(this.input).focusout(exitEvent);
  $(this.input).keydown(handleKeyPresses);
};

resizableTextAreaEditor.prototype.getGui = function() {
  return this.input;
};

resizableTextAreaEditor.prototype.afterGuiAttached = function() {
  this.input.focus();
  this.input.click();
};

resizableTextAreaEditor.prototype.getValue = function() {
  return this.input.value;
};

resizableTextAreaEditor.prototype.destroy = function() {
};

/**
 *
 * VIEWER
 *
 **/

export function resizableTextAreaViewer() {
}

resizableTextAreaViewer.prototype.init = function(params) {
  function resizeTextarea(elem) {
    const findNumberOfNL = (str) => {
      let counter = 0;

      for (let i = 0; i < str.length; i++) {
        if (str[i] === '\n') {
          counter++;
        }
      }

      return counter;
    };

    const findLongestLine = (str) => {
      const lines = str.split('\n');

      let longestStr = '';

      for (let i = 0; i < lines.length; i++) {
        if (lines[i].length > longestStr.length) {
          longestStr = lines[i];
        }
      }

      return longestStr;
    };

    const element = this;

    element.parentElement.style.width = 'auto';
    element.parentElement.style.height = 'auto';
    element.parentElement.style.zIndex = '9999';
    element.parentElement.parentElement.style.zIndex = '9999';

    element.style.width = 'auto';
    element.style.height = 'auto';

    if (element === document.activeElement) {
      const numberOfNL = findNumberOfNL($(element).val());
      $(element).attr('rows', numberOfNL > 1 ? numberOfNL + 2: 3);
      const longestLineLength = findLongestLine($(element).val()).length;
      const calculatedCols = longestLineLength + longestLineLength * 0.084;
      $(element).attr('cols', calculatedCols > 22 ? calculatedCols : 22);
    }
  }

  const exitEvent = async (params) => {
    this.input.style.width = '9vw';
    this.input.style.height = '2vh';
    this.input.parentElement.style.zIndex = null;
    this.input.parentElement.parentElement.style.zIndex = null;
  };

  const handleKeyPresses = (event) => {
    const keyCode = event.keyCode || event.which;
    const KEY_LEFT = 37;
    const KEY_UP = 38;
    const KEY_RIGHT = 39;
    const KEY_DOWN = 40;

    if (keyCode !== KEY_LEFT &&
        keyCode !== KEY_UP &&
        keyCode !== KEY_RIGHT &&
        keyCode !== KEY_DOWN) {
      event.preventDefault();
      return false;
    }
  };

  this.data = params.node.data;

  this.input = document.createElement('textarea');
  this.input.classList.add('resizable-text-area');
  this.input.style.width = '9vw';
  this.input.style.height = '2vh';
  this.input.style.overflow = 'hidden';
  this.input.style.resize = 'none';
  this.input.value = params.value;

  $(this.input).keyup(resizeTextarea);
  $(this.input).click(resizeTextarea);
  $(this.input).focusout(exitEvent);
  $(this.input).keydown(handleKeyPresses);
};

resizableTextAreaViewer.prototype.getGui = function() {
  return this.input;
};

resizableTextAreaViewer.prototype.afterGuiAttached = function() {
  this.input.focus();
  this.input.click();
};

resizableTextAreaViewer.prototype.getValue = function() {
  return this.input.value;
};

resizableTextAreaViewer.prototype.destroy = function() {
};