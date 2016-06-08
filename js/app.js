// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -101;
    this.randomNum = Math.random() * 800 + 150;
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x <= 505) {
        // increase the x value of enemy, until the end of canvas
        this.x += this.randomNum * dt;
    } else {
        // make the x value negative enough to let the specify line
        // have a little break
        this.x = -100000;
        // define how long the line will stay on blank. I used
        // setTimeout with bind, to use the correct 'this', based
        // on Mozilla MDN, see link: https://goo.gl/hrdHAx
        setTimeout(Enemy.bind(this),(Math.random() * 2000 + 0));
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
for(var i = 0; i < 3; i++) {
    allEnemies[i] = new Enemy();
    allEnemies[i].y = 60 + i * 83;
}

var player = {};

player.init = function () {
     this.x = 202;
     this.y = 404;
}

player.init();

player.sprite = 'images/char-horn-girl.png';

player.update = function() {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // collision judgement
    if ((Math.abs(this.x - Math.trunc(allEnemies[2].x)) <= 60 && this.y === 238) ||
        (Math.abs(this.x - Math.trunc(allEnemies[1].x)) <= 60 && this.y === 155) ||
        (Math.abs(this.x - Math.trunc(allEnemies[0].x)) <= 60 && this.y === 72)) {
        player.init();
    }

    // // win judgement
    if (this.y < 72) {
        player.init();
        alert('You Win! Press enter to restart!');
    }
};

player.render = function() {
    ctx.drawImage(Resources.get(player.sprite), player.x, player.y);
};

player.handleInput = function (key) {
    if (key === 'left') {
    player.x -= 101;
    }
    if (key === 'up') {
    player.y -= 83;
    }
    if (key === 'right') {
    player.x += 101;
    }
    if (key === 'down') {
    player.y += 83;
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
