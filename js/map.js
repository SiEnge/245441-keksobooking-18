'use strict';
(function () {
  window.mapElement = document.querySelector('.map');
  var MAX_COUNT_PIN = 5;

  var clearMap = function () {
    var mapPins = mapElement.querySelector('.map__pins');
    var pins = mapPins.querySelectorAll('.map__pin');
    for (var i = 0; i < pins.length; i++) {
      var pin = pins[i];
      if (pin === pinMain) {
        continue;
      }
      mapPins.removeChild(pin);
    }
  };

  window.map = {
    fill: function (offers) {
      clearMap();
      if (offers.length === 0) {
        return;
      }

      var mapPins = mapElement.querySelector('.map__pins');
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < offers.length; i++) {
        // if (i > MAX_COUNT_PIN) {
        //   break;
        // }
        var offer = offers[i];
        var pin = createElementPin(i, offer);
        fragment.appendChild(pin);

      }
      mapPins.appendChild(fragment);
    },
    // clear: function () {
    //   var mapPins = mapElement.querySelector('.map__pins');
    //   var pins = mapPins.querySelectorAll('.map__pin');
    //   for (var i = 0; i < pins.length; i++) {
    //     var pin = pins[i];
    //     if (pin === pinMain) {
    //       continue;
    //     }
    //     mapPins.removeChild(pin);
    //   }
    // },
    inactivate: function () {
      if (!mapElement.classList.contains('map--faded')) {
        mapElement.classList.add('map--faded');
      }
      clearMap();
      closePopupCard();
    },
    activate: function () {
      if (mapElement.classList.contains('map--faded')) {
        mapElement.classList.remove('map--faded');
      }
    }

  };

  // заполнение блока map__pins
  // window.fillMapPins = function (offers) {
  //   clearMapPins(); // очистка карты
  //   if (offers.length === 0) {
  //     return;
  //   }

  //   var mapPins = mapElement.querySelector('.map__pins');
  //   var fragment = document.createDocumentFragment();
  //   for (var i = 0; i < offers.length; i++) {
  //     // if (i > MAX_COUNT_PIN) {
  //     //   break;
  //     // }
  //     var offer = offers[i];
  //     var pin = createElementPin(i, offer);
  //     fragment.appendChild(pin);

  //   }
  //   mapPins.appendChild(fragment);
  // };

  // очистка блока map_pins (при переходе странцы в неактивное состояние)
  // window.clearMapPins = function () {
  //   var mapPins = mapElement.querySelector('.map__pins');
  //   var pins = mapPins.querySelectorAll('.map__pin');
  //   for (var i = 0; i < pins.length; i++) {
  //     var pin = pins[i];
  //     if (pin === pinMain) {
  //       continue;
  //     }
  //     mapPins.removeChild(pin);
  //   }
  // };

  // В неактивном состоянии блок с картой .map содержит класс map--faded; (при переходе странцы в неактивное состояние)
  // window.inactivateMap = function () {
  //   if (!mapElement.classList.contains('map--faded')) {
  //     mapElement.classList.add('map--faded');
  //   }
  //   clearMapPins();
  //   closePopupCard();
  // };

  // window.activateMap = function () {
  //   if (mapElement.classList.contains('map--faded')) {
  //     mapElement.classList.remove('map--faded');
  //   }
  // };

})();
