'use strict';

(function () {
  window.addEventListener('load', function () {
    page.inactivate();
  });

  window.page = {
    activate: function () {
      activateAdForm(); 
      map.activate(); 
      activateFilterForm();  

      initPinMain(); 
      pinMain.removeEventListener('mousedown', page.activate);
      pinMain.removeEventListener('keydown', onPinMainEnterPress);
    },
    inactivate: function () {
      map.inactivate();
      disableAdForm();
      disableFilterForm();

      initPinMain();
      pinMain.addEventListener('mousedown', page.activate);
      pinMain.addEventListener('keydown', onPinMainEnterPress);
    }
  };
})();
