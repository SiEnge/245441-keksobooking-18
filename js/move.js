'use strict';

(function () {

  window.move = function (evt) {
    evt.preventDefault();

    var startCoords = new window.Coordinate(evt.clientX, evt.clientY);

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = new window.Coordinate(startCoords.x - moveEvt.clientX, startCoords.y - moveEvt.clientY);
      startCoords = new window.Coordinate(moveEvt.clientX, moveEvt.clientY);

      pinMain.setCoord(shift);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };
})();
