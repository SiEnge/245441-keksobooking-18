'use strict';
(function () {

  window.Coordinate = function (x, y, minX, maxX, minY, maxY) {
    this.x = x;
    this.y = y;

    this._minX = minX;
    this._maxX = maxX;
    this._minY = minY;
    this._maxY = maxY;
  };

  window.Coordinate.prototype.setY = function (y) {
    if (y >= this._minY && y <= this._maxY) {
      this.y = y;
    }
  };

  window.Coordinate.prototype.setX = function (x) {
    if (x >= this._minX && x <= this._maxX) {
      this.x = x;
    }
  };
})();
