const PENDING = 'pending'
const FULLFILLED = 'fullfilled'
const REJECTED = 'rejected'
class NewPromise {
    
    constructor(excator) {
        this.promiseState = PENDING
        this.RESULT = null
        this.CallbackHandler = []
        const resolve = (data) => {
            this.handleChageState(FULLFILLED, data)
        }
        const reject = (reason) => {
            this.handleChageState(REJECTED, reason)
        }
        try {
            excator(resolve, reject)   
        } catch (error) {
            reject(error)
        }
    }

    handleChageState (state, result) {
        if (this.promiseState !== PENDING) return
        this.promiseState = state
        this.RESULT = result
        console.log(this.promiseState, this.RESULT)
        this.run()
    }

    run() {
        if (this.promiseState === PENDING) return
        this.CallbackHandler.length && this.CallbackHandler.forEach(callbackItem => {
            const { OnFullfilled, OnRejected, resolve, reject } = callbackItem
            if (this.promiseState === FULLFILLED) {
                if (typeof OnFullfilled === 'function') {
                    try {
                       const data = OnFullfilled(this.RESULT)
                       resolve(data)
                    } catch (error) {
                        reject(error)
                    }
                } else {
                    resolve(this.result)
                }
            } else if (this.promiseState === REJECTED) {
                if (typeof OnFullfilled === 'function') {
                    OnRejected(this.RESULT)
                }
            }
        })
    }
    then(OnFullfilled, OnRejected) {
        return new NewPromise((resolve, reject) => {
            this.CallbackHandler.push({
                OnFullfilled,
                OnRejected,
                resolve,
                reject
            })
            this.run()
        })

    }
    catch() {

    }
}

const p = new NewPromise((resolve, reject) =>{
    // resolve(123)

    setTimeout(() => {
        resolve(123)
    }, 2000)
})
p.then((res) => {
    console.log(res)
}, (err) => {
    console.log(err)
})

p.then((res) => {
    console.log(res)
})