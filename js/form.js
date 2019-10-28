'use strict';

(function () {
  var ONE_ROOMS_COUNT = '1';
  var TWO_ROOMS_COUNT = '2';
  var THREE_ROOMS_COUNT = '3';
  var ONE_HUNDRED_ROOMS_COUNT = '100';

  var ONE_CAPACITY_COUNT = '1';
  var TWO_CAPACITY_COUNT = '2';
  var THREE_CAPACITY_COUNT = '3';
  var NO_CAPACITY_COUNT = '0';


  var adForm = document.querySelector('.ad-form');
  var formFieldsets = adForm.querySelectorAll('fieldset');
  var housingRoomSelect = adForm.querySelector('#room_number');
  var capacitySelect = adForm.querySelector('#capacity');
  var pinMain = document.querySelector('.map__pin--main');

  window.deactivationForm = function () {
    for (var i = 0; i < formFieldsets.length; i++) {
      formFieldsets[i].disabled = true;
    }
    adForm.querySelector('#address').value = (pinMain.offsetLeft + (window.pin.PIN_MAIN_WIDTH / 2)) + ', ' + (pinMain.offsetTop + (window.pin.PIN_MAIN_HEIGHT / 2));
  };

  window.activationForm = function () {
    if (adForm.classList.contains('ad-form--disabled')) {
      adForm.classList.remove('ad-form--disabled');
    }

    for (var i = 0; i < formFieldsets.length; i++) {
      formFieldsets[i].disabled = false;
    }
    adForm.querySelector('#address').value = (pinMain.offsetLeft + (window.pin.PIN_MAIN_WIDTH / 2)) + ', ' + (pinMain.offsetTop + window.pin.PIN_MAIN_HEIGHT);
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
})();

// инициализация формы с правильными данными
