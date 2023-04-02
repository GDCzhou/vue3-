function Foo<T extends any>(val: T): T {
  return val
}
const res = Foo('tr')