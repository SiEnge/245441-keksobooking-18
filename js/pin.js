'use strict';

var PIN_WIDTH = 40;
var PIN_HEIGHT = 40;
var PIN_MAIN_WIDTH = 40;
var PIN_MAIN_HEIGHT = 44;

var pinMain = document.querySelector('.map__pin--main');



// cоздание Пина на основе данных Предложения
var createElementPin = function (offerId, offer) {
  var element = pinTemplate.cloneNode(true);
  element.style = 'left: ' + (offer.location.x - (PIN_WIDTH / 2)) + 'px; top: ' + (offer.location.y - PIN_HEIGHT) + 'px;';
  element.querySelector('img').src = offer.author.avatar;
  element.querySelector('img').alt = offer.offer.title;
  element.dataset.offerId = offerId;
  return element;
};


pinMain.addEventListener('mousedown', function () {
  activatePage();
});

pinMain.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    activatePage();
  }
});