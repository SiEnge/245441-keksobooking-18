'use strict';

var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

// заполнение блока map__pins
var fillMapPins = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < offers.length; i++) {
    fragment.appendChild(createElementPin(i, offers[i]));
  }
  mapPins.appendChild(fragment);


  var pins = mapPins.querySelectorAll('.map__pin');
  for (var j = 0; j < pins.length; j++) {
    if (pins[j] === pinMain) {
      continue;
    }
    pins[j].addEventListener('click', openPopupCard);

    pins[j].addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        openPopupCard(evt);
      }
    });
  }
};

// очистка блока map_pins
var clearMapPins = function () {
  var pins = mapPins.querySelectorAll('.map__pin');
  for (var i = 0; i < pins.length; i++) {
    if (pins[i] === pinMain) {
      continue;
    }
    mapPins.removeChild(pins[i]);
  }
};
