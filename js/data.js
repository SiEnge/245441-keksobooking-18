'use strict';

(function () {
  var URL_GET_OFFERS = 'https://js.dump.academy/keksobooking/data';
  var URL_POST_OFFER = 'https://js.dump.academy/keksobooking';

  window.offers = [];
  window.similarOffers = [];

  var onMessageClick = function () {
    closeMessage();
  };

  var onMessageEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      closeMessage();
    }
  };

  var showMessage = function (typeMessage, textMessage) {
    var main = document.querySelector('main');
    var template = document.querySelector('#' + typeMessage).content.querySelector('.' + typeMessage);
    var message = template.cloneNode(true);
    if (textMessage && textMessage !== '') {
      var text = textMessage;
      message.querySelector('.error__message').textContent = text;
    }
    message.classList.add('message');
    message.addEventListener('click', onMessageClick);
    document.addEventListener('keydown', onMessageEscPress);
    main.appendChild(message);
  };

  var closeMessage = function () {
    var main = document.querySelector('main');
    var message = main.querySelector('.message');

    if (message) {
      main.removeChild(message);
    }
    document.removeEventListener('keydown', onMessageEscPress);
  };

  var onError = function (error) {
    showMessage('error', error);
  };

  var onSuccessUnload = function () {
    window.page.inactivate();
    showMessage('success');
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
