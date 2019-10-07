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

var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

// случайное целое число в пределах от min до max
var random = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

// цикл создания массива объектов с Предложениями
var createOffers = function () {
  var offersArray = [];
  for (var i = 0; i < 8; i++) {
    var offer = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },

      'offer': {
        'title': 'Предложение №' + (i + 1),
        'address': '600, 350', // не поняла что именно указать. наверно через this.location.x ?
        'price': 10000,
        'type': OFFER_TYPE[random(0, OFFER_TYPE.length - 1)],
        'rooms': random(1, 5),
        'guests': random(1, 10),
        'checkin': OFFER_CHECKIN[random(0, OFFER_CHECKIN.length - 1)],
        'checkout': OFFER_CHECKOUT[random(0, OFFER_CHECKOUT.length - 1)],
        'features': OFFER_FEATURES, // понимаю что тут должен быть массив случаной длины, но как лучше это оформить? создать отдельную функцию, для добавления элементов?
        'description': 'Описание предложения',
        'photos': OFFER_PHOTOS // тот же вопрос, что и про feature
      },

      'location': {
        'x': random(50, mapPins.clientWidth - 50),
        'y': random(130, 630)
      }
    };

    offersArray.push(offer);
  }
  return offersArray;
};

// cоздание Пина на основе данных Предложения
var createElementPin = function (offer) {
  var element = pinTemplate.cloneNode(true);
  element.style = 'left: ' + (offer.location.x - (40 / 2)) + 'px; top: ' + (offer.location.y - 40) + 'px;'; // как тут получить размер элемента pin (width и height) из HTML?
  element.getElementsByTagName('img')[0].src = offer.author.avatar;
  element.getElementsByTagName('img')[0].alt = offer.offer.title;
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
