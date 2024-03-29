'use strict';

(function () {
  var MAX_COUNT_PIN = 5;

  var mapElement = document.querySelector('.map');
  window.mapElement = mapElement;

  var clearMap = function () {
    var mapPinsElement = mapElement.querySelector('.map__pins');
    var pins = mapPinsElement.querySelectorAll('.map__pin');

    pins.forEach(function (pin) {
      if (pin !== window.pinMainElement) {
        mapPinsElement.removeChild(pin);
      }
    });
  };

  window.map = {

    fill: function (offers) {
      clearMap();
      if (offers.length === 0) {
        return;
      }

      var mapPinsElement = mapElement.querySelector('.map__pins');
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < Math.min(offers.length, MAX_COUNT_PIN); i++) {
        var offer = offers[i];
        var pinElement = window.pin.createElement(i, offer);
        fragment.appendChild(pinElement);
      }
      mapPinsElement.appendChild(fragment);
    },

    inactivate: function () {
      if (!mapElement.classList.contains('map--faded')) {
        mapElement.classList.add('map--faded');
      }
      clearMap();
      window.card.close();
    },

    activate: function () {
      if (mapElement.classList.contains('map--faded')) {
        mapElement.classList.remove('map--faded');
      }
    }

  };
})();
