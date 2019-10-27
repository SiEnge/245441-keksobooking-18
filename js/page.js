'use strict';

var mapPins = document.querySelector('.map__pins');

// инициализация страницы при загрузке страницы
var initializationPage = function () {
  for (var i = 0; i < formFieldsets.length; i++) {
    formFieldsets[i].disabled = true;
  }
  adForm.querySelector('#address').value = (pinMain.offsetLeft + (PIN_MAIN_WIDTH / 2)) + ', ' + (pinMain.offsetTop + (PIN_MAIN_HEIGHT / 2));
};

// активация страницы
var activatePage = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  for (var i = 0; i < formFieldsets.length; i++) {
    formFieldsets[i].disabled = false;
  }
  adForm.querySelector('#address').value = (pinMain.offsetLeft + (PIN_MAIN_WIDTH / 2)) + ', ' + (pinMain.offsetTop + PIN_MAIN_HEIGHT);
  clearMapPins();
  fillMapPins();
};

window.addEventListener('load', function () {
  initializationPage();
});

