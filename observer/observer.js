let activeEffect

const bucket = new WeakMap()
const data = { text: 'hello world' }
const data1 = {
  ok: true,
  text: 'hello',
}

const handler = {
  get: function (target, key) {
    track(target, key)
    return target[key]
  },
  set: function (target, key, value) {
    target[key] = value
    trigger(target, key)
  },
}


function effect(fn) {
  activeEffect = fn
  fn()
}

function track(target, key) {
  if (!activeEffect) return
  let depsMap = bucket.get(target)
  if (!depsMap) {
    depsMap = new Map()
    bucket.set(target, depsMap)
  }
  let deps = depsMap.get(key)
  if (!deps) {
    deps = new Set()
    depsMap.set(key,deps)
  }
  deps.add(activeEffect)
}

function trigger(target, key) {
  let depsMap = bucket.get(target)
  if (!depsMap) return
  let deps = depsMap.get(key)
  deps && deps.forEach((fn) => fn()) 
}
// effect(() => {
//   document.body.innerText = proxy.text
// })

// setTimeout(() => {
//   proxy.text = '你好，世界！'
// }, 1000)

// effect(() => {
//   console.log('effect run')
//   document.body.innerText = proxy.text
// })

//notExist 不存在但effect却执行了2次
// setTimeout(() => {
//   proxy.notExist = 'hello vue!'
// }, 1000)

// setTimeout(() => {
//   console.log('1');
//   proxy.text = 'nihao'
// }, 2000)
const proxy = new Proxy(data1, handler)

effect(() => {
  console.log('effect run')
  document.body.innerText = proxy.ok ? proxy.text : 'not'
})

proxy.ok = false
proxy.text = 'hello vue3'
