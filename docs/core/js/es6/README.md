# ES6特性

**本文只记录笔者在ES6遇到的重点/难点，详见http://es6.ruanyifeng.com**

## let & const

在ES6语法中，let用来声明变量，const声明常量，其中**const只是保证变量指向的那个内存地址所保存的数据不得改动**：

```js
const a = {aa: 11};
a.aa = 22;	// 可以改动
```

其余共性：

* **不存在变量提升**

  ```js
  // var 的情况
  console.log(foo); // 输出undefined
  var foo = 2;
  
  // let 的情况
  console.log(bar); // 报错ReferenceError
  let bar = 2;
  ```

* **暂时性死区**

  即在代码块内，使用let命令声明变量之前该变量都是不可用的。这在语法上，称为`暂时性死区`（temporal dead zone  简称TDZ）。

  ```js
  if (true) {
    // TDZ开始
    tmp = 'abc'; // ReferenceError
    console.log(tmp); // ReferenceError
  
    let tmp; // TDZ结束
    console.log(tmp); // undefined
    tmp = 123;
    console.log(tmp); // 123
  }
  ```

* **块级作用域**

  使用let/const声明的变量/常量具有块级作用域而非函数作用域。



## 语法拓展

* **对象拓展**

  ```js
  /* ***  ① 属性简洁表示： *** */
  // ES6 允许在对象之中直接写变量。此时属性名为变量名, 属性值为变量的值
  function f(x, y) {
    return {x, y};
  }
  // 等同于
  function f(x, y) {
    return {x: x, y: y};
  }
  f(1, 2) // Object {x: 1, y: 2}
  
  /* ***  ② 对象方法简洁表示： *** */
  const o = {
    method() {
      return "Hello!";
    }
  };
  // 等同于
  const o = {
    method: function() {return "Hello!";}
  };
  
  /* ***  ③ 属性名表达式： *** */
  // ES6 允许字面量定义对象时，把表达式放在方括号内作为对象的属性名
  let propKey = 'foo';
  
  let obj = {
    [propKey]: true,
    ['a' + 'bc']: 123
  };
  // 属性名表达式与简洁表示法，不能同时使用，会报错。
  
  /* ***  ④ super关键字： *** */
  // super关键字指向当前对象的原型对象
  const proto = {
    foo: 'hello'
  };
  
  const obj = {
    foo: 'world',
    find() {
      return super.foo;
    }
  };
  
  Object.setPrototypeOf(obj, proto);
  obj.find() // "hello"
  ```

* **函数拓展**

  * **箭头函数**

    ```js
    var sum = (num1, num2) => num1 + num2;
    // 等同于
    var sum = function(num1, num2) {return num1 + num2;};
    
    const square = n => n * n;
    // 等同于
    const square = function(n) {return n * n;};
    
    // 报错
    let getTempItem = id => { id: id, name: "Temp" };
    // 不报错
    let getTempItem = id => ({ id: id, name: "Temp" });
    ```

    ① 函数体内的`this`对象，就是定义时所在的对象，而不是使用时所在的对象。 

    ② 不可当作构造函数，即不可以使用`new`命令，否则会抛出一个错误。 

    ③ 不可用`arguments`对象，该对象在函数体内不存在。可以用 **rest **参数（扩展运算符）代替。 

    ④ 不可用`yield`命令，因此箭头函数不能用作 Generator 函数。 

  * 双冒号运算符

    函数绑定运算符是并排的两个冒号（::），双冒号左边是一个对象，右边是一个函数。该运算符会自动将左边的对象，作为上下文环境（即this对象），绑定到右边的函数上面。

    ```js
    foo::bar(...arguments);
    // 等同于
    bar.apply(foo, arguments);
    ```

