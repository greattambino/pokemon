(function () {
  if (typeof SG === "undefined") {
    window.SG = {};
  }

  var Pokemon = SG.Pokemon = function (board) {
    this.board = board;
    this.replace();
  };

  Pokemon.prototype.replace = function () {
    var x = Math.floor(Math.random() * this.board.dim);
    var y = Math.floor(Math.random() * this.board.dim);

    // Ensure pokemon isn't place on the snake
    while (this.board.snake.isOccupying([x, y])) {
      x = Math.floor(Math.random() * this.board.dim);
      y = Math.floor(Math.random() * this.board.dim);
    }

    this.position = new SG.Coord(x, y);
  };
})();
