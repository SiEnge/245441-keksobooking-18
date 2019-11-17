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
    } else if (y < this._minY) {
      this.y = this._minY;
    } else if (y > this._maxY) {
      this.y = this._maxY;
    }
  };

  window.Coordinate.prototype.setX = function (x) {
    if (x >= this._minX && x <= this._maxX) {
      this.x = x;
    } else if (x < this._minX) {
      this.x = this._minX;
    } else if (x > this._maxX) {
      this.x = this._maxX;
    }
  };
})();
