/*
    Write a function that accepts a String as its only parameter, and returns true if the string reads the same when reversed, ignoring case.

    solution("rotator") === true
    solution("Rats live on no evil star") === true
    solution("Never odd or even") === false
    solution("Hello, world") === false
*/

// reverse

function solution(str) {
    let lowercased = str.toLowerCase()

    return lowercased === lowercased.split("").reverse().join('')
}

console.assert(solution("rotator")                   === true, `Solution failed!_1`);
console.assert(solution("Rats live on no evil star") === true, `Solution failed!_2`);
console.assert(solution("Never odd or even")         === false, `Solution failed!_3`);
console.assert(solution("Hello, world")              === false, `Solution failed!_4`);

// loop

function solution2(str) {
    let lowercased = str.toLowerCase()
    let reversed   = ''
    
    for (let key in lowercased) reversed = lowercased[key] + reversed
    
    return lowercased === reversed
}

console.assert(solution2("rotator")                   === true, `Solution failed!_1`);
console.assert(solution2("Rats live on no evil star") === true, `Solution failed!_2`);
console.assert(solution2("Never odd or even")         === false, `Solution failed!_3`);
console.assert(solution2("Hello, world")              === false, `Solution failed!_4`);

// provides the earlist exit
function solution3(str) {
    let lowercased = str.toLowerCase()
    let strMid = Math.ceil(str.length / 2)

    for (let i = 0; i <= strMid; i++) {
        if (lowercased[i] != lowercased[lowercased.length - i - 1]) return false
    }

    return true
}


const Bigstring = require('./bigString')
const bigString = new Bigstring()
let text = bigString.getText()
let palindrom = bigString.getPalindrom()

let startTime = new Date().getTime();

solution(text);
solution("rotator");
solution("Rats live on no evil star");
solution(palindrom);

let finishTime = new Date().getTime();
let performance = (finishTime - startTime) / 1000

console.log(`Performance of solution() is: `, performance + " sec");

// test isPalindrome2()
startTime = new Date().getTime();

solution2(text);
solution2("rotator");
solution2("Rats live on no evil star");
solution2(palindrom);

finishTime = new Date().getTime();
performance = (finishTime - startTime) / 1000

console.log(`Performance of solution2() is: `, performance + " sec");

// test isPalindrome3()
startTime = new Date().getTime();

solution3(text);
solution3("rotator");
solution3("Rats live on no evil star");
solution3(palindrom);

finishTime = new Date().getTime();
performance = (finishTime - startTime) / 1000

console.log(`Performance of solution3() is: `, performance + " sec");