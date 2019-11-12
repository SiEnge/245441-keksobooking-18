'use strict';

(function () {


  window.adForm = document.querySelector('.ad-form');

  var housingRoomSelect = adForm.querySelector('#room_number');
  var capacitySelect = adForm.querySelector('#capacity');
  var priceInput = adForm.querySelector('#price');
  var typeSelect = adForm.querySelector('#type');
  var timeInSelect = adForm.querySelector('#timein');
  var timeOutSelect = adForm.querySelector('#timeout');

  // библиотека
  var typeToMinPrice = {
    'flat': 1000,
    'bungalo': 0,
    'house': 5000,
    'palace': 10000
  };

// Все <input> и <select> формы .ad-form заблокированы с помощью атрибута disabled, добавленного на них или на их родительские блоки fieldset;
  window.disableAdForm = function () {
    if (!adForm.classList.contains('ad-form--disabled')) {
      adForm.classList.add('ad-form--disabled');
    }

    adForm.reset();

    disabledForm(adForm);
    clearErrorAdForm();
  };

  var clearErrorAdForm = function () {
    var errors = adForm.querySelectorAll('.error__elemForm');
    if (errors.length > 0) {
      for (var i = 0; i < errors.length; i++) {
        var error = errors[i];
        var wrap = error.parentElement;
        wrap.removeChild(error);
        if (wrap.querySelector('input')) wrap.querySelector('input').style = '';
        if (wrap.querySelector('select')) wrap.querySelector('select').style = '';
      }
    }
  };

  window.activateAdForm = function () {
    if (adForm.classList.contains('ad-form--disabled')) {
      adForm.classList.remove('ad-form--disabled');
    }

    activatedForm(adForm);

    // обработчики на каждый элемент формы при change
    // на иннут и на селект ?

    // var selects = adForm.querySelectorAll('select');

    var inputs = adForm.querySelectorAll('input');
    for (var i = 0; i < inputs.length; i++) {
      var input = inputs[i];
      input.addEventListener('change', validityInput);
    }


  };

  window.displayCoordinatePinMain = function (x, y) {
    adForm.querySelector('#address').value = x + ', ' + y;
  };

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    if (validityForm(adForm)) {
      window.upload(new FormData(adForm), window.url.POST_OFFER, onSuccess, onError);
    }
  });

  var btnResetAdForm = adForm.querySelector('.ad-form__reset');
  btnResetAdForm.addEventListener('click', function (evt) {
    evt.preventDefault();

    page.inactivate();
  });




  housingRoomSelect.addEventListener('change', function () {
    validityElemForm(capacitySelect);
  });

  capacitySelect.addEventListener('change', function () {
    validityElemForm(capacitySelect);
  });

  var setMinPriceInput = function (type) {
    priceInput.min = typeToMinPrice[type];
    priceInput.placeholder = typeToMinPrice[type];
  };


  typeSelect.addEventListener('change', function () {
    setMinPriceInput(typeSelect.value);
    validityElemForm(priceInput);
  });

  timeInSelect.addEventListener('change', function () {
    timeOutSelect.value = timeInSelect.value;
  });

  timeOutSelect.addEventListener('change', function () {
    timeInSelect.value = timeOutSelect.value;
  });




  var createErrorMessage = function (errorMessage) {
    var template = document.querySelector('#error').content.querySelector('.error');
    var element = template.cloneNode(true);
    if (errorMessage !== '') element.querySelector('.error__message').innerHTML = errorMessage;
    return element;
  };


  var openErrorMessage = function () {
    var main = document.querySelector('main');
    var message = createErrorMessage();
    main.appendChild(message);

    window.closeErrorMessage = function () {
      main.removeChild(message);
      document.removeEventListener('keydown', onMessageEscPress);
    };

    var errorButton = message.querySelector('.error__button'); // кнопка попробовать снова
    // errorButton.addEventListener('click', closeErrorMessage);
    message.addEventListener('click', closeErrorMessage);
    document.addEventListener('keydown', onErrorMessageEscPress);
    
  };

  var createSuccessMessage = function () {
    var template = document.querySelector('#success').content.querySelector('.success');
    var element = template.cloneNode(true);
    return element;
  };

  var openSuccessMessage = function () {
    var main = document.querySelector('main');
    var message = createSuccessMessage();
    main.appendChild(message);
    window.closeSuccessMessage = function () {
      main.removeChild(message);
      document.removeEventListener('keydown', onSuccessMessageEscPress);
    };
    message.addEventListener('click', closeSuccessMessage);
    document.addEventListener('keydown', onSuccessMessageEscPress);
  };

  var onSuccess = function (response) {
    console.log("форма отправлена");
    page.inactivate();
    //ресет двух форм

    // closePopupCard();
    openSuccessMessage();

    // исходное положение метки + координаты в поле Адрес
  };

  var onError = function (error) {
    openErrorMessage(error);
    console.log("ошибка");
  };


})();


// 2.5. При успешной отправке формы страница, не перезагружаясь, переходит в изначальное неактивное состояние, а также:
// + все заполненные поля возвращются в изначальное состояние, в том числе фильтры;
// + метки похожих объявлений и карточка активного объявления удаляются;
// - метка адреса возвращается в исходное положение;
// - значение поля адреса корректируется соответственно положению метки;
// на экран выводится сообщение об успешной отправке данных. Разметку сообщения, которая находится блоке #success внутри шаблона template, нужно разместить в main;
// сообщение должно исчезать по нажатию на клавишу Esc и по клику на произвольную область экрана за пределами блока с сообщением.
