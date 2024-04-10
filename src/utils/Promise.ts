class MyPromise {
    callBacks = [] as any[]
    state = 'pending'
    value = null
    err = null
    constructor(fn: Function) {
        fn(this.resolve.bind(this), this.reject.bind(this))
    }
    resolve(value: any) {
        this.state = 'fullfilled'
        this.value = value
        this.callBacks.forEach((fn) => fn(value))
    }
    then(onFullFilled: Function) {
        // 参数是调用了then方法传递的回调函数
        if (this.state === 'pending') {
            this.callBacks.push(onFullFilled)
        } else {
            onFullFilled(this.value)
        }
        return this
    }
    reject(err: any) {
        this.state = 'rejected'
        this.err = err
        this.callBacks.forEach((fn) => fn(err))
    }
    catch(rejected: Function) {
        if (this.state === 'pending') {
            this.callBacks.push(rejected)
        } else {
            rejected(this.err)
        }
        return this
    }
}
new MyPromise(function (resolve: Function, reject: Function) {
    console.log('my promise')
    resolve('resolve')
    reject(null)
    // setTimeout(() => {
    //     resolve("resolve")
    // }, 2000)
})
    .then((res: any) => {
        console.log(res)
    })
    .catch((err: any) => {
        console.log(err)
    })
