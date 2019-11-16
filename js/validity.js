'use strict';

(function () {
  var RoomsCount = {
    one: '1',
    two: '2',
    three: '3',
    oneHundred: '100'
  };

  var CapacityCount = {
    one: '1',
    two: '2',
    three: '3',
    no: '0'
  };

  // показ сообщения об ошибке на форме
  var displayErrorMessageForm = function (elem, message) {
    var wrapElement = elem.parentElement;
    var errorElement = wrapElement.querySelector('.error__elemForm');
    if (errorElement) {
      errorElement.innerHTML = message;
    } else {
      elem.insertAdjacentHTML('afterend', '<p class="error__elemForm" style="color: red; margin-top: 6px;">' + message.join('<br>') + '</p>');
    }

    elem.style = 'border: 1px solid red';
  };

  var hideErrorMessageForm = function (elem) {
    var wrapElement = elem.parentElement;
    var errorElement = wrapElement.querySelector('.error__elemForm');
    if (errorElement) {
      wrapElement.removeChild(errorElement);
    }
    elem.style = '';
  };

  // проверка соответствия комнат и количества гостей
  var checkCapacityRooms = function (rooms, capacity) {
    if (rooms === RoomsCount.one && capacity === CapacityCount.one) {
      return true;
    } else if (rooms === RoomsCount.two && (capacity === CapacityCount.one || capacity === CapacityCount.two)) {
      return true;
    } else if (rooms === RoomsCount.three && (capacity === CapacityCount.one || capacity === CapacityCount.two || capacity === CapacityCount.three)) {
      return true;
    } else if (rooms === RoomsCount.oneHundred && capacity === CapacityCount.no) {
      return true;
    }
    return false;
  };


  window.validity = {
    elemForm: function (elem) {
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
      if (elem === window.formElement.querySelector('#room_number') || elem === window.formElement.querySelector('#capacity')) {
        if (!checkCapacityRooms(window.formElement.querySelector('#room_number').value, window.formElement.querySelector('#capacity').value)) {
          checkValidate.flag = false;
          checkValidate.message.push('Выбранное количество гостей не подходит под количество комнат');
        }
      }

      if (!checkValidate.flag) {
        displayErrorMessageForm(elem, checkValidate.message);
      } else {
        hideErrorMessageForm(elem);
      }

      return checkValidate;
    },
    input: function (evt) {
      var input = evt.target;
      window.validity.elemForm(input);
    },
    checkForm: function (form) {
      var flagValidForm = true;
      var checkForm;
      var selects = form.querySelectorAll('select');
      var inputs = form.querySelectorAll('input');

      for (var i = 0; i < inputs.length; i++) {
        var input = inputs[i];
        checkForm = window.validity.elemForm(input);
        if (!checkForm.flag) {
          flagValidForm = false;
        }
      }

      for (var j = 0; j < selects.length; j++) {
        var select = selects[j];
        checkForm = window.validity.elemForm(select);
        if (!checkForm.flag) {
          flagValidForm = false;
        }
      }

      return flagValidForm;
    }
  };
})();
