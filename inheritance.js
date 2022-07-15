// Function.prototype.inherits = function(superClass) {
//     function Surrogate () {}
//     Surrogate.prototype = superClass.prototype;
//     this.prototype = new Surrogate();
//     this.prototype.constructor = this;
// }

Function.prototype.inherits = function(superClass) {
    this.prototype = Object.create(superClass.prototype);
    this.prototype.constructor = this;
}

// JS will check instance attributes first, then instance methods
// Then it will travel up the inheritance chain
function MovingObject (speed) {
    this.speed = speed;
}
MovingObject.prototype.travelSpeed = function() {
    console.log(`Moving at ${this.speed} mph.`);
}

function Ship (speed) {
    this.speed = speed;
}
Ship.inherits(MovingObject);
Ship.prototype.capacity = function(num) {
    console.log(`We have ${num} humans onboard.`);
}

function Asteroid (speed) {
    this.speed = speed;
}
Asteroid.inherits(MovingObject);
Asteroid.prototype.size = function(size) {
    console.log(`I am ${size} miles in diameter.`);
}

const movingObject = new MovingObject(500);
const ship = new Ship(250);
const asteroid = new Asteroid(100);

movingObject.travelSpeed();
ship.travelSpeed();
asteroid.travelSpeed();
//movingObject.capacity(20);
ship.capacity(30);
//asteroid.capacity(40);
//movingObject.size(1);
//ship.size(2);
asteroid.size(3);
