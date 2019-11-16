'use strict';

(function () {
  window.addEventListener('load', function () {
    window.page.inactivate();
  });

  window.page = {
    activate: function () {
      window.form.activate();
      window.map.activate();
      window.filter.activate();
      window.pinMain.activate();
    },
    inactivate: function () {
      window.map.inactivate();
      window.form.disable();
      window.filter.disable();
      window.pinMain.init();
    }
  };
})();
