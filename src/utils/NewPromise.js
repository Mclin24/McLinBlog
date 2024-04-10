const PENDING = 'pending'
const FULLFILLED = 'fullfilled'
const REJECTED = 'rejected'

class NewPromise {
    STATE = PENDING
    RESULT = ''
    CALlBACKTASK = []
    constructor(excator) {
        const resolve = (data) => {
            this.handleStateChange(FULLFILLED, data)
        }
        const reject = (error) => {
            this.handleStateChange(REJECTED, error)
        }
        try {
            excator(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }
    handleStateChange(state, result) {
        if (this.STATE !== PENDING) return
        this.STATE = state
        this.RESULT = result
        this.runAllTask()
    }
    isPromiseLike(func) {
        if (typeof func === 'object' || typeof func === 'function') {
            return typeof func.then === 'function'
        }
        return false
    }
    microTaskQueue(func) {
        // 加入到微队列中。1、先判断环境（浏览器，Node）
        if (typeof process === 'object' && typeof process.nextTick === 'function') {
            return process.nextTick(func)
        } else if (typeof MutationObserver === 'function') {
            const ob = new MutationObserver(func)
            const textNode = document.createTextNode('1')
            ob.observe(textNode, {
                characterData: true
            })
            textNode.value = '2'
        } else {
            setTimeout(func, 0)
        }
    }
    runOneTask(task, resolve, reject) {
        this.microTaskQueue(() => {
            // 分情况判断OnFullFilled， OnRejected；1、是否函数 2、是函数，返回值是不是一个promise
            if (typeof task !== 'function') {
                const handler = this.STATE === FULLFILLED ? resolve : reject
                handler(this.RESULT)
                return
            }
            try {
                const data = task(this.RESULT)
                if (this.isPromiseLike(data)) {
                    data.then(resolve, reject)
                } else {
                    resolve(data)
                }
            } catch (error) {
                reject(error)
            }
        })
    }
    runAllTask() { // 执行then收集的回调函数
        if (this.STATE === PENDING) return
        while(this.CALlBACKTASK.length) {
            const { OnFullFilled, OnRejected, resolve, reject } = this.CALlBACKTASK.shift()
            if (this.STATE === FULLFILLED) {
                this.runOneTask(OnFullFilled, resolve, reject)
            } else {
                this.runOneTask(OnRejected, resolve, reject)
            }
        }
    }
    then(OnFullFilled, OnRejected) { // 收集传进来的回调函数，等状态发生改变时执行对应的回调
        return new NewPromise((resolve, reject) => {
            this.CALlBACKTASK.push({
                OnFullFilled,
                OnRejected,
                resolve,
                reject
            })
            this.runAllTask()
        })
    }
    static resolve(data) { // 根据Promise A+ 规范
        if (data instanceof NewPromise) return data
        let _resolve, _reject
        const p = new NewPromise((resolve, reject) => {
            _resolve = resolve
            _reject = reject
        })
        // 判断传进来是不是promise
        if (p.isPromiseLike(data)) {
            data.then(_resolve, _reject)
        } else {
            _resolve(data)
        }
        return p
    }
    static reject(OnRejected) {
        return new NewPromise((_, reject) => {
            reject(OnRejected)
        })
    }
    catch(OnRejected) {
        return this.then(undefined, OnRejected)
    }
    finally(OnFinally) {
        return this.then((data) => {
            OnFinally()
            return data
        }, (err) => {
            OnFinally()
            throw err
        })
    }
}

// const p = new NewPromise((resolve, reject) => {
//     console.log(1)
//     setTimeout(() => {
//         resolve(2)
//     }, 1000)
// })
// console.log(4)
// p.then((res) => {
//     console.log(res)
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             console.log(5)
//             resolve(3)
//         }, 2000)
//     })
// }).then((res) => {
//     console.log(res)
// })
NewPromise.resolve(123).then((res) => {
    console.log(res)
    return '456'
}).finally((res) => {
    console.log(res)
})
Promise.resolve(123).then((res) => {
    console.log(res)
    return '456'
}).finally((res) => {
    console.log(res)
})