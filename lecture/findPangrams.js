/*
    Write a function that returns true if it is given a string that is an English pangram, ignoring letter case.

    Tip: A pangram is a string that contains every letter of the alphabet at least once.

    solution("The quick brown fox jumps over the lazy dog")  === true
    solution("The quick brown fox jumped over the lazy dog") === false
*/

// loop
function solution_1(str) {
    let alphabet = 'abcdefghijklmnopqrstuvwxyz'
    let lowerStr = str.toLowerCase()

    for (let letter of lowerStr) {
        if (alphabet.length == 0) return true
        if (alphabet.indexOf(letter) != -1) alphabet = alphabet.split(letter).join('')
    }

    return alphabet == ''
}

// reduce
function solution_2(str) {
    let lowerArr = str.toLowerCase().split('')

    return lowerArr.reduce(
        function (acc, e) {
            return acc.indexOf(e) != -1 ? acc.split(e).join('') : acc 
        }, 'abcdefghijklmnopqrstuvwxyz'
    ) == ''
}

// reduce short
function solution_3(str) {
    return str.toLowerCase().split('').reduce((acc, e) => acc.indexOf(e) != -1 ? acc.split(e).join('') : acc, 'abcdefghijklmnopqrstuvwxyz') == ''
}

// filter + Set
function solution_4(str) {
    let lowerArr = [... new Set(str.toLowerCase())]

    let letters = lowerArr.filter(
        function (letter) {
            return (letter >= 'a' && letter <= 'z')
        }
    )

    return letters.length == 26
}

console.assert(solution_4("The quick brown fox jumps over the lazy dog")  === true, 'ERROR')
console.assert(solution_4("The quick brown fox jumped over the lazy dog") === false, 'ERROR')

// filter + Set short
function solution_5(str) {
    return [... new Set(str.toLowerCase())].filter(l => (l >= 'a' && l <= 'z')).length == 26
}

// RegExp
let solution_6 = (str) => new Set(str.toLowerCase().match(/[a-z]/g)).size === 26




/*
************************* PERFORMANCE TESTS *************************
*/
/**
Performance of solution1() is 0.022 sec
Performance of solution2() is 0.047 sec
Performance of solution3() is 0.038 sec
Performance of solution4() is 0.056 sec
Performance of solution5() is 0.042 sec
Performance of solution6() is 0.084 sec
 */