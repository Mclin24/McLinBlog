// //  事件循环Event loop

// async function asyncFunFirst() {
//     console.log(1)
//     await asyncFunSecond()
//     console.log(2)
// }

// async function asyncFunSecond() {
//     console.log(3)
// }
// console.log(4)
// asyncFunFirst()
// setTimeout(() => {
//     console.log(5)
// }, 0)

// new Promise(function(resolve) {
//     console.log(6)
//     resolve(7)
// }).then(res => {
//     console.log(res)
// })
// console.log(8)

// // 数组扁平化，然后去重以及排序
// const arr = [[2, 3, 4], 2, 5, [23, 23, [4, 5]], [2, 23]]
// const result = Array.from(new Set(arr.flat(Infinity))).sort((a, b) => {
//     return a - b
// })
// console.log(result)