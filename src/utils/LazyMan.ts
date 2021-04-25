export default class LazyMan {
    public taskQueue: any[]
    public timer: any
    constructor (name: string) {
        this.taskQueue = []
        this.timer = null
        this.sayHi(name)
    }
    run () {
        if (this.timer) clearTimeout(this.timer)
        this.timer = setTimeout(async () => {
            for (const taskFun of [...this.taskQueue]) {
                await taskFun();
            }
            this.taskQueue = []
            this.timer = null
        })
        return this
    }
    sayHi (name: string) {
        this.taskQueue.push(() =>{
            console.log(`Hi! My name is ${name}`)
        })
        return this.run()
    }
    sleep (second: number) {
        this.taskQueue.push(() =>{
            console.log(`Wake up after ${second} second!`)
            return this.setTimer(second)
        })
        return this.run()
    }
    sleepFirst (second: number) {
        this.taskQueue.unshift( async () => {
            console.log(`Wake up after ${second}!`)
            return this.setTimer(second)
        })
        return this.run()
    }
    eat (food: string) {
        this.taskQueue.push(() => {
            console.log(`Eat ${food}`)
        })
        return this.run()
    }
    async setTimer (second: number) {
        await new Promise(resolve => {
            setTimeout(resolve, second * 1000);
        })
    }
}

// 深拷贝
function deepClone (obj: any) {
    if (typeof obj !== "object") {
        return obj
    }
    const cloneObj: any = Array.isArray(obj) ? [] : {}
    if (Array.isArray(obj) && Array.isArray(cloneObj)) {
        for (let i = 0; i < obj.length; i++) {
            cloneObj.push(deepClone(obj[i]))
        }
    } else {
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                cloneObj[key] = obj[key]    
            }
        }
    }
    return cloneObj
}

function deepCloneCopy (obj: any) {
    const result: any = Array.isArray(obj) ? [] : {}
    if (obj && typeof obj === "object") {
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                if (obj[key] && typeof obj[key] === "object") {
                    result[key] = deepCloneCopy(obj[key])
                } else {
                    result[key] = obj[key]
                }
            }
        }
        return result
    } else {
        return obj
    }
}
const arr = [
    {
        a: 1,
        b: 2,
        c: {
            aa: 1,
            bb: 2
        }
    },
    2,
    {
        n: 24
    }
]
const b = deepCloneCopy(arr)
// console.log("b", b)
// b[0] = 1
// console.log("b", b)
// console.log("arr", arr)

const arr2 = [
    {
        id: 1,
        children: [
            {
                id: 11,
                children: [
                    {
                        id: 111,
                        children: null
                    }
                ]
            },
            {
                id: 123,
                children: null
            }
        ]
    },
    {
        id: 2,
        children: [
            {
                id: 22,
                children: [
                    {
                        id: 222,
                        children: [
                            {
                                id: 2222,
                                children: null
                            }
                        ]
                    }
                ]
            }
        ]
    }
]

function getIdArrFromArr (arr: Array<any>): Array<any> {
    if (arr.length < 1) return []
    let result = []
    for (let i = 0; i < arr.length; i++) {
        result.push(arr[i].id) // 先把第一个id push 到数组中
        if (arr[i].children) { // 判断children是否为null
            result = result.concat(getIdArrFromArr(arr[i].children)) // 递归
        }
    }
    return result
}
// function getIdArrFromArr2 (arr: Array<any>): Array<any> {
//     if (arr.length < 1) return []
//     let result = []
//     for (let i = 0; i < arr.length; i++) {
//         result.push(arr[i].id) // 先把第一个id push 到数组中
//     }
//     return result
// }

const idArr = getIdArrFromArr(arr2)
// console.log(idArr)

// 冒泡排序

let temp = 0
const arrSort: Array<number> = [1, 2, 1, 44, 55, 34, 6, 7, 90]
function bubbleSort (arr: Array<number>, way?: number) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (way === 0) { // 降序
                if (arr[j] < arr[j+1]) {
                    temp = arr[j]
                    arr[j] = arr[j+1]
                    arr[j+1] = temp
                }
            } else { // 默认是升序
                if (arr[j] > arr[j+1]) {
                    temp = arr[j]
                    arr[j] = arr[j+1]
                    arr[j+1] = temp
                }
            }
        }
    }
}
// bubbleSort(arrSort, 0)
// console.log(arrSort)

function quickSort (arr: Array<number>, sortWay?: number): Array<number> {
    if (arr.length <= 1) return arr
    const mIndex = Math.floor(arr.length / 2) // 中间索引
    const mValue = arr.splice(mIndex, 1)[0] // 中间值, 并把中间值从中抽离出来
    const left: Array<number> = []
    const right: Array<number> = []
    for (let i = 0; i < arr.length; i++) {
        if (sortWay === 0) {
            if (arr[i] > mValue) {
                left.push(arr[i])
            } else {
                right.push(arr[i])
            }
        } else {
            if (arr[i] < mValue) {
                left.push(arr[i])
            } else {
                right.push(arr[i])
            }
        }
        
    }
    return quickSort(left).concat([mValue], quickSort(right))
}
// console.log(quickSort(arrSort))


// 不可变数组求和
// 定义不可变数组类
const Immutable = (Sup: any) => class extends Sup {
    constructor (...args: any[]) {
        super(...args)
        Object.freeze(this)
    }
}

// 将累加方法写进一个类当中，继承不可变数组类

class NumArray extends Immutable(Array) {
    sumRange (i: number, j: number) {
        let sum = 0
        for (; i <= j; i ++) {
            sum += this[i]
        }
        return sum
    }
}

const nums = new NumArray(1, 2, 2, 0, 9, 7, -1)
console.log(nums.sumRange(2, 5))