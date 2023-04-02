const data = {
  test: 'test.......',
}

const obj = new Proxy(data, {
  get(target, key) {
    console.log('get: ' + target[key], target, key)
    return target[key]
  },
  set(target, key, value) {
    console.log('set value: ' + value)
    return value
  },
})

document.body.innerText = obj.text

obj.notExist = 'no'
console.log(obj)

const a = new Set([1])
// a.forEach(() => {
//   a.delete(1)
//   a.add(1)
//   console.log('无限循环');
// })

const b = new Set(a)
b.forEach(i=>{
  a.delete(1)
  a.add(1)
  console.log(i);
})