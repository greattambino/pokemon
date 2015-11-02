(function () {
  if (typeof SG === "undefined") {
    window.SG = {};
  }

  var Board = SG.Board = function (dim) {
    this.dim     = dim;
    this.snake   = new SG.Snake(this);
    this.pokemon = new SG.Pokemon(this);
  };

  Board.BLANK_SYMBOL = ".";

  Board.prototype.blankGrid = function (dim) {
    var grid = [];

    for (var i = 0; i < dim; i++) {
      var row = [];
      for (var j = 0; j < dim.length; j++) {
        row.push(Board.BLANK_SYMBOL);
      }
      grid.push(row);
    }

    return grid;
  };

  Board.prototype.render = function () {
    var grid = Board.blankGrid(this.dim);

    this.snake.segments.forEach(function (segment) {
      grid[segment.x][segment.y] = Snake.SYMBOL;
    });

    // join up the rows
    grid.map(function(row) {
      return row.join('');
    }).join("\n");
  };

  Board.prototype.validPosition = function (coord) {
    return (coord.x >= 0) && (coord.y >= 0) &&
      (coord.x < this.dim) && (coord.y < this.dim);
  };
})();
