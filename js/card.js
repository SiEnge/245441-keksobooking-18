'use strict';

(function () {
  // специально для проверяющего наставника )) но не очень уверена, что и это засчитается
  var NameType = {
    FLAT: 'Квартира',
    BUNGALO: 'Бунгало',
    HOUSE: 'Дом',
    PALACE: 'Дворец'
  };

  var appendFeatures = function (features, card) {
    var featuresElement = card.querySelector('.popup__features');
    var featureElements = featuresElement.querySelectorAll('.popup__feature');

    featureElements.forEach(function (element) {
      element.style.display = 'none';
    });

    features.forEach(function (feature) {
      featuresElement.querySelector('.popup__feature--' + feature).style.display = '';
    });
  };

  var appendPhotos = function (photos, card) {
    var photosElement = card.querySelector('.popup__photos');
    var photoElement = photosElement.querySelector('.popup__photo');
    var fragment = document.createDocumentFragment();

    photos.forEach(function (photo) {
      var element = photoElement.cloneNode(true);
      element.src = photo;
      fragment.appendChild(element);
    });

    photosElement.appendChild(fragment);
    photosElement.removeChild(photoElement);
  };

  var getTextCapacity = function (rooms, guests) {
    var text = '';
    if (rooms !== 0) {
      text = rooms + ' комнаты ';
    }
    if (guests !== 0) {
      text = text + 'для ' + guests + ' гостей';
    }
    return text;
  };

  var getTextTime = function (checkin, checkout) {
    var texts = [];
    if (checkin !== '0:00') {
      texts.push('Заезд после ' + checkin);
    }
    if (checkout !== '0:00') {
      texts.push('выезд до ' + checkout);
    }
    return texts.join(', ');
  };

  var getTextPrice = function (price) {
    var text;
    if (price !== 0) {
      text = price + '₽/ночь';
    }
    return text;
  };

  var createElementCard = function (offerId) {
    var offer = (window.similarOffers.length > 0) ? window.similarOffers[offerId] : window.offers[offerId];
    var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
    var element = cardTemplate.cloneNode(true);
    element.querySelector('.popup__title').textContent = offer.offer.title || '';
    element.querySelector('.popup__text--address').textContent = offer.offer.address || '';
    element.querySelector('.popup__text--price').textContent = getTextPrice(offer.offer.price);
    element.querySelector('.popup__type').textContent = NameType[offer.offer.type.toUpperCase()] || '';
    element.querySelector('.popup__text--capacity').textContent = getTextCapacity(offer.offer.rooms, offer.offer.guests);
    element.querySelector('.popup__text--time').textContent = getTextTime(offer.offer.checkin, offer.offer.checkout);
    appendFeatures(offer.offer.features, element);
    element.querySelector('.popup__description').textContent = offer.offer.description || '';
    appendPhotos(offer.offer.photos, element);
    element.querySelector('.popup__avatar').src = offer.author.avatar || '';
    return element;
  };

  var onCardEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      window.card.close();
    }
  };

  var onCloseButtonClick = function () {
    window.card.close();
  };

  window.card = {

    open: function (evt) {
      window.card.close();

      var pinElement = evt.currentTarget;
      window.pin.activate(pinElement);

      var cardElement = createElementCard(pinElement.dataset.offerId);
      var closeButtonElement = cardElement.querySelector('.popup__close');
      closeButtonElement.addEventListener('click', onCloseButtonClick);
      document.addEventListener('keydown', onCardEscPress);
      window.mapElement.insertBefore(cardElement, window.mapElement.querySelector('.map__filters-container'));
    },

    close: function () {
      var cardElement = window.mapElement.querySelector('.map__card');
      if (cardElement) {
        window.mapElement.removeChild(cardElement);
      }
      document.removeEventListener('keydown', onCardEscPress);
      window.pin.deactivate();
    }

  };
})();

