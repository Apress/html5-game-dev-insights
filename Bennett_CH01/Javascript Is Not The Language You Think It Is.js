

// Example of creating a global variable
globalVariable = 10;

// Example of creating a function-scoped variable
var functionVariable = true;

// Example demonstrating lack of block-scope
for (var i = 0; i < 10; i++) {
    console.log(i);
}
console.log(i);

// Example of variable hoisting. declaration of myHealth inside the
// function decrementHealth is hoisted to the top, resulting in
// console.log printing 'undefined'.
var myHealth = 100;

var decrementHealth = function() {
    console.log(myHealth);
    
    var myHealth = myHealth - 1;
};

// The resulting code after variable hoisting has occurred.
var myHealth = 100;

var decrementHealth = function() {
    var myHealth;
    console.log(myHealth);
    
    myHealth = myHealth - 1;
};

// Example of creating an empty object
x = {};

// Example of creating an object 'player' with property 'health'
player = { health: 10 };

// Example of creating an object with an object as a subproperty
player = {
    health: 10,
    position: {
        x: 325,
        y: 210
    }
};

// Example object to be used in demonstrating prototypical inheritance
var myAwesomeShip = {
    health: 100,
    shields: 50,
    guns: [{
        damage: 20,
        speed: 5
    },{
        damage: 5,
        speed: 9000
    }],
    fire: function() {
        console.log('PEW PEW');
    }
};

// Creating a clone of the above object, then modifying the 'shields'
// property of the clone.
var myMoreAwesomeShip = Object.create(myAwesomeShip);
myMoreAwesomeShip.shields = 100;

// Example of encapsulating the cloning process inside the object
var ship = {
    manufacture: function(shields) {
        var newShip = Object.create(this);
        newShip.shields = shields;
        return newShip;
    },
    health: 100,
    shields: 50,
    guns: [{
        damage: 20,
        speed: 5
    },{
        damage: 5,
        speed: 9000
    }],
    fire: function() {
        console.log('PEW PEW');
    }
};

var myWayMoreAwesomeShip = ship.manufacture(150);

// 'extend' function that takes a prototype to extend a base object by
Object.prototype.extend = function(extendPrototype) {
    var hasOwnProperty = Object.hasOwnProperty;
    var object = Object.create(this);
    
    for (var property in extendPrototype) {
        if(hasOwnProperty.call(extendPrototype, property) || typeof object[property] === 'undefined') {
            object[property] = extendPrototype[property];
        }
    }
    
    return object;
};

// Example use of 'extend' function
var newShipModel = ship.extend({
    health: 200,
    shields: 100,
    fire: function() {
        console.log('TRIPLE PEW!!!');
    }
});

var oldShip = ship.manufacture(100);
var newShip = newShipModel.manufacture(150);
