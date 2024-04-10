// 节流
export function rafThrottle(fn: any) {
    let lock = false
    return function (this: any, ...args: any[]) {
        if (lock) return
        lock = true
        window.requestAnimationFrame(() => {
            fn.apply(this, args)
            lock = false
        })
    }
}
// 节流 （多次触发，目标函数在设定的delay延时中只会执行一次）
export function throttle(fn: any, delay: number) {
    let canRun = true
    return function (this: any, ...args: any[]) {
        if (!canRun) return
        canRun = false
        setTimeout(() => {
            fn.apply(this, args)
            canRun = true
        }, delay)
    }
}
// 防抖
export function debounce(fn: any, delay = 200) {
    let timer: any = null
    return function (this: any, ...args: any[]) {
        timer && clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    }
}

// 数组扁平化, 递归的方法
export function flatten(arr: Array<any>): Array<any> {
    let result: Array<any> = []
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            result = result.concat(flatten(arr[i]))
        } else {
            result.push(arr[i])
        }
    }
    return result
}
// reduce方法
export function reduceFlat(arr: Array<any>): Array<any> {
    return arr.reduce((acc: Array<any>, cur) => {
        return acc.concat(Array.isArray(cur) ? reduceFlat(cur) : cur)
    }, [])
}
export function quickSort(arr: Array<number>): Array<number> {
    if (arr.length <= 1) return arr
    // 找到中间下标
    const middleIndex = Math.floor(arr.length / 2)
    // 找到中间值
    const middleValur = arr.splice(middleIndex, 1)[0]
    const leftArr: Array<number> = []
    const rightArr: Array<number> = []
    arr.forEach((item) => {
        if (item < middleValur) {
            leftArr.push(item)
        } else {
            rightArr.push(item)
        }
    })
    return quickSort(leftArr).concat([middleValur], quickSort(rightArr))
}
