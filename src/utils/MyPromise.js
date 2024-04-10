const PENDING = "pending";
const FULLFILLED = "fullfilled";
const REJECTED = "rejected";

class MyNewPromise {
  STATE = PENDING;
  RESULT = null;
  CALLBACKHANDLER = [];
  constructor(excator) {
    const resolve = (data) => {
      this.changeState(FULLFILLED, data);
    };
    const reject = (err) => {
      this.changeState(REJECTED, err);
    };
    excator(resolve, reject);
  }

  changeState(state, result) {
    if (this.STATE !== PENDING) return; // 状态发生改变就无法再继续改了
    this.STATE = state;
    this.RESULT = result;
    // console.log("promise 状态改变了", this.STATE, this.RESULT);
    this.handleCallBack(); // 状态发生改变，触发回调
  }

  then(OnFullFilled, OnRejected) {
    // then方法返回一个promise
    return new MyNewPromise((resolve, reject) => {
      // 为了链式调用，这里要将这些回调函数收集起来 (什么时候调用呢？)
      this.CALLBACKHANDLER.push({
        OnFullFilled,
        OnRejected,
        resolve,
        reject,
      });
      // 在promise对象的状态发生改变之后，再去调用这些回调函数。这里要做成一个独立的函数去处理这些事情
      this.handleCallBack();
    });
  }

  catch(OnRejected) { // 返回then方法
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

  static resolve(value) {
    if (value instanceof MyNewPromise) return value
    let _resolve, _reject
    const p = new MyNewPromise((resolve, reject) => {
      _resolve = resolve
      _reject = reject
    })
    if (p.isPromiseLike(value)) {
      value.then(_resolve, _reject)
    } else {
      _resolve(value)
    }
    return p
  }

  static reject(value) {
    return new MyNewPromise((_, reject) => {
      reject(value)
    })
  }

  handleCallBack() {
    // 如果是在pending状态就返回
    if (this.STATE === PENDING) return;
    // 执行then方法收集的回调函数
    while (this.CALLBACKHANDLER.length) {
      const callbackItem = this.CALLBACKHANDLER.shift();
      const { OnFullFilled, OnRejected, resolve, reject } = callbackItem;
      // 判断当前promise的状态，是执行OnFullFilled还是OnRejected
      // if (this.STATE === FULLFILLED) {
      //     // 这里还要再判断一下，then收集的是不是函数（校验外部传进来的数据类型）
      //     if (typeof OnFullFilled === 'function') {
      //         // 执行，这里要用try catch（resolve 还是 reject）
      //         try {
      //             const data = OnFullFilled(this.RESULT)
      //             resolve(data)
      //         } catch (error) {
      //             reject(error)
      //         }
      //     } else {
      //         resolve(this.RESULT)
      //     }
      // } else if (this.STATE === REJECTED) {
      //     if (typeof OnRejected === 'function') {
      //         OnRejected(this.RESULT)
      //     } else {
      //         reject(this.RESULT)
      //     }
      // }
      if (this.STATE === FULLFILLED) {
        this.handleSingalCallBack(OnFullFilled, resolve, reject);
      } else if (this.STATE === REJECTED) {
        this.handleSingalCallBack(OnRejected, resolve, reject);
      }
    }
  }
  isPromiseLike(value) {
    if (value !== null && (typeof value === 'object' || typeof value === 'function')) {
      return typeof value.then === 'function'
    }
    return false
  }
  // TODO: 任务队列的实现
  microTaskQueue(func) {
    // 区分node环境和浏览器环境
    if (typeof process === 'object' && typeof process.nextTick === 'function') { // node
      return process.nextTick(func)
    } else if (typeof MutationObserver === 'function') { // 浏览器
      const ob = new MutationObserver(func)
      const textNode = document.createTextNode('1')
      ob.observe(textNode, {
        characterData: true
      })
      textNode.value = '2'
    } else {
      setTimeout(fn, 0);
    }
  }

  handleSingalCallBack(callBack, resolve, reject) {
    this.microTaskQueue(() => {
      // 这里还要再判断一下，then收集的是不是函数（校验外部传进来的数据类型）
      if (typeof callBack !== "function") {
        console.log(this)
        const handler = this.STATE === FULLFILLED ? resolve : reject;
        handler(this.RESULT);
        return
      }
      //  TODO:这里要考虑then方法传进来的函数返回的是不是一个promise
      try {
        const data = callBack(this.RESULT);
        if (this.isPromiseLike(data)) {
          data.then(resolve, reject)
        } else {
          resolve(data);
        }
      } catch (error) {
        reject(error);
      }
    })
  }
}

const p1 = new Promise((resolve) => {
  resolve(1)
})
console.log(MyNewPromise.resolve(p1) === p1)
MyNewPromise.reject('12312312').catch((err) => {
  console.log(err)
})

// const p1 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(1123);
//   }, 1000);
// });
// p1.then(123, (err) => {
//     console.log('Promise shibai', err)
// }).then((res) => {
//     console.log('Promise chenggonng1', res)
// }, (err) => {
//     console.log('Promise shibai1', err)
// })

// const p2 = new MyNewPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(1123);
//   }, 1000);
// });
// p2.then(123, (err) => {
//     console.log('MyNewPromise shibai', err)
// }).then((res) => {
//     console.log('MyNewPromise chenggonng1', res)
// }, (err) => {
//     console.log('MyNewPromise shibai1', err)
// })