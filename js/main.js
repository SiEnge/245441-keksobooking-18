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

var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

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
        'x': random(50, mapPins.clientWidth - 50),
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

fillMapPins();
map.classList.remove('map--faded');