* **解构**

  * 数组解构

    见代码：

    ```js
    let [foo, [[bar], baz]] = [1, [[2], 3]];
    // foo: 1, bar: 2, baz: 3
    
    let [ , , third] = ["foo", "bar", "baz"];
    // third: "baz"
    
    let [x, , y] = [1, 2, 3];	
    // x: 1, y: 3
    
    let [head, ...tail] = [1, 2, 3, 4];
    // head: 1, tail: [2, 3, 4]
    ```

    若解构不成功变量将为undefined：

    ```js
    let [x, y, ...z] = ['a'];
    // x: "a", y: undefined, z: []
    ```

    **只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值。**

    ```js
    function* fibs() {
      let a = 0;
      let b = 1;
      while (true) {
        yield a;
        [a, b] = [b, a + b];
      }
    }
    
    let [first, second, third, fourth, fifth, sixth] = fibs();
    // sixth: 5
    ```

  * 对象解构

    数组解构是按次序排列的，而对象解构没有次序，变量必须与属性同名，才能取到正确的值：

    ```js
    let { foo, bar } = { foo: "aaa", bar: "bbb" };
    foo // "aaa"
    bar // "bbb"
    let { bar, foo } = { foo: "aaa", bar: "bbb" };
    foo // "aaa"
    bar // "bbb"
    ```

    由于数组本质是特殊的对象，因此可以对数组进行对象属性的解构。 

    ```js
    let arr = [1, 2, 3];
    let {0 : first, [arr.length - 1] : last} = arr;
    first // 1
    last // 3
    ```

  * 字符串解构及其他

    ```js
    /* 字符串解构 */
    const [a, b, c, d, e] = 'hello';
    // a: "h", b: "e", c: "l", d: "l", e: "o"
    let {length : len} = 'hello';
    // len: 5
    /* 数值解构 */
    let {toString: s} = 123;
    s === Number.prototype.toString // true
    ```

* **默认值

  对象的解构也可以指定默认值。 默认值生效的条件是，对象的属性值严格等于`undefined`。 

  ```js
  var {x = 3} = {x: undefined};
  x // 3
  
  var {x = 3} = {x: null};
  x // null
  ```

  ES6 允许为函数的参数设置默认值，即直接写在参数定义的后面。 

  ```js
  function Point(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  
  const p = new Point();
  p // { x: 0, y: 0 }
  
  /* 通常情况下，定义了默认值的参数，应该是函数的尾参数。因为这样比较容易看出来，到底省略了哪些参数。如果非尾部的参数设置默认值，实际上这个参数是没法省略的。 */
  function f(x, y = 5, z) {
    return [x, y, z];
  }
  f() // [undefined, 5, undefined]
  f(1) // [1, 5, undefined]
  f(1, ,2) // 报错
  f(1, undefined, 2) // [1, 5, 2]
  ```

  **参数默认值不是传值的，而是每次都重新计算默认值表达式的值。也就是说，参数默认值是惰性求值的：**

  ```js
  let x = 99;
  function foo(p = x + 1) {
    console.log(p);
  }
  foo() // 100
  
  x = 100;
  foo() // 101
  ```

  指定了默认值以后，函数的`length`属性，将返回没有指定默认值的参数个数。也就是说，指定了默认值后，`length`属性将失真。 

  ```js
  (function (a) {}).length // 1
  (function (a = 5) {}).length // 0
  (function (a, b, c = 5) {}).length // 2
  ```



## Iterator 与 for ... of 循环

