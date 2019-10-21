'use strict';

var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_CHECKIN = ['12:00', '13:00', '14:00'];
var OFFER_CHECKOUT = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var PIN_WIDTH = 40;
var PIN_HEIGHT = 40;
var PIN_MAIN_WIDTH = 40;
var PIN_MAIN_HEIGHT = 44;

var ENTER_KEYCODE = 13;

var ONE_ROOMS_COUNT = '1';
var TWO_ROOMS_COUNT = '2';
var THREE_ROOMS_COUNT = '3';
var ONE_HUNDRED_ROOMS_COUNT = '100';

var ONE_CAPACITY_COUNT = '1';
var TWO_CAPACITY_COUNT = '2';
var THREE_CAPACITY_COUNT = '3';
var NO_CAPACITY_COUNT = '0';

var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var pinMain = document.querySelector('.map__pin--main');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var popupFeatures = cardTemplate.querySelector('.popup__features');
var popupPhotos = cardTemplate.querySelector('.popup__photos');

var form = document.querySelector('.ad-form');
var formFieldsets = form.querySelectorAll('fieldset');
var housingRoomSelect = form.querySelector('#room_number');
var capacitySelect = form.querySelector('#capacity');

// случайное целое число в пределах от min до max
var random = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

// создание массива случайной длины
var createRandomArray = function (array) {
  // получение случайной длины массива
  var lengthArray = random(1, array.length - 1);
  var resultArray = [];

  // проверка на повтор
  while (resultArray.length <= lengthArray) {
    var next = array[random(0, array.length - 1)];
    var flag = true;
    for (var i = 0; i < resultArray.length; i++) {
      if (resultArray[i] === next) {
        flag = false;
      }
    }
    if (flag) {
      resultArray.push(next);
    }
  }

  return resultArray;
};

// цикл создания массива объектов с Предложениями
var createOffers = function () {
  var offersArray = [];
  for (var i = 0; i < 8; i++) {
    var offerItem = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },

      'offer': {
        'title': 'Предложение №' + (i + 1),
        'price': 10000,
        'type': OFFER_TYPE[random(0, OFFER_TYPE.length - 1)],
        'rooms': random(1, 5),
        'guests': random(1, 10),
        'checkin': OFFER_CHECKIN[random(0, OFFER_CHECKIN.length - 1)],
        'checkout': OFFER_CHECKOUT[random(0, OFFER_CHECKOUT.length - 1)],
        'features': createRandomArray(OFFER_FEATURES),
        'description': 'Описание предложения',
        'photos': createRandomArray(OFFER_PHOTOS)
      },

      'location': {
        'x': random(0, mapPins.clientWidth),
        'y': random(130, 630)
      }
    };

    offerItem.offer.address = offerItem['location'].x + ', ' + offerItem['location'].y;
    offersArray.push(offerItem);
  }
  return offersArray;
};

// cоздание Пина на основе данных Предложения
var createElementPin = function (offer) {
  var element = pinTemplate.cloneNode(true);
  element.style = 'left: ' + (offer.location.x - (PIN_WIDTH / 2)) + 'px; top: ' + (offer.location.y - PIN_HEIGHT) + 'px;';
  element.querySelector('img').src = offer.author.avatar;
  element.querySelector('img').alt = offer.offer.title;
  return element;
};

// заполнение блока map__pins
var fillMapPins = function () {
  var offers = createOffers();
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < offers.length; i++) {
    fragment.appendChild(createElementPin(offers[i]));
  }
  mapPins.appendChild(fragment);
};


// Часть 8. Личный проект: подробности

// инициализация страницы при загрузке страницы
var initializationPage = function () {
  for (var i = 0; i < formFieldsets.length; i++) {
    formFieldsets[i].disabled = true;
  }
  form.querySelector('#address').value = (pinMain.offsetLeft + (PIN_MAIN_WIDTH / 2)) + ', ' + (pinMain.offsetTop + (PIN_MAIN_HEIGHT / 2));
};

