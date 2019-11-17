'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.util = {
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE,

    disabledForm: function (form) {
      var inputElements = form.querySelectorAll('input');
      if (inputElements.length > 0) {
        inputElements.forEach(function (element) {
          element.disabled = true;
        });
      }

      var selectElements = form.querySelectorAll('select');
      if (selectElements.length > 0) {
        selectElements.forEach(function (element) {
          element.disabled = true;
        });
      }
    },

    activatedForm: function (form) {
      var inputElements = form.querySelectorAll('input');
      if (inputElements.length > 0) {
        inputElements.forEach(function (element) {
          element.disabled = false;
        });
      }

      var selectElements = form.querySelectorAll('select');
      if (selectElements.length > 0) {
        selectElements.forEach(function (element) {
          element.disabled = false;
        });
      }
    }
  };
})();

