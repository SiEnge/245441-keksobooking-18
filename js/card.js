'use strict';

var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var popupFeatures = cardTemplate.querySelector('.popup__features');
var popupPhotos = cardTemplate.querySelector('.popup__photos');

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
// где offerId - индекс в массиве предложения offers

// !!! переименовать, добавить слово element как у createElementPin
var createCard = function (offerId) {
  var offerItem = offers[offerId];
  var elementCard = cardTemplate.cloneNode(true);

  elementCard.querySelector('.popup__title').innerHTML = offerItem.offer.title;
  elementCard.querySelector('.popup__text--address').innerHTML = offerItem.offer.address;
  elementCard.querySelector('.popup__text--price').innerHTML = offerItem.offer.price + '₽/ночь';
  elementCard.querySelector('.popup__type').innerHTML = typeToNameType[offerItem.offer.type] || '';
  elementCard.querySelector('.popup__text--capacity').innerHTML = offerItem.offer.rooms + ' комнаты для ' + offerItem.offer.guests + ' гостей';
  elementCard.querySelector('.popup__text--time').innerHTML = 'Заезд после ' + offerItem.offer.checkin + ', выезд до ' + offerItem.offer.checkout;
  appendFeaturesOffer(offerItem.offer.features, popupFeatures);
  elementCard.querySelector('.popup__description').innerHTML = offerItem.offer.description;
  appendPhotosOffer(offerItem.offer.photos, popupPhotos);
  elementCard.querySelector('.popup__avatar').src = offerItem.author.avatar;

  var fragment = document.createDocumentFragment();

  fragment.appendChild(elementCard);
  map.insertBefore(fragment, map.querySelector('.map__filters-container'));
  return elementCard;
};

// открытие карточки предложения (всплывающее окно)
// => создание карточки и навешивание обработчиков для закрытия окна по кнопке Закрыть и по клавише Esc
var openPopupCard = function (evt) {
  var pin = evt.currentTarget;
  var card = createCard(pin.dataset.offerId);
  var closeButton = card.querySelector('.popup__close');
  closeButton.addEventListener('click', closePopupCard);
  document.addEventListener('keydown', onPopupEscPress);
};

// закрытие карточки предложения (всплывающее окно) => удаление блока .map__card из блока .map и удаление обработчки закрытия по Esc
var closePopupCard = function () {
  map.removeChild(map.querySelector('.map__card'));
  document.removeEventListener('keydown', onPopupEscPress);
};