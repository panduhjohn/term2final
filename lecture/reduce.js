/**
 * Syntax
 * arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])
 */

/**
 * ParametersSection

callback
A function to execute on each element in the array (except for the first, if no initialValue is supplied), taking four arguments:
accumulator
The accumulator accumulates the callback's return values. It is the accumulated value previously returned in the last invocation of the callback, or initialValue, if supplied (see below).
currentValue
The current element being processed in the array.
currentIndex Optional
The index of the current element being processed in the array. Starts from index 0 if an initialValue is provided. Otherwise, starts from index 1. 
array Optional
The array reduce() was called upon.
initialValue Optional
A value to use as the first argument to the first call of the callback. If no initialValue is supplied, the first element in the array will be used. Calling reduce() on an empty array without an initialValue will throw a TypeError. 
Return valueSection

The single value that results from the reduction.
 */

// 1
let arr = [10, 12, 23]

let sum = arr.reduce((accumulator, item, index) => {
    // console.log(`accumulatorBefore: `, accumulator);
    // console.log(`item: `, item);
    // console.log(`index: `, index);
    
    accumulator += item
    // console.log(`accumulatorAfter: `, accumulator);
    // console.log('=======================')

    return accumulator
}, 0)

// console.log(`sum: `, sum);


// 2
let sum2 = arr.reduce((acc, num) => acc + num, 0)

// console.log(`sum2: `, sum2);

// 3
let arr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

let sum3 = arr2.reduce((acc, num) => num % 2 != 0 ? acc + num : acc, 0)

// console.log(`sum3: `, sum3);

let sum4 = arr2.reduce((acc, num) => {
    if (num % 2 == 0) {
        return acc + num
    } else {
        return acc
    }
}, 0)

// console.log(`sum4: `, sum4);

// 4
let pilots = [
    {
        id: 10,
        name: 'Poe Dameron',
        years: 24
    },
    {
        id: 2,
        name: 'Temmin Wexley',
        years: 30
    },
    {
        id: 41,
        name: 'Tallisan Lintra',
        years: 16
    },
    {
        id: 99,
        name: 'Ello Astry',
        years: 22
    }
]

// get the sum of years for all pilots
let totalYears = pilots.reduce(function (acc, pilot) {
    return acc + pilot.years
}, 0)

let totalYears_2 = pilots.reduce((acc, pilot) => acc + pilot.years, 0)

// console.log(`totalYears_2: `, totalYears_2);

// console.log(`totalYears: `, totalYears);

// get the most experienced pilot
let mostExpPilot = pilots.reduce(function (oldest, pilot) {
    console.log(`oldest: `, oldest);
    console.log(`pilot: `, pilot);
    console.log('==================');
    
    return (oldest.years || 0) > pilot.years ? oldest : pilot
}, {})

let mostExpPilot_2 = pilots.reduce((oldest, pilot) => (oldest.years || 0) > pilot.years ? oldest : pilot, {})

// Practice:
// 1. Write a function that accepts a string as its input, and returns the same string just with duplicate letters removed.
// solution("Mississippi") === "Misp"

// function solution(str) {
//     return str.split('').reduce(
//         function (acc, e) {
//             if (acc.indexOf(e) == -1) acc += e

//             return acc
//         }
//     , '')
// }
// console.log(solution('Mississippi'));

// function solution_2(str) {
//     return str.split('').reduce((acc, e) => acc.indexOf(e) == -1 ? acc + e : acc, '')
// }

// function solution_3(str) {
//     return str.split('').reduce((acc, e) => acc += acc.indexOf(e) == -1 ? e : '', '')
// }

// console.log(solution_2('Mississippi'));
// console.log(solution_3('Mississippi'));


// 2. Write a function that accepts a string, and returns how many times a specific character appears, taking case into account.
// solution("Mississippi", "i") == 4

function solution(str1, str2) {
    return str1.split('').reduce(
        function (acc, i) {
            if (i === str2) acc++

            return acc
        }
    , 0)
}

console.log(solution('Mississippi', 'i'));

function solution_2(str1, str2) {
    return str1.split('').reduce((acc, e) => acc += e === str2 ? 1 : 0, 0)
}

console.log(solution_2('Mississippi', 'i'));

function solution_3(str1, str2) {
    return str1.split('').reduce((acc, e) => e === str2 ? acc + e : acc, '').length
}

console.log(solution_3('Mississippi', 'i'));