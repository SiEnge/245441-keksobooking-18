'use strict';

(function () {
  window.offers = [];
  window.similarOffers = [];

  var URL_GET_OFFERS = 'https://js.dump.academy/keksobooking/data';
  var URL_POST_OFFER = 'https://js.dump.academy/keksobooking';

  var onErrorMessageEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      closeErrorMessage();
    }
  };

  var closeErrorMessage = function () {
    var main = document.querySelector('main');
    var errorElement = main.querySelector('.error');
    if (errorElement) {
      main.removeChild(errorElement);
    }
    document.removeEventListener('keydown', onErrorMessageEscPress);
  };

  var showErrorMessage = function (message) {
    var main = document.querySelector('main');
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorElement = errorTemplate.cloneNode(true);
    if (message !== '') {
      var text = errorElement.querySelector('.error__message').textContent + '<br>' + message;
      errorElement.querySelector('.error__message').innerHTML = text;
    }

    errorElement.addEventListener('click', closeErrorMessage);
    document.addEventListener('keydown', onErrorMessageEscPress);
    main.appendChild(errorElement);
  };


  var onError = function (error) {
    showErrorMessage(error);
  };

  var onSuccessMessageEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      closeSuccessMessage();
    }
  };

  var closeSuccessMessage = function () {
    var main = document.querySelector('main');
    var successElement = main.querySelector('.success');
    if (successElement) {
      main.removeChild(successElement);
    }
    document.removeEventListener('keydown', onSuccessMessageEscPress);
  };

  var showSuccessMessage = function () {
    var main = document.querySelector('main');
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var successElement = successTemplate.cloneNode(true);

    successElement.addEventListener('click', closeSuccessMessage);
    document.addEventListener('keydown', onSuccessMessageEscPress);
    main.appendChild(successElement);
  };


  var onSuccessUnload = function () {
    window.page.inactivate();
    showSuccessMessage();
  };

  var onSuccessLoad = function (data) {
    window.offers = data;
    window.pin.display();
    window.util.activatedForm(window.filterElement);
  };


  window.data = {
    loadOffers: function () {
      window.ajax.load(URL_GET_OFFERS, onSuccessLoad, onError);
    },
    sendOffer: function (data) {
      window.ajax.upload(data, URL_POST_OFFER, onSuccessUnload, onError);
    }
  };
})();
