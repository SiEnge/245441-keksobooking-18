'use strict';

(function () {

  // добавление преимуществ предложения
  var appendFeaturesOffer = function (features, card) {
    var featureBlock = card.querySelector('.popup__features');

    var featuresItems = featureBlock.querySelectorAll('.popup__feature');
    for (var i = 0; i < featuresItems.length; i++) {
      featuresItems[i].style.display = 'none';
    }
    for (var j = 0; j < features.length; j++) {
      featureBlock.querySelector('.popup__feature--' + features[j]).style.display = '';
    }
  };

  // добавление фотографий предложения
  var appendPhotosOffer = function (photos, card) {
    var photoBlock = card.querySelector('.popup__photos');
    var photo = photoBlock.querySelector('.popup__photo');
    for (var i = 0; i < photos.length; i++) {
      var element = photo.cloneNode(true);
      element.src = photos[i];
      photoBlock.appendChild(element);
    }
    photoBlock.removeChild(photo);
  };

  // создание и заполнение карточки (всплывающее окно) с подробный описанием предложения
  var createElementCard = function (offerId) {
    var offer = offers[offerId];
    var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
    var element = cardTemplate.cloneNode(true);

    element.querySelector('.popup__title').innerHTML = offer.offer.title;
    element.querySelector('.popup__text--address').innerHTML = offer.offer.address;
    element.querySelector('.popup__text--price').innerHTML = offer.offer.price + '₽/ночь';
    element.querySelector('.popup__type').innerHTML = window.util.typeToNameType[offer.offer.type] || '';
    element.querySelector('.popup__text--capacity').innerHTML = offer.offer.rooms + ' комнаты для ' + offer.offer.guests + ' гостей';
    element.querySelector('.popup__text--time').innerHTML = 'Заезд после ' + offer.offer.checkin + ', выезд до ' + offer.offer.checkout;
    appendFeaturesOffer(offer.offer.features, element);
    element.querySelector('.popup__description').innerHTML = offer.offer.description;
    appendPhotosOffer(offer.offer.photos, element);
    element.querySelector('.popup__avatar').src = offer.author.avatar;

    return element;
  };

  // закрытие карточки предложения (всплывающее окно)
  window.closePopupCard = function () {
    var map = document.querySelector('.map');
    if (map.querySelector('.map__card')) {
      map.removeChild(map.querySelector('.map__card'));
    }
    document.removeEventListener('keydown', onPopupEscPress);
  };

  // открытие карточки предложения (всплывающее окно)
  window.openPopupCard = function (evt) {
    var map = document.querySelector('.map');
    closePopupCard();
    var pin = evt.currentTarget;
    var card = createElementCard(pin.dataset.offerId);
    map.insertBefore(card, map.querySelector('.map__filters-container'));
    var closeButton = card.querySelector('.popup__close');
    closeButton.addEventListener('click', closePopupCard);
    document.addEventListener('keydown', onPopupEscPress);
  };
})();
