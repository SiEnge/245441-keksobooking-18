'use strict';

(function () {
  var PIN_MAIN_WIDTH = 65;
  var PIN_MAIN_HEIGHT = 65;
  var PIN_WIDTH = 40;
  var PIN_HEIGHT = 40;
  var coordDefaultPinMain = {};
  window.pinMain = document.querySelector('.map__pin--main');

  window.positionDefaultPinMain = function () {

    if (mapElement.classList.contains('map--faded')) {
      pinMain.style = 'left: ' + coordDefaultPinMain.left + 'px; top: ' + coordDefaultPinMain.top + 'px;';
      // return new Coordinate(coordDefaultPinMain.left + (PIN_MAIN_WIDTH / 2), coordDefaultPinMain.top + (PIN_MAIN_HEIGHT /2 ));
      return new Coordinate(Math.round(coordDefaultPinMain.left + (PIN_MAIN_WIDTH / 2)), Math.round(coordDefaultPinMain.top + (PIN_MAIN_HEIGHT /2 )));
    } else {
      return new Coordinate(Math.round(coordDefaultPinMain.left + (PIN_MAIN_WIDTH / 2)), Math.round(coordDefaultPinMain.top + (PIN_MAIN_HEIGHT)));
    }
  };

  window.positionPinMain = function () {
    return new Coordinate(Math.round(pinMain.offsetLeft + (PIN_MAIN_WIDTH / 2)), Math.round(pinMain.offsetTop + (PIN_MAIN_HEIGHT)));
  };

  // закрытие Попапа по кнопке Закрыть
  window.onPinMainEnterPress = function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      page.activate();
    }
  };

  window.initPinMain = function () {

    // запомнить координаты главной метки по умолчанию
    coordDefaultPinMain = {
      top: pinMain.offsetTop,
      left: pinMain.offsetLeft
    };


    // вывод координат метки в форму
    var coordPinMain = positionDefaultPinMain();
    displayCoordinatePinMain(coordPinMain.x, coordPinMain.y);
  };

  window.createElementPin = function (offerId, offer) {
    if (offer.offer instanceof Object) {
      var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
      var element = pinTemplate.cloneNode(true);
      element.dataset.offerId = offerId;
      element.style = 'left: ' + (offer.location.x - (PIN_WIDTH / 2)) + 'px; top: ' + (offer.location.y - PIN_HEIGHT) + 'px;';
      element.querySelector('img').src = offer.author.avatar || '';
      element.querySelector('img').alt = offer.offer.title || '';

      element.addEventListener('click', openPopupCard);

      element.addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.util.ENTER_KEYCODE) {
          openPopupCard(evt);
        }
      });
    }
    

    return element;
  };

  // снятие выделения с активного пина
  window.deactivatePins = function () {
    var pinActive = mapElement.querySelector('.map__pin--active');
    if (pinActive) {
      pinActive.classList.remove('map__pin--active');
    }
  };

  window.displayPins = window.debounce(function () {
    closePopupCard();

    // фильтрация объявлений
    similarOffers = getOffersFilter();
    map.fill(similarOffers);
  });

  // window.displayPins = function () {
  //   closePopupCard();

  //   // фильтрация объявлений
  //   similarOffers = getOffersFilter();
  //   fillMapPins(similarOffers);
  // };

  var MAP_WIDTH = 1200;
  var PIN_MAIN_HALF = PIN_MAIN_WIDTH / 2;

  window.COORD_PIN_MAIN = {
    MIN_X: -PIN_MAIN_HALF,
    MAX_X: MAP_WIDTH - PIN_MAIN_HALF,
    MIN_Y: 130,
    MAX_Y: 630
  }
  
// var MAP_MIN_X = window.MainPinSizes.WIDTH / 2;
//   var MAP_MAX_X = 1200 - (window.MainPinSizes.WIDTH / 2);
//   var MAP_MIN_Y = 150 - window.MainPinSizes.HEIGHT;
//   var MAP_MAX_Y = 500 - window.MainPinSizes.HEIGHT;

  window.pin = {
    // PIN_MAIN_WIDTH: PIN_MAIN_WIDTH,
    // PIN_MAIN_HEIGHT: PIN_MAIN_HEIGHT,
    PIN_WIDTH: PIN_WIDTH,
    PIN_HEIGHT: PIN_HEIGHT
  };
})();
