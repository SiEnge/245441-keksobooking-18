'use strict';
(function () {

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var popupFeatures = cardTemplate.querySelector('.popup__features');
  var popupPhotos = cardTemplate.querySelector('.popup__photos');
  var map = document.querySelector('.map');

  // библиотека типов жилья
  var typeToNameType = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  // добавление преимуществ предложения
  var appendFeaturesOffer = function (features, featureBlock) {
    var popupFeaturesItems = featureBlock.querySelectorAll('.popup__feature');
    for (var i = 0; i < popupFeaturesItems.length; i++) {
      popupFeaturesItems[i].style.display = 'none';
    }
    for (var j = 0; j < features.length; j++) {
      featureBlock.querySelector('.popup__feature--' + features[j]).style.display = '';
    }
  };

  // добавление фотографий предложения
  var appendPhotosOffer = function (photos, photoBlock) {
    photoBlock.innerHTML = '';
    for (var i = 0; i < photos.length; i++) {
      photoBlock.innerHTML = photoBlock.innerHTML + '<img src="' + photos[i] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">';
    }
  };

  // создание и заполнение карточки (всплывающее окно) с подробный описанием предложения,

  var createElementCard = function (offerId) {
    var offer = offers[offerId];
    var element = cardTemplate.cloneNode(true);

    element.querySelector('.popup__title').innerHTML = offer.offer.title;
    element.querySelector('.popup__text--address').innerHTML = offer.offer.address;
    element.querySelector('.popup__text--price').innerHTML = offer.offer.price + '₽/ночь';
    element.querySelector('.popup__type').innerHTML = typeToNameType[offer.offer.type] || '';
    element.querySelector('.popup__text--capacity').innerHTML = offer.offer.rooms + ' комнаты для ' + offer.offer.guests + ' гостей';
    element.querySelector('.popup__text--time').innerHTML = 'Заезд после ' + offer.offer.checkin + ', выезд до ' + offer.offer.checkout;
    appendFeaturesOffer(offer.offer.features, popupFeatures);
    element.querySelector('.popup__description').innerHTML = offer.offer.description;
    appendPhotosOffer(offer.offer.photos, popupPhotos);
    element.querySelector('.popup__avatar').src = offer.author.avatar;

    var fragment = document.createDocumentFragment();

    fragment.appendChild(element);
    map.insertBefore(fragment, map.querySelector('.map__filters-container'));
    return element;
  };

  // закрытие карточки предложения (всплывающее окно) => удаление блока .map__card из блока .map и удаление обработчки закрытия по Esc
  window.closePopupCard = function () {
    map.removeChild(map.querySelector('.map__card'));
    document.removeEventListener('keydown', onPopupEscPress);
  };

  // открытие карточки предложения (всплывающее окно)
  // => создание карточки и навешивание обработчиков для закрытия окна по кнопке Закрыть и по клавише Esc
  window.openPopupCard = function (evt) {
    // closePopupCard();
    var pin = evt.currentTarget;
    var card = createElementCard(pin.dataset.offerId);
    var closeButton = card.querySelector('.popup__close');
    closeButton.addEventListener('click', closePopupCard);
    document.addEventListener('keydown', onPopupEscPress);
  };

  
})();
