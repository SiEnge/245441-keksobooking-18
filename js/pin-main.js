'use strict';

(function () {
  var PIN_MAIN_WIDTH = 65;
  var PIN_MAIN_HEIGHT = 65;

  var MAP_WIDTH = 1200;

  var COORD_PIN_MAIN = {
    MIN_X: (PIN_MAIN_WIDTH / 2) * -1,
    MAX_X: MAP_WIDTH - (PIN_MAIN_WIDTH / 2),
    MIN_Y: 130,
    MAX_Y: 630
  }

  window.pinMainElement = document.querySelector('.map__pin--main');
  var coordDefaultPinMain = new window.Coordinate(pinMainElement.offsetLeft, pinMainElement.offsetTop);

  var onPinMainEnterPress = function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      page.activate();
    }
  };

  var setStyleCoorsPinMain = function (coord) {
    pinMainElement.style.left = coord.x + 'px';
    pinMainElement.style.top = coord.y + 'px';
  };

  var getCoordCenterPinMain = function (coordPinMain) {
    var coordCenter = {};
    coordCenter.x = Math.round(coordPinMain.x + (PIN_MAIN_WIDTH / 2));
    if (mapElement.classList.contains('map--faded')) {
      coordCenter.y =  Math.round(coordPinMain.y + (PIN_MAIN_HEIGHT / 2));
    } else {
      coordCenter.y =  Math.round(coordPinMain.y + PIN_MAIN_HEIGHT);
    }

    return coordCenter;
  };

  var displayCoordPinMain = function(coord) {
    var coordCenter = getCoordCenterPinMain(coord);
    form.displayCoordAddress(coordCenter);
  };

  window.pinMain = {
    init: function () {
      setStyleCoorsPinMain(coordDefaultPinMain)
      displayCoordPinMain(coordDefaultPinMain);

      pinMainElement.addEventListener('mousedown', page.activate);
      pinMainElement.addEventListener('keydown', onPinMainEnterPress);
      pinMainElement.removeEventListener('mousedown', move);
    },
    activate: function () {
      displayCoordPinMain(coordDefaultPinMain);

      pinMainElement.removeEventListener('mousedown', page.activate);
      pinMainElement.removeEventListener('keydown', onPinMainEnterPress);
      pinMainElement.addEventListener('mousedown', move);
    },
    setCoord: function (shift) {
      var newCoord = new window.Coordinate(pinMainElement.offsetLeft - shift.x, pinMainElement.offsetTop - shift.y)

      var pinMainCoords = new window.Coordinate('', '', COORD_PIN_MAIN.MIN_X, COORD_PIN_MAIN.MAX_X, COORD_PIN_MAIN.MIN_Y, COORD_PIN_MAIN.MAX_Y);
      pinMainCoords.setX(newCoord.x);
      pinMainCoords.setY(newCoord.y);

      setStyleCoorsPinMain(pinMainCoords);
      displayCoordPinMain(pinMainCoords);
    }
  };
})();
