'use strict';

(function () {
  window.addEventListener('load', function () {
    page.inactivate();
  });

  window.page = {
    activate: function () {
      form.activate();
      map.activate();
      filter.activate();
      pinMain.activate();
    },
    inactivate: function () {
      map.inactivate();
      form.disable();
      filter.disable();
      pinMain.init();
    }
  };
})();
