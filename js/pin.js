'use strict';

(function () {
  var PIN_MAIN_WIDTH = 40;
  var PIN_MAIN_HEIGHT = 44;
  var PIN_WIDTH = 40;
  var PIN_HEIGHT = 40;
  var pinMain = document.querySelector('.map__pin--main');

  window.createElementPin = function (offerId, offer) {
    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var element = pinTemplate.cloneNode(true);
    element.dataset.offerId = offerId;
    element.style = 'left: ' + (offer.location.x - (PIN_WIDTH / 2)) + 'px; top: ' + (offer.location.y - PIN_HEIGHT) + 'px;';
    element.querySelector('img').src = offer.author.avatar;
    element.querySelector('img').alt = offer.offer.title;
    return element;
  };

  pinMain.addEventListener('mousedown', function () {
    activatePage();
  });

  pinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      activatePage();
    }
  });

  window.pin = {
    PIN_MAIN_WIDTH: PIN_MAIN_WIDTH,
    PIN_MAIN_HEIGHT: PIN_MAIN_HEIGHT,
    PIN_WIDTH: PIN_WIDTH,
    PIN_HEIGHT: PIN_HEIGHT
  };
})();
