(function () {
  if (typeof SG === "undefined") {
    window.SG = {};
  }

  var SnakeAI = SG.SnakeAI = function(board) {
    this.dir = "N";
    this.board = board;
    this.score = 0;

    var center = new SG.Coord(Math.floor(board.dim/2) -1,
                              Math.floor(board.dim/2) -1)
    this.segments = [center];
    this.growTurns = 0;
  };

  SnakeAI.SYMBOL = "S";

  SnakeAI.prototype.catchPokemon = function () {
    var head = this.head();
    var pokemon = this.board.pokemon.position
    if (head.equals(pokemon)) {
      this.growTurns += 1;
      return true;
    } else {
      return false;
    }
  };

  SnakeAI.prototype.head = function () {
    // get the last element in the the snake array
    return this.segments[this.segments.length - 1];
  };

  SnakeAI.prototype.isOccupying = function (array) {
    var result = false;
    this.segments.forEach(function (segment) {
      if (segment.x === array[0] && segment.y === array[1]) {
        result = true;
        return result;
      }
    });

    return result;
  };


  SnakeAI.prototype.move = function() {
    var head = this.head();
    var nextPos = this.nextPos();

    // move snake forward
    this.segments.push(nextPos);

    // catch pokemon
    if (this.catchPokemon()) {
      this.board.pokemon.replace();
      this.increaseScore();
    }

    // if not growing, remove tail segment
    if (this.growTurns > 0) {
      this.growTurns -= 1;
    } else {
      this.segments.shift();
    }

    // destroy snake if it runs into itself or off the grid
    // if (!this.isValid()) {
    //   this.segments = [];
    // }
  };


  SnakeAI.prototype.increaseScore = function () {
    this.score += (this.segments.length - 1);
  };


  SnakeAI.prototype.neighbors = function (pos) {
    var x = pos.x,
        y = pos.y;

    return [
      {coord: new SG.Coord(x-1, y), dir: "N"},
      {coord: new SG.Coord(x, y+1), dir: "E"},
      {coord: new SG.Coord(x+1, y), dir: "S"},
      {coord: new SG.Coord(x, y-1), dir: "W"}
    ];
  };

  SnakeAI.prototype.sortByCost = function (coords, goal) {
    nodes = [];

    coords.forEach(function (node) {
      nodes.push({
        node: node.coord,
        dir: node.dir,
        cost: this.heuristicCost(node.coord, goal)
      });
    }.bind(this));

    sorted = nodes.sort(function (left, right) {
      if (left.cost <= right.cost) { return -1; }
      if (left.cost > right.cost) { return 1; }
    });

    return sorted;
  };

  SnakeAI.prototype.heuristicCost = function (node, goal) {
    // This is the Manhattan distance. Cost of moving 1 position is 1
    var d1 = Math.abs(goal.x - node.x);
    var d2 = Math.abs(goal.y - node.y);
    return d1 + d2;
  };

  SnakeAI.prototype.nextPos = function () {
    var head = this.head();
    var coords = this.neighbors(head)
    var segments = this.segments.concat(this.board.snake.segments);

    for (var i = 0; i < coords.length; i++) {
      if (!this.isValid(coords[i].coord)) {
        delete coords[i];
      }
    }

    var costs = this.sortByCost(coords, this.board.pokemon.position);
    if (costs[0]) {
      this.dir = costs[0].dir;
      return costs[0].node;
    }
  };

  SnakeAI.prototype.isValid = function (pos) {
    var head = this.head();

    if (!this.board.validPosition(this.head())) { return false; }

    for (var i = 0; i < this.segments.length - 1; i++) {
      if (this.segments[i].equals(pos)) { return false; }
    }

    return true;
  };
})(this);
