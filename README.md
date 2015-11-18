# Pokemon - Gotta Catch 'Em All
A game inspired by the classic game of Snake with a Pokemon twist

[Live link!](www.marctambara.com/pokemon)

##Summary
Compete against an AI player to catch the most Pokemon before dying.

It's a little tricky because the AI uses the Manhattan distance heuristic to calculate the minimum cost and optimal path to the target coordinate.

However, don't fret! I've given you the ability to run like Usain Bolt. Just hold down the space bar to get that quick boost in speed and give yourself an advantage that makes up for our slow reaction times.

![Pokemon](/screenshot.jpg)

##Game
 - Utilizes jQuery key listeners for real-time DOM manipulation

```javascript
View.prototype.handleKeyDown = function (e) {
  e.preventDefault();
  var snake = this.board.snake;
  // handle space keyDown to start
  if (!this.started &&
    !this.paused &&
    e.keyCode == 32) {
      if (!this.ended) {
        this.start();
      } else {
        this.restart();
      }
  }
  // handle "space" keyDown during game to increase speed
  if (this.started &&
    e.keyCode == 32 &&
    this.speed !== View.FAST_SPEED) {
    this.updateInterval(View.FAST_SPEED);
  // handle "p" keyDown to toggle pause
  } else if (this.started && e.keyCode == 80) {
    this.paused = !this.paused;
    this.updateGameMenu();
  }
  // handle arrow keys to turn
  switch (e.keyCode) {
    case 37: snake.turn("W"); break;
    case 38: snake.turn("N"); break;
    case 39: snake.turn("E"); break;
    case 40: snake.turn("S"); break;
  }
};
```

##AI Functionality
 - Determines the adjacent cardinal coordinates relative to the head
 - Checks which coordinates are valid (ensuring it does not hit its body or run into the wall)
 - Sorts each path to the target node by cost
 - Executes the optimal next move

```javascript
SnakeAI.prototype.nextPos = function () {
  var head = this.head();
  var coords = this.neighbors(head);

  for (var i = 0; i < coords.length; i++) {
    // if this coord is not valid, disregard it
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
```
