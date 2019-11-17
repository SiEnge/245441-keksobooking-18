'use strict';

(function () {
  var PIN_MAIN_WIDTH = 65;
  var PIN_MAIN_HEIGHT = 65;

  var MAP_WIDTH = 1200;
  var MAP_MIN_Y = 130;
  var MAP_MAX_Y = 630;

  var CoordinateAddress = {
    MIN_X: (PIN_MAIN_WIDTH / 2) * (-1),
    MAX_X: MAP_WIDTH - (PIN_MAIN_WIDTH / 2),
    MIN_Y: MAP_MIN_Y - PIN_MAIN_HEIGHT,
    MAX_Y: MAP_MAX_Y - PIN_MAIN_HEIGHT
  };

  var pinMainElement = document.querySelector('.map__pin--main');
  window.pinMainElement = pinMainElement;

  var coordDefaultPinMain = new window.Coordinate(pinMainElement.offsetLeft, pinMainElement.offsetTop);

  var onPinMainEnterPress = function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      window.page.activate();
    }
  };

  var setStyleCoorsPinMain = function (coord) {
    pinMainElement.style.left = coord.x + 'px';
    pinMainElement.style.top = coord.y + 'px';
  };

  var getCoordCenterPinMain = function (coordPinMain) {
    var coordCenter = {};
    coordCenter.x = Math.round(coordPinMain.x + (PIN_MAIN_WIDTH / 2));
    if (window.mapElement.classList.contains('map--faded')) {
      coordCenter.y = Math.round(coordPinMain.y + (PIN_MAIN_HEIGHT / 2));
    } else {
      coordCenter.y = Math.round(coordPinMain.y + PIN_MAIN_HEIGHT);
    }
    return coordCenter;
  };

  var displayCoordPinMain = function (coord) {
    var coordCenter = getCoordCenterPinMain(coord);
    window.form.displayCoordAddress(coordCenter);
  };

  var onPinMainClick = function () {
    window.page.activate();
  };

  var onPinMainMouseDown = function (evt) {
    window.move(evt);
  };

  window.pinMain = {

    init: function () {
      setStyleCoorsPinMain(coordDefaultPinMain);
      displayCoordPinMain(coordDefaultPinMain);

      pinMainElement.addEventListener('click', onPinMainClick);
      pinMainElement.addEventListener('keydown', onPinMainEnterPress);
      pinMainElement.removeEventListener('mousedown', onPinMainMouseDown);
    },

    activate: function () {
      displayCoordPinMain(coordDefaultPinMain);

      pinMainElement.removeEventListener('click', onPinMainClick);
      pinMainElement.removeEventListener('keydown', onPinMainEnterPress);
      pinMainElement.addEventListener('mousedown', onPinMainMouseDown);
    },

    setCoord: function (shift) {
      var newCoord = new window.Coordinate(pinMainElement.offsetLeft - shift.x, pinMainElement.offsetTop - shift.y);

      var pinMainCoords = new window.Coordinate('', '', CoordinateAddress.MIN_X, CoordinateAddress.MAX_X, CoordinateAddress.MIN_Y, CoordinateAddress.MAX_Y);
      pinMainCoords.setX(newCoord.x);
      pinMainCoords.setY(newCoord.y);

      setStyleCoorsPinMain(pinMainCoords);
      displayCoordPinMain(pinMainCoords);
    }

  };
})();
