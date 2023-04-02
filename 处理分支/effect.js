let activeEffect

const hanlder = {
  get(target, key) {
    track(target, key)
    return target[key]
  },
  set(target, key, newValue) {
    target[key] = newValue
    trigger(target, key)
  },
}

const bucket = new WeakMap()

const track = (target, key) => {
  let depsMap = bucket.get(target)
  if (!depsMap) {
    depsMap = new Map()
    bucket.set(target, depsMap)
  }
  let deps = depsMap.get(key)
  if (!deps) {
    deps = new Set()
    depsMap.set(key, deps)
  }
  deps.add(activeEffect)
  activeEffect.deps.push(deps)
}

const trigger = (target, key) => {
  let depsMap = bucket.get(target)
  if (!depsMap) return
  let effects = depsMap.get(key)
  const effectsToRun = new Set(effects)
  effectsToRun.forEach((fn) => fn())
  // effects && effects.forEach((fn) => fn())
}

const effectStack = []

function effect(fn) {
  const effectFn = () => {
    cleanup(effectFn)
    activeEffect = effectFn
    effectStack.push(effectFn)
    fn()
    effectStack.pop()
    debugger
    activeEffect = effectStack[effectStack.length - 1]
  }
  effectFn.deps = []
  effectFn()
}

function cleanup(effectFn) {
  for (let i = 0; i < effectFn.deps.length; i++) {
    let deps = effectFn.deps[i]
    deps.delete(effectFn)
  }
  effectFn.deps.length = 0
}

// const data = {
//   text: 'hello world',
//   ok: true,
// }

// const obj = new Proxy(data, hanlder)

// effect( () => {
//   console.log('effect run...');
//   document.body.innerText = obj.ok ? obj.text : 'not'
// })

// obj.ok = false

const data = {
  foo: true,
  bar: true,
}
const obj = new Proxy(data, hanlder)
let temp1, temp2

effect(function effectFn1() {
  console.log('effectFn1执行')
  effect(function effectFn2() {
    console.log('effectFn2执行')
    temp2 = obj.bar
  })
  temp1 = obj.foo
})
// obj.foo =false
// obj.bar = false
obj.foo =false
// obj.bar =false
