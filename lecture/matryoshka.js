/* Array A can be nested inside Array B if:

min(array A) > min(array B)

max(array A) < max(array B)

For example, if A = [2, 9] and B = [1, 10], then A can be nested inside B, since:

(min(A) = 2) > (1 = min(B)) 
and
(max(A) = 9) < (10 = max(B))

Create a function that returns true if every single sub-array inside an array can be nested Matroyshka style, and false otherwise.
*/

function solution(arr){
    let result = true
    let sorted = arr.sort((a, b) => b[0] - a[0])

    sorted.reduce((acc, next, i, a) =>{
        if(!(a[i-1][0] > next[0] && a[i - 1][a[i - 1].length - 1] < next[next.length - 1])){
            result = false
        }
    })

    return result
}


// PLEASE USE ARRAY METHODS IN YOUR SOLUTION!
// Examples:

console.log(solution([[2, 2, 7], [3, 4, 5, 6], [4, 5]]))
// // [4, 5] nested inside [3, 4, 5, 6], [3, 4, 5, 6] nested inside [2, 2, 7], etc.
// // Dolls nested from largest to smallest 
console.log(solution([[4, 5], [6, 3], [7, 6, 5, 4, 3, 2], [8, 1]]))
// // Dolls nested from smallest to largest 
console.log(solution([[7, 1], [7, 6, 5, 4, 3, 2], [6, 3], [4, 5]]))
// [7, 2] and [7, 6, 5, 4, 3, 2] share the same max.
// Second doll cannot be nested properly inside first doll 
console.log(solution([[1, 5], [2, 6], [3, 7]]))
// Elements are overlapping, cannot be nested.