* **Iterator**

  任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。

  Iterator 的作用有三个：① 为各种数据结构提供统一的、简便的访问接口；② 使得数据结构的成员能够按某种次序排列；③  ES6 创造了一种新的遍历命令for...of循环，Iterator 接口主要供for...of消费。

  ```
  Iterator 的遍历过程：
  
  ① 创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。
  ② 第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员。
  ③ 第二次调用指针对象的next方法，指针就指向数据结构的第二个成员。
  ④ 不断调用指针对象的next方法，直到它指向数据结构的结束位置。
  
  每调用一次next方法，都会返回数据结构的当前成员的信息。具体来说是返回一个包含value和done两个属性的对象。其中value属性是当前成员的值，done属性是表示遍历是否结束的布尔值。
  
  ```

  下面是一个模拟next方法返回值的例子：

  ```js
  var it = makeIterator(['a', 'b']);
  
  it.next() // { value: "a", done: false }
  it.next() // { value: "b", done: false }
  it.next() // { value: undefined, done: true }
  
  function makeIterator(array) {
    var nextIndex = 0;
    return {
      next: function() {
        return nextIndex < array.length ?
          {value: array[nextIndex++], done: false} :
          {value: undefined, done: true};
      }
    };
  }
  ```

  ES6 规定，默认的 Iterator 接口部署在数据结构的Symbol.iterator属性，或者说，一个数据结构只要具有Symbol.iterator属性，就可以认为是“可遍历的”（iterable）。Symbol.iterator属性本身是一个函数，就是当前数据结构默认的遍历器生成函数。执行这个函数，就会返回一个遍历器。

  原生具备 Iterator 接口的数据结构如下。

  - Array
  - Map
  - Set
  - String
  - TypedArray
  - 函数的 arguments 对象
  - NodeList 对象

  下面的例子是数组的`Symbol.iterator`属性：

  ```js
  let arr = ['a', 'b', 'c'];
  let iter = arr[Symbol.iterator]();
  
  iter.next() // { value: 'a', done: false }
  iter.next() // { value: 'b', done: false }
  iter.next() // { value: 'c', done: false }
  iter.next() // { value: undefined, done: true }
  ```

  **对数组和 Set 结构进行解构赋值时，会默认调用Symbol.iterator方法。**

  **扩展运算符（...）也会调用默认的 Iterator 接口。**

  **yield*后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口。**

  ```js
  let generator = function* () {
    yield 1;
    yield* [2,3,4];
    yield 5;
  };
  
  var iterator = generator();
  
  iterator.next() // { value: 1, done: false }
  iterator.next() // { value: 2, done: false }
  iterator.next() // { value: 3, done: false }
  iterator.next() // { value: 4, done: false }
  iterator.next() // { value: 5, done: false }
  iterator.next() // { value: undefined, done: true }
  ```

* **for ... of 循环**

  一个对象如果要具备可被for...of循环调用的 Iterator 接口，就必须在Symbol.iterator的属性上部署遍历器生成方法（原型链上的对象具有该方法也可）。 

  ```js
  function Obj(value) {
    this.value = value;
    this.next = null;
  }
  
  Obj.prototype[Symbol.iterator] = function() {
    var iterator = { next: next };
  
    var current = this;
  
    function next() {
      if (current) {
        var value = current.value;
        current = current.next;
        return { done: false, value: value };
      } else {
        return { done: true };
      }
    }
    return iterator;
  }
  
  var one = new Obj(1);
  var two = new Obj(2);
  var three = new Obj(3);
  
  one.next = two;
  two.next = three;
  
  for (var i of one){
    console.log(i); // 1, 2, 3
  }
  ```



## Class关键字

* **语法简介**

  ES6 提供了更接近传统语言的写法，引入了 Class（类）这个概念作为对象的模板。通过class关键字，可以定义类。

  ```js
  class Point {
    constructor() {
      // ...
    }
    toString() {
      // ...
    }
    toValue() {
      // ...
    }
  }
  
  // 等同于
  
  Point.prototype = {
    constructor() {},
    toString() {},
    toValue() {},
  };
  ```

  可以看到里面有一个constructor方法，这就是构造方法，而this关键字则代表实例对象。也就是说，ES5 的构造函数Point，对应 ES6 的Point类的构造方法。构造函数的prototype属性，在 ES6 的“类”上面继续存在。事实上，类的所有方法都定义在类的prototype属性上面。

  **另外，类的内部所有定义的方法，都是不可枚举的（non-enumerable）。**

  ```js
  class Point {
    constructor(x, y) {
      // ...
    }
    toString() {
      // ...
    }
  }
  Object.keys(Point.prototype)
  // []
  Object.getOwnPropertyNames(Point.prototype)
  // ["constructor","toString"]
  ```

  constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加。constructor方法默认返回实例对象（即this），完全可以指定返回另外一个对象。

  ```js
  class Point {}
  // 等同于
  class Point {
    constructor() {}
  }
  ```

  **类必须使用new调用，否则会报错。这是它跟普通构造函数的一个主要区别，后者不用new也可以执行。**实例的属性除非显式定义在其本身（即定义在this对象上），否则都是定义在原型上（即定义在class上）。

  ```js
  //定义类
  class Point {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
    toString() {
      return '(' + this.x + ', ' + this.y + ')';
    }
  }
  
  var point = new Point(2, 3);
  point.toString() // (2, 3)
  
  point.hasOwnProperty('x') // true
  point.hasOwnProperty('y') // true
  point.hasOwnProperty('toString') // false
  point.__proto__.hasOwnProperty('toString') // true
  ```

  与函数一样，类也可以使用表达式的形式定义。下述代码类的名字是MyClass而不是Me，Me只在 Class 的内部代码可用，指代当前类。Me只在 Class 内部有定义。

  ```js
  const MyClass = class Me {
    getClassName() {
      return Me.name;
    }
  };
  
  let inst = new MyClass();
  inst.getClassName() // Me
  Me.name // ReferenceError: Me is not defined
  
  // 如果类的内部没用到的话，可以省略Me，也就是可以写成下面的形式。
  const MyClass = class { /* ... */ };
  ```

