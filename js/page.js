'use strict';
(function () {
  // var mapPins = document.querySelector('.map__pins');
  // var pinMain = document.querySelector('.map__pin--main');

  // активация страницы
  window.activatePage = function () {
    var map = document.querySelector('.map');
    map.classList.remove('map--faded');
    activationForm();
    
    
  };

  window.addEventListener('load', function () {
    deactivationForm();
    // resetForm();
  });
})();


