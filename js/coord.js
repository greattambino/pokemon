(function () {
  if (typeof SG === "undefined") {
    window.SG = {};
  }

  var Coord = SG.Coord = function(x, y) {
    this.x = x;
    this.y = y;
  };

  Coord.prototype.plus = function(coord2) {
    return new Coord(this.x + coord2.x, this.y + coord2.y)
  };

  Coord.prototype.equals = function(coord2) {
    return (this.x == coord2.x) && (this.y == coord2.y);
  };

  Coord.prototype.isOpposite = function(coord2) {
    return (this.x == (-1 * coord2.x)) && (this.y == (-1 * coord2.y));
  };
})();
