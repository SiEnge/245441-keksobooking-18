'use strict';

(function () {
  var TextNameType = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  var appendFeatures = function (features, card) {
    var featuresElement = card.querySelector('.popup__features');
    var featureElements = featuresElement.querySelectorAll('.popup__feature');
    for (var i = 0; i < featureElements.length; i++) {
      featureElements[i].style.display = 'none';
    }
    for (var j = 0; j < features.length; j++) {
      featuresElement.querySelector('.popup__feature--' + features[j]).style.display = '';
    }
  };

  var appendPhotos = function (photos, card) {
    var photosElement = card.querySelector('.popup__photos');
    var photoElement = photosElement.querySelector('.popup__photo');
    for (var i = 0; i < photos.length; i++) {
      var photo = photos[i];
      var element = photoElement.cloneNode(true);
      element.src = photo;
      photosElement.appendChild(element);
    }
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
    var text = [];
    if (checkin !== '0:00') {
      text.push('Заезд после ' + checkin);
    }
    if (checkout !== '0:00') {
      text.push('выезд до ' + checkout);
    }
    return text.join(', ');
  };

  var getTextPrice = function (price) {
    if (price !== 0) {
      return price + '₽/ночь';
    }
  };

  var createElementCard = function (offerId) {
    var offer = (similarOffers.length > 0) ? similarOffers[offerId] : offers[offerId];
    var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
    var element = cardTemplate.cloneNode(true);
    element.querySelector('.popup__title').textContent = offer.offer.title || '';
    element.querySelector('.popup__text--address').textContent = offer.offer.address || '';
    element.querySelector('.popup__text--price').textContent = getTextPrice(offer.offer.price);
    element.querySelector('.popup__type').textContent = TextNameType[offer.offer.type] || '';
    element.querySelector('.popup__text--capacity').textContent = getTextCapacity(offer.offer.rooms, offer.offer.guests);
    element.querySelector('.popup__text--time').textContent = getTextTime(offer.offer.checkin, offer.offer.checkout);
    appendFeatures(offer.offer.features, element);
    element.querySelector('.popup__description').textContent = offer.offer.description || '';
    appendPhotos(offer.offer.photos, element);
    element.querySelector('.popup__avatar').src = offer.author.avatar || '';
    return element;
  };

  var onCardEscPress = function (evt) {
    if (evt.keyCode === util.ESC_KEYCODE) {
      card.close();
    }
  };

  window.card = {
    open: function (evt) {
      card.close();
      var pinElement = evt.currentTarget;
      pin.activate(pinElement);

      var cardElement = createElementCard(pinElement.dataset.offerId);
      var closeButtonElement = cardElement.querySelector('.popup__close');
      closeButtonElement.addEventListener('click', card.close);
      document.addEventListener('keydown', onCardEscPress);
      mapElement.insertBefore(cardElement, mapElement.querySelector('.map__filters-container'));
    },
    close: function () {
      var cardElement = mapElement.querySelector('.map__card');
      if (cardElement) {
        mapElement.removeChild(cardElement);
      }
      document.removeEventListener('keydown', onCardEscPress);
      pin.deactivate();
    }
  };
})();