* **Getter & Setter**

  与 ES5 一样，在“类”的内部可以使用get和set关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。

  ```js
  class MyClass {
    constructor() {
      // ...
    }
    get prop() {
      return 'getter';
    }
    set prop(value) {
      console.log('setter: '+value);
    }
  }
  
  let inst = new MyClass();
  
  inst.prop = 123;	// setter: 123
  inst.prop;			// 'getter'
  ```

* **静态方法/属性**

  如果在一个方法前，加上static关键字就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。静态属性同理：

  ```js
  class Foo {
    static classMethod() {
      return 'hello';
    }
  }
  
  Foo.classMethod() // 'hello'
  
  var foo = new Foo();
  foo.classMethod()
  // TypeError: foo.classMethod is not a function
  ```

* **特征**

  * 不存在变量提升

    ```js
    new Foo(); // ReferenceError
    class Foo {}
    ```

  * this指向

    类的方法内部如果含有`this`，它默认指向类的实例。但是，必须非常小心，一旦单独使用该方法很可能报错：

    ```js
    class Logger {
      printName(name = 'there') {
        this.print(`Hello ${name}`);
      }
    
      print(text) {
        console.log(text);
      }
    }
    
    const logger = new Logger();
    const { printName } = logger;
    printName(); // TypeError: Cannot read property 'print' of undefined
    ```



## Promise

* **底层实现**

  ```js
  class Promise{
    constructor(executor){
      this.state = 'pending';
      this.value = undefined;
      this.reason = undefined;
      this.onResolvedCallbacks = [];
      this.onRejectedCallbacks = [];
      let resolve = value => {
        if (this.state === 'pending') {
          this.state = 'fulfilled';
          this.value = value;
          this.onResolvedCallbacks.forEach(fn=>fn());
        }
      };
      let reject = reason => {
        if (this.state === 'pending') {
          this.state = 'rejected';
          this.reason = reason;
          this.onRejectedCallbacks.forEach(fn=>fn());
        }
      };
      try{
        executor(resolve, reject);
      } catch (err) {
        reject(err);
      }
    }
    then(onFulfilled,onRejected) {
      onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
      onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err };
      let promise2 = new Promise((resolve, reject) => {
        if (this.state === 'fulfilled') {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        };
        if (this.state === 'rejected') {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        };
        if (this.state === 'pending') {
          this.onResolvedCallbacks.push(() => {
            setTimeout(() => {
              try {
                let x = onFulfilled(this.value);
                resolvePromise(promise2, x, resolve, reject);
              } catch (e) {
                reject(e);
              }
            }, 0);
          });
          this.onRejectedCallbacks.push(() => {
            setTimeout(() => {
              try {
                let x = onRejected(this.reason);
                resolvePromise(promise2, x, resolve, reject);
              } catch (e) {
                reject(e);
              }
            }, 0)
          });
        };
      });
      return promise2;
    }
    catch(fn){
      return this.then(null,fn);
    }
  }
  function resolvePromise(promise2, x, resolve, reject){
    if(x === promise2){
      return reject(new TypeError('Chaining cycle detected for promise'));
    }
    let called;
    if (x != null && (typeof x === 'object' || typeof x === 'function')) {
      try {
        let then = x.then;
        if (typeof then === 'function') { 
          then.call(x, y => {
            if(called)return;
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          }, err => {
            if(called)return;
            called = true;
            reject(err);
          })
        } else {
          resolve(x);
        }
      } catch (e) {
        if(called)return;
        called = true;
        reject(e); 
      }
    } else {
      resolve(x);
    }
  }
  //resolve方法
  Promise.resolve = function(val){
    return new Promise((resolve,reject)=>{
      resolve(val)
    });
  }
  //reject方法
  Promise.reject = function(val){
    return new Promise((resolve,reject)=>{
      reject(val)
    });
  }
  //race方法 
  Promise.race = function(promises){
    return new Promise((resolve,reject)=>{
      for(let i=0;i<promises.length;i++){
        promises[i].then(resolve,reject)
      };
    })
  }
  //all方法(获取所有的promise，都执行then，把结果放到数组，一起返回)
  Promise.all = function(promises){
    let arr = [];
    let i = 0;
    function processData(index,data){
      arr[index] = data;
      i++;
      if(i == promises.length){
        resolve(arr);
      };
    };
    return new Promise((resolve,reject)=>{
      for(let i=0;i<promises.length;i++){
        promises[i].then(data=>{
          processData(i,data);
        },reject);
      };
    });
  }
  ```

  参照 https://yq.aliyun.com/articles/613412



