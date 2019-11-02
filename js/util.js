'use strict';
(function () {

  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  // константы клавиш
  window.util = {
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE
  };

  // библиотека типов жилья
  window.util.typeToNameType = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  // закрытие Попапа по кнопке Закрыть
  window.onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopupCard();
    }
  };

   // закрытие Попапа по кнопке Закрыть
  window.onSuccessMessageEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeSuccessMessage();
    }
  };

   // закрытие Попапа по кнопке Закрыть
  window.onErrorMessageEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeErrorMessage();
    }
  };

  // случайное целое число в пределах от min до max
  // var random = function (min, max) {
  //   var rand = min + Math.random() * (max + 1 - min);
  //   return Math.floor(rand);
  // };

  // создание массива случайной длины
  window.createRandomArray = function (array) {
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

})();
