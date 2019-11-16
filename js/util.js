'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.util = {
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE,

    disabledForm: function (form) {
      var input = form.querySelectorAll('input');
      if (input.length > 0) {
        for (var i = 0; i < input.length; i++) {
          input[i].disabled = true;
        }
      }

      var selects = form.querySelectorAll('select');
      if (selects.length > 0) {
        for (var i = 0; i < selects.length; i++) {
          selects[i].disabled = true;
        }
      }
    },
    activatedForm: function (form) {
      var input = form.querySelectorAll('input');
      if (input.length > 0) {
        for (var i = 0; i < input.length; i++) {
          input[i].disabled = false;
        }
      }

      var selects = form.querySelectorAll('select');
      if (selects.length > 0) {
        for (var i = 0; i < selects.length; i++) {
          selects[i].disabled = false;
        }
      }
    }
  };
})();

