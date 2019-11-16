'use strict';

(function () {
  var formElement = document.querySelector('.ad-form');
  window.formElement = formElement;

  var housingRoomSelect = formElement.querySelector('#room_number');
  var capacitySelect = formElement.querySelector('#capacity');
  var priceInput = formElement.querySelector('#price');
  var typeSelect = formElement.querySelector('#type');
  var timeInSelect = formElement.querySelector('#timein');
  var timeOutSelect = formElement.querySelector('#timeout');
  var btnReset = formElement.querySelector('.ad-form__reset');

  var MinPriceType = {
    'flat': 1000,
    'bungalo': 0,
    'house': 5000,
    'palace': 10000
  };

  housingRoomSelect.addEventListener('change', function () {
    window.validity.elemForm(capacitySelect);
  });

  capacitySelect.addEventListener('change', function () {
    window.validity.elemForm(capacitySelect);
  });

  var setMinPriceInput = function (type) {
    priceInput.min = MinPriceType[type];
    priceInput.placeholder = MinPriceType[type];
  };


  typeSelect.addEventListener('change', function () {
    setMinPriceInput(typeSelect.value);
    window.validity.elemForm(priceInput);
  });

  timeInSelect.addEventListener('change', function () {
    timeOutSelect.value = timeInSelect.value;
  });

  timeOutSelect.addEventListener('change', function () {
    timeInSelect.value = timeOutSelect.value;
  });

  btnReset.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.page.inactivate();
  });

  var clearErrorAdForm = function () {
    var errors = formElement.querySelectorAll('.error__elemForm');
    if (errors.length > 0) {
      for (var i = 0; i < errors.length; i++) {
        var error = errors[i];
        var wrap = error.parentElement;
        wrap.removeChild(error);
        if (wrap.querySelector('input')) {
          wrap.querySelector('input').style = '';
        }
        if (wrap.querySelector('select')) {
          wrap.querySelector('select').style = '';
        }
      }
    }
  };

  formElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
    if (window.validity.checkForm(formElement)) {
      window.data.sendOffer(new FormData(formElement));
    }
  });

  window.form = {
    disable: function () {
      if (!formElement.classList.contains('ad-form--disabled')) {
        formElement.classList.add('ad-form--disabled');
      }

      formElement.reset();

      window.util.disabledForm(formElement);
      clearErrorAdForm();
    },
    activate: function () {
      if (formElement.classList.contains('ad-form--disabled')) {
        formElement.classList.remove('ad-form--disabled');
      }

      window.util.activatedForm(formElement);

      var inputElements = formElement.querySelectorAll('input');
      for (var i = 0; i < inputElements.length; i++) {
        var inputElement = inputElements[i];
        inputElement.addEventListener('change', window.validity.isnput);
      }
    },
    displayCoordAddress: function (coord) {
      formElement.querySelector('#address').value = coord.x + ', ' + coord.y;
    }
  };
})();