// активация страницы
var activatePage = function () {
  map.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');
  for (var i = 0; i < formFieldsets.length; i++) {
    formFieldsets[i].disabled = false;
  }
  form.querySelector('#address').value = (pinMain.offsetLeft + (PIN_MAIN_WIDTH / 2)) + ', ' + (pinMain.offsetTop + PIN_MAIN_HEIGHT);
  fillMapPins();
  pasteCard();
};

// проверка соответствия комнат и количества гостей
var checkCapacityRooms = function (rooms, capacity) {
  if (rooms === ONE_ROOMS_COUNT && capacity === ONE_CAPACITY_COUNT) {
    return true;
  } else if (rooms === TWO_ROOMS_COUNT && (capacity === ONE_CAPACITY_COUNT || capacity === TWO_CAPACITY_COUNT)) {
    return true;
  } else if (rooms === THREE_ROOMS_COUNT && (capacity === ONE_CAPACITY_COUNT || capacity === TWO_CAPACITY_COUNT || capacity === THREE_CAPACITY_COUNT)) {
    return true;
  } else if (rooms === ONE_HUNDRED_ROOMS_COUNT && capacity === NO_CAPACITY_COUNT) {
    return true;
  }
  return false;
};

// валидация и установка сообщения при ошибке
var validateCapacityRooms = function () {
  capacitySelect.setCustomValidity('');
  if (!checkCapacityRooms(housingRoomSelect.value, capacitySelect.value)) {
    capacitySelect.setCustomValidity('Выбранное количество гостей не подходит под количество комнат');
    capacitySelect.reportValidity();
  }
};


window.addEventListener('load', function () {
  initializationPage();
});


pinMain.addEventListener('mousedown', function () {
  activatePage();
});

pinMain.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    activatePage();
  }
});

housingRoomSelect.addEventListener('change', function () {
  validateCapacityRooms();
});

capacitySelect.addEventListener('change', function () {
  validateCapacityRooms();
});


// Задание 6. Личный проект: больше деталей

var appendTypeOffer = function (type) {
  switch (type) {
    case 'flat':
      return 'Квартира';
    case 'bungalo':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
    default:
      return '';
  }
};

var appendFeaturesOffer = function (features, featureBlock) {
  var popupFeaturesItems = featureBlock.querySelectorAll('.popup__feature');
  for (var i = 0; i < popupFeaturesItems.length; i++) {
    popupFeaturesItems[i].style.display = 'none';
  }
  for (var j = 0; j < features.length; j++) {
    featureBlock.querySelector('.popup__feature--' + features[j]).style.display = '';
  }
};

var appendPhotosOffer = function (photos, photoBlock) {
  photoBlock.innerHTML = '';
  for (var i = 0; i < photos.length; i++) {
    photoBlock.innerHTML = photoBlock.innerHTML + '<img src="' + photos[i] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">';
  }
};

var createCard = function (offerItem) {
  cardTemplate.querySelector('.popup__title').innerHTML = offerItem.offer.title;
  cardTemplate.querySelector('.popup__text--address').innerHTML = offerItem.offer.address;
  cardTemplate.querySelector('.popup__text--price').innerHTML = offerItem.offer.price + '₽/ночь';
  cardTemplate.querySelector('.popup__type').innerHTML = appendTypeOffer(offerItem.offer.type);
  cardTemplate.querySelector('.popup__text--capacity').innerHTML = offerItem.offer.rooms + ' комнаты для ' + offerItem.offer.guests + ' гостей';
  cardTemplate.querySelector('.popup__text--time').innerHTML = 'Заезд после ' + offerItem.offer.checkin + ', выезд до ' + offerItem.offer.checkout;
  appendFeaturesOffer(offerItem.offer.features, popupFeatures);
  cardTemplate.querySelector('.popup__description').innerHTML = offerItem.offer.description;
  appendPhotosOffer(offerItem.offer.photos, popupPhotos);
  cardTemplate.querySelector('.popup__avatar').src = offerItem.author.avatar;
  return cardTemplate;
};

var pasteCard = function () {
  var offers = createOffers();
  var fragment = document.createDocumentFragment();
  fragment.appendChild(createCard(offers[0]));
  map.insertBefore(fragment, map.querySelector('.map__filters-container'));
};
