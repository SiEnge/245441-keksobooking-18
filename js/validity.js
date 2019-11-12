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
  // проверка элемента формы
  window.validityElemForm = function (elem) {

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
    if (elem === adForm.querySelector('#room_number') || elem === adForm.querySelector('#capacity')) {
      if (!checkCapacityRooms(adForm.querySelector('#room_number').value, adForm.querySelector('#capacity').value)) {
        checkValidate.flag = false;
        checkValidate.message.push('Выбранное количество гостей не подходит под количество комнат');
      }
    }

    if (!checkValidate.flag) { // если поле не прошло проверку, то вывести сообщение
      displayErrorMessageForm(elem, checkValidate.message);
    } else { // если прошло то убрать сообщение
      hideErrorMessageForm(elem);
    }

    return checkValidate;
  };

  // проверка инпута
  window.validityInput = function (evt) {
    var input = evt.target;
    validityElemForm(input);
  };

  // проверка всей формы
  window.validityForm = function () {
    var flagValidForm = true;
    var checkForm;
    var selects = adForm.querySelectorAll('select');
    var inputs = adForm.querySelectorAll('input');

    for (var i = 0; i < inputs.length; i++) {
      var input = inputs[i];
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

  // показ сообщения об ошибке на форме
  var displayErrorMessageForm = function (elem, message) {
    var wrap = elem.parentElement;
    var error = wrap.querySelector('.error__elemForm');

    //если уже есть блок с ошибкой
    if (error) {
      error.innerHTML = message; 
    } else {
      // if (message !== '') {
        elem.insertAdjacentHTML('afterend', '<p class="error__elemForm" style="color: red; margin-top: 6px;">' + message.join('<br>') + '</p>');
      // }
    }

    elem.style = 'border: 1px solid red';

  };

  // скрытие сообщения об ошибке на форме
  var hideErrorMessageForm = function (elem) {
    var wrap = elem.parentElement;
    var error = wrap.querySelector('.error__elemForm');

    if (error) {
      wrap.removeChild(error);
    }

      elem.style = '';

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

})();
