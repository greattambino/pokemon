(function () {
  if (typeof SG === "undefined") {
    window.SG = {};
  }

  var Snake = SG.Snake = function(board) {
    this.dir = "N";
    this.board = board;
    this.score = 0;

    var center = new SG.Coord(Math.floor(board.dim/2),
                              Math.floor(board.dim/2));
    this.segments = [center];
    this.growTurns = 0;
  };

  Snake.SYMBOL = "S";

  Snake.DIFFS = {
    "N": new SG.Coord(-1, 0),
    "E": new SG.Coord(0, 1),
    "S": new SG.Coord(1, 0),
    "W": new SG.Coord(0, -1)
  };

  Snake.prototype.catchPokemon = function () {
    var head = this.head();
    var pokemon = this.board.pokemon.position;
    if (head.equals(pokemon)) {
      this.growTurns += 1;
      this.score += 1;
      return true;
    } else {
      return false;
    }
  };

  Snake.prototype.head = function () {
    // get the last element in the the snake array
    return this.segments[this.segments.length - 1];
  };

  Snake.prototype.isOccupying = function (array) {
    var result = false;
    this.segments.forEach(function (segment) {
      if (segment.x === array[0] && segment.y === array[1]) {
        result = true;
        return result;
      }
    });

    return result;
  };

  Snake.prototype.isValid = function () {
    var head = this.head();

    if (!this.board.validPosition(this.head())) { return false; }

    for (var i = 0; i < this.segments.length - 1; i++) {
      if (this.segments[i].equals(head)) { return false; }
    }

    return true;
  };

  Snake.prototype.move = function() {
    var head = this.head();

    // move snake forward
    this.segments.push(head.plus(Snake.DIFFS[this.dir]));

    // catch pokemon
    if (this.catchPokemon()) {
      this.board.pokemon.replace();
    }

    // if not growing, remove tail segment
    if (this.growTurns > 0) {
      this.growTurns -= 1;
    } else {
      this.segments.shift();
    }

    // destroy snake if it runs into itself or off the grid
    if (!this.isValid()) {
      this.segments = [];
    }
  };

  Snake.prototype.turn = function (dir) {
    // get coord or snake's current direction and new direction
    var cur_dir = Snake.DIFFS[this.dir],
        new_dir = Snake.DIFFS[dir];

    // ensure the snake can't turn back on itself
    if (cur_dir.isOpposite(new_dir)) {
      return;
    } else {
      this.dir = dir;
    }
  };
})(this);
