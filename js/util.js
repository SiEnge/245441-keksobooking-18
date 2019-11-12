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


  window.Coordinate = function (x, y, minX, maxX, minY, maxY) {
    this.x = x;
    this.y = y;

    this._minX = minX;
    this._maxX = maxX;
    this._minY = minY;
    this._maxY = maxY;
  };

  Coordinate.prototype.setX = function(x) {
    this.x = x;
  };

  Coordinate.prototype.setY = function(y) {
    if (y >= this._minY && 
        y <= this._maxY) {
      this.y = y;
    }
  };

  Coordinate.prototype.setX = function(x) {
    if (x >= this._minX && 
        x <= this._maxX) {
      this.x = x;
    }
  };

  window.disabledForm = function (form) {
    var fieldsets = form.querySelectorAll('fieldset');
    if (fieldsets.length > 0) {
      for (var i = 0; i < fieldsets.length; i++) {
        fieldsets[i].disabled = true;
      }
    }
    
    var selects = form.querySelectorAll('select');
    if (selects.length > 0) {
      for (var i = 0; i < selects.length; i++) {
        selects[i].disabled = true;
      }
    }
  };

  window.activatedForm = function (form) {
    var fieldsets = form.querySelectorAll('fieldset');
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].disabled = false;
    }

    var selects = form.querySelectorAll('select');
    if (selects.length > 0) {
      for (var i = 0; i < selects.length; i++) {
        selects[i].disabled = false;
      }
    }
  };


})();

'use strict';
(function () {
  var DEBOUNCE_INTERVAL = 500; // ms
  
  window.debounce = function (cb) {
    var lastTimeout = null;

    return function() {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function() {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };
})();
