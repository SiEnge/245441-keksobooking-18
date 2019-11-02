'use strict';
(function () {
  // заполнение блока map__pins
  window.fillMapPins = function (similarOffers) {
    clearMapPins();
    var mapPins = document.querySelector('.map__pins');
    var pinMain = document.querySelector('.map__pin--main');
    var fragment = document.createDocumentFragment();
    // var offers = window.offers;
    // for (var i = 0; i < similarOffers.length; i++) {
    for (var i = 0; i < 5; i++) {
      var offer = similarOffers[i];
      var pin = createElementPin(i, offer);
      fragment.appendChild(pin);
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
    var mapPins = document.querySelector('.map__pins');
    var pinMain = document.querySelector('.map__pin--main');
    var pins = mapPins.querySelectorAll('.map__pin');
    for (var i = 0; i < pins.length; i++) {
      if (pins[i] === pinMain) {
        continue;
      }
      mapPins.removeChild(pins[i]);
    }
  };
})();
