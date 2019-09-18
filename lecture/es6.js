/**
 * let
 */
var x = 10;
// Here x is 10
{ 
    let x = 2;
    // Here x is 2
}
// Here x is 10

/**
 * const
 */
var x = 10;
// Here x is 10
{ 
    const x = 2;
    // Here x is 2
}
// Here x is 10

/**
 * Exponentiation Operator (**)
 */
var x = 5;
var z = x ** 2; // result is 25

/**
 * Default Parameter Values
 */
function myFunction(x, y = 10) {
    // y is 10 if not passed or undefined
    return x + y;
}
myFunction(5); // will return 15

/**
 * Array.find()
 */
var numbers = [4, 9, 16, 25, 29];
var first   = numbers.find(myFunction);

function myFunction(value, index, array) {
    return value > 18;
}

/**
 * Array.findIndex()
 */
var numbers = [4, 9, 16, 25, 29];
var first   = numbers.findIndex(myFunction);

function myFunction(value, index, array) {
    return value > 18;
}

/**
 * New Number Properties
 */
var x = Number.MIN_SAFE_INTEGER;
var x = Number.MAX_SAFE_INTEGER;

/**
 * New Number Methods
 */
Number.isInteger(10);        // returns true
Number.isInteger(10.5);      // returns false

/**
 * Number.isSafeInteger()
 */
Number.isSafeInteger(10); // returns true
Number.isSafeInteger(12345678901234567890); // returns false

/**
 * New Global Methods
 */
// The global isFinite() method returns false if the argument is Infinity or NaN.Otherwise it returns true
isFinite(10/0);       // returns false
isFinite(10/1);       // returns true

// The global isNaN() method returns true if the argument is NaN. Otherwise it returns false
isNaN("Hello");       // returns true

/**
 * Arrow Functions
 */
// ES5
var x = function(x, y) {
    return x * y;
}

// ES6
const x = (x, y) => x * y;

// https://codetower.github.io/es6-features/#Enhanced%20Object%20Literals