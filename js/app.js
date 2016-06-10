// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -101;
    this.speed = Math.random() * 800 + 150;
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
        this.speed = Math.random() * 800 + 150;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// define 3 kinds of enemies from 3 different lines
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

// use a better way to define every line of enenies
var allEnemies = [];
Enemy.prototype.reset = function () {
    for(var i = 0; i < 3; i++) {
        allEnemies[i] = new Enemy();
        allEnemies[i].y = 60 + i * 83;
    }
}
Enemy.prototype.reset();

// start player part
var Player = function () {
    this.sprite = 'images/char-horn-girl.png';
    this.x = 202;
    this.y = 404;
}

Player.prototype.init = function () {
     this.x = 202;
     this.y = 404;
}

Player.prototype.reset = function () {
    // collision result
    if (this.y >= 72) {
        alert('You lose! Press enter to restart!');
    }

    // win result
    if (this.y < 72) {
        alert('Congratulations! You Win!');
    }
    this.init();
}

Player.prototype.update = function() {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // collision judgement
    if ((Math.abs(this.x - allEnemies[2].x) <= 60 && this.y === 238) ||
        (Math.abs(this.x - allEnemies[1].x) <= 60 && this.y === 155) ||
        (Math.abs(this.x - allEnemies[0].x) <= 60 && this.y === 72)) {
        this.reset();
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (key) {
    if (key === 'left') {
        player.x -= 101;
        // make sure player cannot move out of the map
        if (this.x <= 0) {this.x = 0;}
    }
    if (key === 'up') {
        player.y -= 83;
        if (this.y <= 0) {
            this.render();
            this.reset();
        }
    }
    if (key === 'right') {
        player.x += 101;
        // make sure player cannot move out of the map
        if (this.x >= 404) {this.x = 404;}
    }
    if (key === 'down') {
        player.y += 83;
        // make sure player cannot move out of the map
        if (this.y >= 404) {this.y = 404;}
    }
};

var player = new Player();

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