## Generator & Asyc函数

* **Generator**

  Generator 函数是 ES6 提供的一种异步编程解决方案。语法上，首先可以把它理解成，Generator 函数是一个状态机，封装了多个内部状态。执行 Generator 函数会返回一个遍历器对象，也就是说，Generator 函数除了状态机，还是一个遍历器对象生成函数，且返回的遍历器对象可以依次遍历 Generator 函数内部的每一个状态。形式上，Generator 函数是一个普通函数，但是有两个特征。一是，function关键字与函数名之间有一个星号；二是，函数体内部使用yield表达式，定义不同的内部状态。

  下述代码定义了一个 Generator 函数helloWorldGenerator，它内部有两个yield表达式（hello和world），即该函数有三个状态：hello，world 和 return 语句（结束执行）：

  ```js
  function* helloWorldGenerator() {
    yield 'hello';
    yield 'world';
    return 'ending';
  }
  var hw = helloWorldGenerator();
  hw.next()
  // { value: 'hello', done: false }
  hw.next()
  // { value: 'world', done: false }
  hw.next()
  // { value: 'ending', done: true }
  hw.next()
  // { value: undefined, done: true }
  ```

  下一步，必须调用遍历器对象的next方法，使得指针移向下一个状态。也就是说，Generator 函数是分段执行的，yield表达式是暂停执行的标记，而next方法可以恢复执行。

  ```js
  function* gen() {
    yield  123 + 456;
  }
  /* yield表达式后面的表达式，只有当调用next方法、内部指针指向该语句时才会执行，因此等于为 JavaScript 提供了手动的“惰性求值”（Lazy Evaluation）的语法功能。
  上面代码中，yield后面的表达式123 + 456，不会立即求值，只会在next方法将指针移到这一句时，才会求值。*/
  ```

  **yield表达式只能用在 Generator 函数里面，用在其他地方都会报错。**

  ```js
  /* for...of循环可以自动遍历 Generator 函数时生成的Iterator对象 */
  function* foo() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
    return 6;
  }
  for (let v of foo()) {
    console.log(v);
  }
  // 1 2 3 4 5
  /* 并且可以为一个对象的[Symbol.Iterator]属性设置为一个Generator函数 */
  
  /* Generator.prototype.return() */
  function* gen() {
    yield 1;
    yield 2;
    yield 3;
  }
  var g = gen();
  g.next()        // { value: 1, done: false }
  g.return('foo') // { value: "foo", done: true }
  g.next()        // { value: undefined, done: true }
  
  /* **  yield*表达式  ** */
  
  function* foo() {yield 'a';yield 'b';}
  
  function* bar() {yield 'x';yield* foo();yield 'y';}
  // 等同于
  function* bar() {
    yield 'x';
    yield 'a';
    yield 'b';
    yield 'y';
  }
  
  /* 如果被代理的 Generator 函数有return语句，那么就可以向代理它的 Generator 函数返回数据 */
  function* foo() {
    yield 2;
    yield 3;
    return "foo";
  }
  function* bar() {
    yield 1;
    var v = yield* foo();
    console.log("v: " + v);
    yield 4;
  }
  var it = bar();
  
  it.next()
  // {value: 1, done: false}
  it.next()
  // {value: 2, done: false}
  it.next()
  // {value: 3, done: false}
  it.next();
  // "v: foo"
  // {value: 4, done: false}
  it.next()
  // {value: undefined, done: true}
  
  /* Generator 函数总是返回一个遍历器，ES6 规定这个遍历器是 Generator 函数的实例，也继承了 Generator 函数的prototype对象上的方法 */
  /* 但是，如果把g当作普通的构造函数，并不会生效，因为g返回的总是遍历器对象，而不是this对象 */
  function* g() {
    this.a = 11;
  }
  
  let obj = g();
  obj.next();
  obj.a // undefined
  ```

