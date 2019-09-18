/**
 * Syntax
 * var newArray = arr.filter(callback(element[, index[, array]])[, thisArg])
 * 
 * Parameters: 
 * callback
 * Function is a predicate, to test each element of the array. Return true to keep the element, false otherwise. It accepts three arguments:
 *** element
 **** The current element being processed in the array.
 *** index(Optional)
 **** The index of the current element being processed in the array.
 *** array(Optional)
 **** The array filter was called upon.
 *** thisArg(Optional)
 **** Value to use as this when executing callback.
 * 
 * Return value
 * A new array with the elements that pass the test. If no elements pass the test, an empty array will be returned.
 */

let words = ['spray', 'limit', 'elite', 'exuberant', 'distruction', 'present']

const result = words.filter(word => word.length > 6)

// console.log(`result: `, result);

let ages = [32, 33, 16, 40]

function checkAdult(age) {
    return age >= 18
}

function myFunction() {
    console.log('Adults: ', ages.filter(checkAdult));
}

// myFunction()

function isBigEnough(value) {
    return value >= 10
}

let filtered = [12, 5, 8, 130, 44].filter(isBigEnough)

// console.log(`filtered: `, filtered);

let arr = [
    { id: 15 },
    { id: -1 },
    { id: 0 },
    { id: 3 },
    { id: 12.2 },
    { },
    { id: null },
    { id: NaN },
    { id: 'undefined' }
]

let invalidEntries = 0

function isNumber(obj) {
    return obj !== undefined && typeof(obj) === 'number' && !isNaN(obj)
}

function filterByID(item) {
    if (isNumber(item.id) && item.id !== 0) {
        return true
    } else {
        invalidEntries++

        return false
    }
}

let arrByID = arr.filter(filterByID)

// console.log(`arrByID: `, arrByID);
// console.log(`invalidEntries: `, invalidEntries);


let heroes = [
    { name: 'Batman',    franchise: 'DC' },
    { name: 'Ironman',   franchise: 'Marvel' },
    { name: 'Thor',      franchise: 'Marvel' },
    { name: 'Superman',  franchise: 'DC' },
    { name: 'Spiderman', franchise: 'Marvel' },
]

let marvelHeroes = heroes.filter(hero => hero.franchise == 'Marvel')

// console.log(`marvelHeroes: `, marvelHeroes);

/**
 * Practice
 */
// 1. Write a function for array of integers that returns the number of times a specific digit appears in any of its numbers.
// solution([5, 15, 55, "515"], "5") == 6

function solution(arr, str) {
    // let singleStr = arr.join("")
    // console.log(`singleStr: `, singleStr);

    // let arrStr = singleStr.split('')
    // console.log(`arrStr: `, arrStr);
    
    // let filtered = arrStr.filter(c => c === str)

    // return filtered.length

   return arr.join('').split('').filter(c => c === str).length
}

Array.prototype.mySolution = function (str) {
    return this.join('').split('').filter(c => c === str).length
}

let arr45 = [5, 15, 55, "515"]


// 2. Write a function that accepts a string as its input, and returns the same string just with duplicate letters removed.
// solution("Mississippi") === "Misp"

function solution_1(str) {
    return str.split('').filter(
        function (letter, index, array) {
            return array.indexOf(letter) == index
        }
    ).join('')
}

function solution_2(str) {
    return str.split('').filter((e, i, arr) => arr.indexOf(e) == i).join('')
}