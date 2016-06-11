// Enemies our player must avoid
var Enemy = function(y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -101;
    this.y = y;
    this.speed = Math.random() * (300 - 200) + 200;
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
        this.x = Math.random() * 0 + (-200);
        this.speed = Math.random() * (300 - 200) + 200;
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
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    this.sprite = 'images/char-horn-girl.png';
    this.x = 202;
    this.y = 404;
}

Player.prototype.init = function () {
    this.x = 202;
    this.y = 404;
}

Player.prototype.reset = function (dt) {
    // this.render();
    // collision result
    if (this.y >= 72) {
        setTimeout(function() {alert('You lose!');}, dt);
    } else {
        // win result
        setTimeout(function() {alert('Congratulations! You Win!');}, dt);
    }
    // this.init();
    setTimeout(player.init.bind(this), dt);
}

Player.prototype.update = function() {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
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