* **Generator与异步应用**

  * 基于Thunk函数的自动执行

    Thunk函数可以通俗理解为函数柯里化，将一个多参数版本的函数变为单参数函数版本即为thunk函数，一个单参数函数，只接受回调函数作为参数。如下是一个thunk函数转换器：

    ```js
    // 传入函数fn将生成fn的thunk函数
    var Thunk = function(fn, context){
        return function(){
            var args = Array.prototype.slice.call(arguments);
            return function(callback){
        		var that = context || this;
                args.push(callback);
                fn.apply(context, args);
            }
        }
    }
    
    var readFileThunk = Thunk(fs.readFile);
    readFileThunk(fileA)(callback);
    // 生产环境的转换器，建议使用 Thunkify 模块。
    ```

    Thunk 函数真正的威力，在于可以自动执行含有**异步任务**的 Generator 函数。下面就是一个基于 Thunk 函数的 Generator 执行器：

    ```js
    function run(fn) {
      var gen = fn();
    
      function next(err, data) {
        var result = gen.next(data);
        if (result.done) return;
        result.value(next);
      }
    
      next();
    }
    
    var gen = function* (){
      var r1 = yield readFileThunk('/etc/fstab');
      console.log(r1.toString());
      var r2 = yield readFileThunk('/etc/shells');
      console.log(r2.toString());
    };
    
    run(g);
    ```

  * 基于Promise对象的异步自动执行

    对于如下基于Promise的任务：

    ```js
    var asyncMethod = function (params){
      return new Promise(function (resolve, reject){
          // ...
          doAsync((data)=>{
          	resolve(data);
          })
      });
    };
    
    var gen = function* (){
      var data1 = yield asyncMethod(params);
      var data2 = yield asyncMethod(params);
        // ...
      var dataN = yield asyncMethod(params);
    };
    ```

    先看手动执行Generator函数获取数据：

    ```js
    var g = gen();
    g.next().value.then(function(data1){
      g.next(data1).value.then(function(data2){
        g.next(data2) // ...
      });
    });
    ```

    那么很容易能实现自动执行：

    ```js
    function runGen(gen){
        var g = gen();
        
        function doNext(data){
            var res = g.next(data);
            if (!res.done) return res.value;
            res.value.then(function(data){
                doNext(data);
            });
        }
        doNext();
    }
    ```

* ## Async 函数

  Async函数是 Generator 函数的语法糖。语法上，其将 Generator 函数的星号（*）替换成async，将yield替换成await，仅此而已。

  ```js
  /*** async函数对 Generator 函数的改进，体现在：***/
  //① 内置执行器：
  Generator 函数的执行必须靠执行器，而async函数自带执行器。也就是说async函数的执行与普通函数一模一样，只要一行。
  //② 更广的适用性：
  co模块约定，yield命令后面只能是 Thunk 函数或 Promise 对象，而async函数的await命令后面，可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时会自动转成立即 resolved 的 Promise 对象）
  //③ 返回值是Promise：
  async函数的返回值是 Promise 对象，这比 Generator 函数的返回值是 Iterator 对象方便多了。你可以用then方法指定下一步的操作。
  
  ```

  例子：

  ```js
  function timeout(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
  
  async function asyncPrint(value, ms) {
    await timeout(ms);
    console.log(value);
  }
  
  asyncPrint('hello world', 50);
  // 50毫秒后将输出Hello World
  ```

  