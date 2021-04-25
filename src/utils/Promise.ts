class MyPromise {
    callBacks = []
    state = "pending"
    value = null
    err = null
    constructor (fn) {
        fn(this.resolve.bind(this), this.reject.bind(this))
    }
    resolve (value) {
        this.state = "fullfilled"
        this.value = value
        this.callBacks.forEach(fn => fn(value))
    }
    then (onFullFilled) { // 参数是调用了then方法传递的回调函数
        if (this.state === "pending") {
            this.callBacks.push(onFullFilled)
        } else {
            onFullFilled(this.value)
        }
        return this
    }
    reject (err) {
        this.state = "rejected"
        this.err = err
        this.callBacks.forEach(fn => fn(err))
    }
    catch (rejected) {
        if (this.state === "pending") {
            this.callBacks.push(rejected)
        } else {
            rejected(this.err)
        }
        return this
    }
}
new MyPromise(function (resolve, reject) {
    console.log("my promise")
    resolve("resolve")
    reject(null)
    // setTimeout(() => {
    //     resolve("resolve")
    // }, 2000)
}).then((res) => {
    console.log(res)
}).catch((err) => {
    console.log(err)
})

const data = {
    a: 1,
    b: 2
}
Object.defineProperties(data, {
    
})