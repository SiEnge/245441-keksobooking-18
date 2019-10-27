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
var ESC_KEYCODE = 27;

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

var adForm = document.querySelector('.ad-form');
var formFieldsets = adForm.querySelectorAll('fieldset');
var housingRoomSelect = adForm.querySelector('#room_number');
var capacitySelect = adForm.querySelector('#capacity');

// случайное целое число в пределах от min до max
var random = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};


// закрытие Попапа по кнопке Закрыть
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopupCard();
  }
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
var createElementPin = function (offerId, offer) {
  var element = pinTemplate.cloneNode(true);
  element.style = 'left: ' + (offer.location.x - (PIN_WIDTH / 2)) + 'px; top: ' + (offer.location.y - PIN_HEIGHT) + 'px;';
  element.querySelector('img').src = offer.author.avatar;
  element.querySelector('img').alt = offer.offer.title;
  element.dataset.offerId = offerId;
  return element;
};

var offers = createOffers();


// заполнение блока map__pins
var fillMapPins = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < offers.length; i++) {
    fragment.appendChild(createElementPin(i, offers[i]));
  }
  mapPins.appendChild(fragment);


  var pins = mapPins.querySelectorAll('.map__pin');
  for (var j = 0; j < pins.length; j++) {
    if (pins[j] === pinMain) {
      continue;
    }
    pins[j].addEventListener('click', openPopupCard);

    pins[j].addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        openPopupCard(evt);
      }
    });
  }
};

// очистка блока map_pins
var clearMapPins = function () {
  var pins = mapPins.querySelectorAll('.map__pin');
  for (var i = 0; i < pins.length; i++) {
    if (pins[i] === pinMain) {
      continue;
    }
    mapPins.removeChild(pins[i]);
  }
};


// Часть 8. Личный проект: подробности

// инициализация страницы при загрузке страницы
var initializationPage = function () {
  for (var i = 0; i < formFieldsets.length; i++) {
    formFieldsets[i].disabled = true;
  }
  adForm.querySelector('#address').value = (pinMain.offsetLeft + (PIN_MAIN_WIDTH / 2)) + ', ' + (pinMain.offsetTop + (PIN_MAIN_HEIGHT / 2));
};

// активация страницы
var activatePage = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  for (var i = 0; i < formFieldsets.length; i++) {
    formFieldsets[i].disabled = false;
  }
  adForm.querySelector('#address').value = (pinMain.offsetLeft + (PIN_MAIN_WIDTH / 2)) + ', ' + (pinMain.offsetTop + PIN_MAIN_HEIGHT);
  clearMapPins();
  fillMapPins();
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

// КАРТОЧКА ПРЕДЛОЖЕНИЯ

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

var validityElemForm = function (elem) {
  var validity = elem.validity;
  var checkValidate = {
    message: [],
    flag: true
  };

  if (!validity.valid) {
    checkValidate.flag = false;

    if (validity.valueMissing) {
      checkValidate.message.push('Заполните данное поле.');
    }

    if (validity.tooShort) {
      checkValidate.message.push('Введите не менее ' + elem.minLength + ' символов.');
    }

    if (validity.tooLong) {
      checkValidate.message.push('Введенный текст слишком длинный. Введите не более ' + elem.maxLength + ' символов.');
    }

    if (validity.rangeUnderflow) {
      checkValidate.message.push('Значение должно быть больше или равно ' + elem.min + '.');
    }

    if (validity.rangeOverflow) {
      checkValidate.message.push('Значение должно быть меньше или равно ' + elem.max + '.');
    }

    if (validity.stepMismatch) {
      checkValidate.message.push('Введите значение с шагом  ' + elem.step + '.');
    }
  }


  // проверка соответствия Вместимости жилья и Количества гостей
  if (elem === housingRoomSelect || elem === capacitySelect) {
    if (!checkCapacityRooms(housingRoomSelect.value, capacitySelect.value)) {
      checkValidate.flag = false;
      checkValidate.message.push('Выбранное количество гостей не подходит под количество комнат');
    }
  }

  if (!checkValidate.flag) { // если поле не прошло проверку, то вывести сообщение
    displayErrorMessageForm(elem, checkValidate.message);
  } else {
    displayErrorMessageForm(elem, '');
  }

  return checkValidate;
};

var displayErrorMessageForm = function (elem, message) {
  var wrap = elem.parentElement;

  if (wrap.querySelector('.error__elemForm')) {
    var error = wrap.querySelector('.error__elemForm');
    error.innerHTML = message;
  } else {
    if (message !== '') {
      elem.insertAdjacentHTML('afterend', '<p class="error__elemForm" style="color: red; margin-top: 6px;">' + message.join('<br>') + '</p>');
    }
  }
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


housingRoomSelect.addEventListener('change', function () {
  validityElemForm(capacitySelect);
});

capacitySelect.addEventListener('change', function () {
  validityElemForm(capacitySelect);
});

var priceInput = adForm.querySelector('#price');

// библиотека
var typeToMinPrice = {
  'flat': 1000,
  'bungalo': 0,
  'house': 5000,
  'palace': 10000
};


var setMinPriceInput = function (type) {
  priceInput.min = typeToMinPrice[type];
  priceInput.placeholder = typeToMinPrice[type];
};


var typeSelect = adForm.querySelector('#type');

typeSelect.addEventListener('change', function () {
  setMinPriceInput(typeSelect.value);
  validityElemForm(priceInput);
});

var timeInSelect = adForm.querySelector('#timein');
var timeOutSelect = adForm.querySelector('#timeout');

timeInSelect.addEventListener('change', function () {
  timeOutSelect.value = timeInSelect.value;
});

timeOutSelect.addEventListener('change', function () {
  timeInSelect.value = timeOutSelect.value;
});

// ВАЛИДАЦИЯ ФОРМЫ

var validityInput = function (evt) {
  var input = evt.target;
  validityElemForm(input);
};

var inputs = adForm.querySelectorAll('input');
var selects = adForm.querySelectorAll('select');

for (var i = 0; i < inputs.length; i++) {
  var input = inputs[i];
  input.addEventListener('change', validityInput);
}

var validityForm = function () {
  var flagValidForm = true;
  var checkForm;

  for (i = 0; i < inputs.length; i++) {
    input = inputs[i];
    checkForm = validityElemForm(input);
    if (!checkForm.flag) {
      flagValidForm = false;
    }
  }

  for (var j = 0; j < selects.length; j++) {
    var select = selects[j];
    checkForm = validityElemForm(select);
    if (!checkForm.flag) {
      flagValidForm = false;
    }
  }

  return flagValidForm;
};

adForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  if (validityForm(adForm)) {
    adForm.submit();
  }
});

// инициализация формы с правильными данными
