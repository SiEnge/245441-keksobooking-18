'use strict';
(function () {

  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var pinMain = document.querySelector('.map__pin--main');

  // заполнение блока map__pins
  window.fillMapPins = function () {
    var fragment = document.createDocumentFragment();
    var offers = window.offers;
    for (var i = 0; i < offers.length; i++) {
      var offer = offers[i]
      fragment.appendChild(createElementPin(i, offer));
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
  window.clearMapPins = function () {
    var pins = mapPins.querySelectorAll('.map__pin');
    for (var i = 0; i < pins.length; i++) {
      if (pins[i] === pinMain) {
        continue;
      }
      mapPins.removeChild(pins[i]);
    }
  };
})();
