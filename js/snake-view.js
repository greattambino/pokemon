(function () {
  if (typeof SG === "undefined") {
    window.SG = {};
  }

  var BOARD_SIZE = 17;

  var View = SG.View = function ($el) {
    this.$el = $el;

    this.board = new SG.Board(BOARD_SIZE);
    this.setupGrid();

    this.intervalId = window.setInterval(this.step.bind(this), 200);

    $(window).on("keydown", this.handleKeyDown.bind(this));
  };

  View.prototype.step = function () {
    var snake = this.board.snake;

    if (snake.segments.length > 0) {
      snake.move();
      this.render();
    } else {
      alert("Game Over!");
      window.clearInterval(this.intervalId);
    }
  };

  View.prototype.handleKeyDown = function (e) {
    var snake = this.board.snake;

    switch (e.keyCode) {
      case 37: snake.turn("W"); break;
      case 38: snake.turn("N"); break;
      case 39: snake.turn("E"); break;
      case 40: snake.turn("S"); break;
    }
  };

  View.prototype.render = function () {
    this.updateClasses(this.board.snake.segments, "snake");
    this.updateClasses(this.board.snake.segments.slice(-1), "ash");
    this.updateClasses([this.board.pokemon.position], "pokemon");
  };

  View.prototype.updateClasses = function (coords, className) {
    // remove classNames for li's
    var i = this.board.snake.segments.length;

    if (className === "pokemon") {
      this.$li.filter("." + className + i.toString()).removeClass();
    } else if (className === "ash") {
      this.$li.filter(".ash-w").removeClass();
      this.$li.filter(".ash-n").removeClass();
      this.$li.filter(".ash-e").removeClass();
      this.$li.filter(".ash-s").removeClass();
    } else {
      this.$li.filter("." + className).removeClass();
    }

    // add classNames to new li's
    coords.forEach(function (coord) {
      var flatCoord = coord.x * this.board.dim + coord.y;
      if (className === "pokemon") {
        this.$li.eq(flatCoord).addClass(className + i.toString());
      } else if (className === "snake") {
        this.$li.eq(flatCoord).addClass(className);
      } else {
        switch (this.board.snake.dir) {
          case "W": this.$li.eq(flatCoord).addClass("ash-w"); break;
          case "N": this.$li.eq(flatCoord).addClass("ash-n"); break;
          case "E": this.$li.eq(flatCoord).addClass("ash-e"); break;
          case "S": this.$li.eq(flatCoord).addClass("ash-s"); break;
        }
      }
    }.bind(this));
  };

  View.prototype.setupGrid = function () {
    var html = "";

    for (var i = 0; i < BOARD_SIZE; i++) {
      html += "<ul>";
      for (var j = 0; j < BOARD_SIZE; j++) {
        html += "<li></li>";
      }
      html += "</ul>";
    }

    this.$el.html(html);
    this.$li = this.$el.find("li");
  };
})();
