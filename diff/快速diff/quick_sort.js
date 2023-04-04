function quickSort(data, left, right) {
  if (left < right) {
    // 找到某一个已经插入到正确位置的值的index
    mid = position(data, left, right)
    quickSort(data, left, mid - 1)
    quickSort(data, mid+1, right )
  }
}

function position(list, left, right) {
  let tmp = list[left]
  while (left < right) {
    while (left < right && list[right] >= tmp) {
      --right
    }
    list[left] = list[right]
    while (left < right && list[left] <= tmp ) {
      ++left
    }
    list[right] = list[left]
  }
  list[left] = tmp
  return left
}

const data = [2,3,5,1,4,1,3,54,646,7]
quickSort(data,0,data.length-1)
console.log(data);
