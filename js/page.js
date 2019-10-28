'use strict';
(function () {
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var pinMain = document.querySelector('.map__pin--main');

  // активация страницы
  window.activatePage = function () {
    map.classList.remove('map--faded');
    activationForm();
    
    clearMapPins();
    fillMapPins();
  };

  window.addEventListener('load', function () {
    deactivationForm();
  });
})();


