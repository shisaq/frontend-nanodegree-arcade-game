'use strict';
// this function gets a random data from a stable scope.
// See: https://goo.gl/q1r8gU
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
// Enemies our player must avoid
var Enemy = function(y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -101;
    this.y = y;
    this.speed = getRandomArbitrary(200, 800);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x <= 505) {
        // increase the x value of enemy, until the end of canvas
        this.x += this.speed * dt;
    } else {
        // make the x value negative enough to let the specify line
        // have a little break
        this.x = getRandomArbitrary(-500, -101);
        this.speed = getRandomArbitrary(200, 800);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.checkCollisions = function (dt) {
    // collision or win judgement
    if ((player.x < this.x + 83 &&
        player.x + 83 > this.x &&
        player.y < this.y + 60 &&
        player.y + 60 > this.y) ||
        player.y < 0) {
        player.reset(dt);
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    this.sprite = 'images/char-horn-girl.png';
    this.heart = 'images/Heart.png';
    this.lifeNum = 3;
    this.x = 202;
    this.y = 404;
};

Player.prototype.init = function () {
    this.lifeNum = 3;
    this.x = 202;
    this.y = 404;
};

Player.prototype.reset = function (dt) {
    // collision result
    if (this.y >= 72) {
        // this means collision occurs, so heart should minus 1
        this.lifeNum--;
        if (this.lifeNum > 0) {
            this.x = 202;
            this.y = 404;
        } else {
            // lose result
            // make init method run after a dt time, so that it has
            // enough time to render the collision moment
            setTimeout(function() {alert('You lose!');}, dt);
            setTimeout(this.init.bind(this), dt);
        }
    } else {
        // win result
        // make init method run after a dt time, so that it has
        // enough time to render the collision moment
        setTimeout(function() {alert('Congratulations! You Win!');}, dt);
        setTimeout(this.init.bind(this), dt);
    }
};

Player.prototype.update = function() {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    // draw 3 init hearts on the bottom of canvas
    if (this.lifeNum === 3) {
        ctx.drawImage(Resources.get(this.heart), 202, 545);
        ctx.drawImage(Resources.get(this.heart), 303, 545);
        ctx.drawImage(Resources.get(this.heart), 404, 545);
    }
    if (this.lifeNum === 2) {
        this.clearHeart(404);
    }
    if (this.lifeNum === 1) {
        this.clearHeart(303);
    }
    if (this.lifeNum === 0) {
        this.clearHeart(202);
    }
};

// draw a white rectangle to clear hearts
Player.prototype.clearHeart = function (clearX) {
    ctx.fillStyle = '#fff';
    ctx.fillRect(clearX, 590, 101, 101);
};

Player.prototype.handleInput = function (key) {
    if (key === 'left') {
        this.x -= 101;
        // make sure player cannot move out of the map
        if (this.x <= 0) {this.x = 0;}
    }
    if (key === 'up') {
        this.y -= 83;
    }
    if (key === 'right') {
        this.x += 101;
        // make sure player cannot move out of the map
        if (this.x >= 404) {this.x = 404;}
    }
    if (key === 'down') {
        this.y += 83;
        // make sure player cannot move out of the map
        if (this.y >= 404) {this.y = 404;}
    }
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

// // method 1
// // define 3 kinds of enemies from 3 different lines
// var enemyUpper = new Enemy();
// enemyUpper.y = 60;
// var enemyMiddle = new Enemy();
// enemyMiddle.y = 143;
// var enemyLower = new Enemy();
// enemyLower.y = 226;
// var allEnemies = [
//     enemyUpper,
//     enemyMiddle,
//     enemyLower
// ];

// // method 2
// // use a better way to define every line of enenies
// var allEnemies = [];
// Enemy.prototype.reset = function () {
//     for(var i = 0; i < 3; i++) {
//         allEnemies[i] = new Enemy();
//         allEnemies[i].y = 60 + i * 83;
//     }
// }
// Enemy.prototype.reset();

// // method 3
// // a better way by Susan Smith, Udacity coach!
var allEnemies = [];
// define the value of enemy.y for 3 lines
var yArray = [60, 143, 226];
yArray.forEach( function(y_value) {
    allEnemies.push(new Enemy(y_value));
});

// Place the player object in a variable called player
var player = new Player();
