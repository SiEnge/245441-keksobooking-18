'use strict';

(function () {
  var RoomsCount = {
    ONE: '1',
    TWO: '2',
    THREE: '3',
    ONE_HUNDRED: '100'
  };

  var CapacityCount = {
    ONE: '1',
    TWO: '2',
    THREE: '3',
    NULL: '0'
  };

  var displayErrorMessageForm = function (elem, message) {
    var wrapElement = elem.parentElement;
    var errorElement = wrapElement.querySelector('.error__elemForm');
    if (errorElement) {
      errorElement.textContent = message;
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

  var checkCapacityRooms = function (rooms, capacity) {
    if (rooms === RoomsCount.ONE && capacity === CapacityCount.ONE) {
      return true;
    } else if (rooms === RoomsCount.TWO && (capacity === CapacityCount.ONE || capacity === CapacityCount.TWO)) {
      return true;
    } else if (rooms === RoomsCount.THREE && (capacity === CapacityCount.ONE || capacity === CapacityCount.TWO || capacity === CapacityCount.THREE)) {
      return true;
    } else if (rooms === RoomsCount.ONE_HUNDRED && capacity === CapacityCount.NULL) {
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
      var selectElements = form.querySelectorAll('select');
      var inputElements = form.querySelectorAll('input');

      inputElements.forEach(function (element) {
        checkForm = window.validity.elemForm(element);
        if (!checkForm.flag) {
          flagValidForm = false;
        }
      });

      selectElements.forEach(function (element) {
        checkForm = window.validity.elemForm(element);
        if (!checkForm.flag) {
          flagValidForm = false;
        }
      });

      return flagValidForm;
    }

  };
})();
