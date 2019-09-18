/*
    Write your own version of includes() method on String that ignores letter case, and without using existing includes() method.

    solution("Hello, world", "Hello")   == true
    solution("Hello, world", "WORLD")   == true
    solution("Hello, world", "Goodbye") == false
*/

// loop
function solution_1(str1, str2) {
    if (str2.length > str1.length) return false

    let lowStr1 = str1.toLowerCase()
    let lowStr2 = str2.toLowerCase()
    let firstIndex = lowStr1.indexOf(lowStr2[0])

    if (firstIndex == -1) return false

    let contains = false

    for (let i = firstIndex; i <= (str1.length - str2.length); i++) {
        if (lowStr1[i] === lowStr2[0]) {
            contains = true

            for (let j in lowStr2) {
                let ij = Number(i) + Number(j)

                if ((lowStr1[ij] != lowStr2[j]) && (ij < lowStr1.length)) {
                    contains = false
                    break
                }
            }
        }
    }

    return contains
}

console.assert(solution_1("Hello, world", "Hello")   == true, `Solution failed`);
console.assert(solution_1("Hello, world", "WORLD")   == true, `Solution failed`);
console.assert(solution_1("Hello, world", "Goodbye") == false, `Solution failed`);

// cheat (use similar to includes() method)
function solution_2(str1, str2) {
    if (str1.length < str2.length) return false
    
    let lowStr1 = str1.toLowerCase()
    let lowStr2 = str2.toLowerCase()
    
    return lowStr1.indexOf(lowStr2) !== -1
}

console.assert(solution_2("Hello, world", "Hello")   == true, `Solution failed`);
console.assert(solution_2("Hello, world", "WORLD")   == true, `Solution failed`);
console.assert(solution_2("Hello, world", "Goodbye") == false, `Solution failed`);

// elegant
function solution_3(str1, str2) {
    if (str1.length < str2.length) return false
    
    let lowStr1 = str1.toLowerCase()
    let lowStr2 = str2.toLowerCase()
    
    return lowStr1.length != lowStr1.replace(lowStr2, '').length
}


console.assert(solution_3("Hello, world", "Hello")   == true, `Solution failed`);
console.assert(solution_3("Hello, world", "WORLD")   == true, `Solution failed`);
console.assert(solution_3("Hello, world", "Goodbye") == false, `Solution failed`);

function solution_4(str1, str2) {
    if (str1.length < str2.length) return false
    
    let regExp = new RegExp(str2, 'i')
    
    return str1.match(regExp) != null
}

console.assert(solution_4("Hello, world", "Hello")   == true, `Solution failed`);
console.assert(solution_4("Hello, world", "WORLD")   == true, `Solution failed`);
console.assert(solution_4("Hello, world", "Goodbye") == false, `Solution failed`);


let BigStr = require("./bigString");
let bigStr = new BigStr();
let text1  = bigStr.getText();
// console.log(`text1 length: `, text1.length);
text1  = text1.substring(0, 340000);
// console.log(`text1 length: `, text1.length);
let text2  = bigStr.getPalindrom();
// console.log(`text2 length: `, text2.length);

// test solution1()
let st = new Date().getTime();
solution_1(text1, text2);
let ft = new Date().getTime();
let performance = (ft - st) / 1000;

console.log(`Performance of solution1() is: `, performance + " sec");

// test solution2()
st = new Date().getTime();
solution_2(text1, text2);
ft = new Date().getTime();
performance = (ft - st) / 1000;

console.log(`Performance of solution2() is: `, performance + " sec");

// test solution3()
st = new Date().getTime();
solution_3(text1, text2);
ft = new Date().getTime();
performance = (ft - st) / 1000;

console.log(`Performance of solution3() is: `, performance + " sec");

// test solution4()
st = new Date().getTime();
solution_4(text1, text2);
ft = new Date().getTime();
performance = (ft - st) / 1000;

console.log(`Performance of solution4() is: `, performance + " sec");

/**
 * Performance of solution1() is:  9.147 sec
   Performance of solution2() is:  0.002 sec
   Performance of solution3() is:  0.001 sec
   Performance of solution4() is:  0.008 sec
 */