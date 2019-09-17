/**
 * Swap two positive variable integers, a and b, without using a temporary variable.
Before running your code a should be 1 and b should be 2; afterwards, b should be 1 and a should be 2.
let a = 1;
let b = 2;
solution
a == 2 == true
b == 1 == true
 */

// 1

let a = 1
let b = 2

a = a + b // 3
b = a - b // 1
a = a - b // 2

console.assert(a == 2 == true, `Solution failed!`);
console.assert(b == 1 == true, `Solution failed!`);

// 2
a = 1
b = 2

a = a ^ b // 3
b = a ^ b // 1
a = a ^ b // 2

// 3
a = 1
b = 2; 

[a, b] = [b, a]

console.assert(a == 2 == true, `Solution failed!`);
console.assert(b == 1 == true, `Solution failed!`);

// 4
a = 1
b = 2

a = b + (b = a, 0)

console.assert(a == 2 == true, `Solution failed!`);
console.assert(b == 1 == true, `Solution failed!`);

// 5
a = 1
b = 2

b = [a, a = b][0]

console.assert(a == 2 == true, `Solution failed!`);
console.assert(b == 1 == true, `Solution failed!`);