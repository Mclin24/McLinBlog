// const rafThrottle = (callBack) => {
//     let lock = false
//     return function (this, ...args) {
//         if (lock) return
//         lock = true
//         window.requestAnimationFrame(() => {
//             callBack.apply(this, args)
//             lock = false
//         })
//     }
// }

/**
 * 使用proxy实现函数的链式调用
 */
function add(data) {
    return data + 1
}
const chainProxy = function(value) {
    const handler = {
        get: function(target, property) {
            if (property === 'end') {
                return target.value
            }
            if (typeof window[property] === 'function') {
                target.value = window[property](target.value)
                return proxy
            }
            return target.value
        }
    }
    const proxy = new Proxy({ value }, handler)
    return proxy
}
console.log(chainProxy(1).add.end);

/**
 * @param { ...Function } task 任务列表，每个任务是没有参数且异步的 
 */
function processTask(tasks) {
    let isPause = false
    let result = []
    let i = 0
    return {
        start: () =>{
            return new Promise(async (resolve) => {
                if (isPause) return
                isPause = false
                while (i < tasks.length) {
                    const taskResult = await tasks[i]()
                    result.push(taskResult)
                    i++
                    if (isPause) return
                }
                isPause = true
                resolve(result)
            })
        },
        pause: () => {
            isPause = true
        }
    }
}