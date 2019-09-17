/*
    Write a function that accepts two String parameters, and returns true if they contain the same characters in any order taking into account letter case.

    solution("abca"    === "abca")  == true
    solution("abc"     === "cba")   == true
    solution(" a1 b2 " === "b1 a2") == true
    solution("abc"     === "abca")  == true
    solution("abc"     === "Abc")   == false
    solution("abc"     === "cbAa")  == false
*/

// naive
function solution(str1, str2) {
    let checkString = str2

    for (let letter of str1) {
        if (checkString.indexOf(letter) != -1) {
            checkString = checkString.split(letter).join('')
        }
    }

    return checkString.length == 0
}

console.assert(solution("abca"   , "abca")  == true, `Solution failed!1`);
console.assert(solution("abc"    , "cba")   == true, `Solution failed!2`);
console.assert(solution(" a1 b2 ", "b1 a2") == true, `Solution failed!3`);
console.assert(solution("abc"    , "abca")  == true, `Solution failed!4`);
console.assert(solution("abc"    , "cbAa")  == false, `Solution failed!5`);
console.assert(solution("abc"    , "Abc")   == false, `Solution failed!6`);

function solution_2(str1, str2) {
    let arr1 = [... new Set(str1)].sort()
    let arr2 = [... new Set(str2)].sort()

    return JSON.stringify(arr1) == JSON.stringify(arr2)
}

console.assert(solution_2("abca"   , "abca")  == true, `Solution failed!1`);
console.assert(solution_2("abc"    , "cba")   == true, `Solution failed!2`);
console.assert(solution_2(" a1 b2 ", "b1 a2") == true, `Solution failed!3`);
console.assert(solution_2("abc"    , "abca")  == true, `Solution failed!4`);
console.assert(solution_2("abc"    , "cbAa")  == false, `Solution failed!5`);
console.assert(solution_2("abc"    , "Abc")   == false, `Solution failed!6`);

const Bigstr =  require('./bigString')
const bigStr = new Bigstr()
const str1   = bigStr.getText()
const str2   = bigStr.getPalindrom()

let startTime = new Date().getTime()

solution(str1, str1)
solution(str1, str2)

let finishTime = new Date().getTime()
let performance = (finishTime - startTime) / 1000

console.log(`Performance of solution_1 is ${performance} sec`);

startTime = new Date().getTime()

solution(str1, str1)
solution(str1, str2)

finishTime = new Date().getTime()
performance = (finishTime - startTime) / 1000

console.log(`Performance of solution_2 is ${performance} sec`);
