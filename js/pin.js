'use strict';

(function () {
  var PIN_WIDTH = 40;
  var PIN_HEIGHT = 40;

  var onPinEnterPress = function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      card.open(evt);
    }
  };

  window.pin = {
    createElement: function (offerId, offer) {
      if (offer.offer instanceof Object) {
        var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
        var element = pinTemplate.cloneNode(true);
        element.dataset.offerId = offerId;
        element.style = 'left: ' + (offer.location.x - (PIN_WIDTH / 2)) + 'px; top: ' + (offer.location.y - PIN_HEIGHT) + 'px;';
        element.querySelector('img').src = offer.author.avatar || '';
        element.querySelector('img').alt = offer.offer.title || '';

        element.addEventListener('click', card.open);
        element.addEventListener('keydown', onPinEnterPress);
      }
      return element;
    },
    activate: function (pinElement) {
      pinElement.classList.add('map__pin--active');
    },
    deactivate: function () {
      var pinActiveElement = mapElement.querySelector('.map__pin--active');
      if (pinActiveElement) {
        pinActiveElement.classList.remove('map__pin--active');
      }
    },
    display: window.debounce(function () {
      card.close();

      similarOffers = filter.getOffers();
      map.fill(similarOffers);
    })
  };
})();
