// 冒泡排序
export function* bubble(arr) {
  let i = arr.length;
  let tempExchangVal;
  while (i > 0) {
    for (let j = 0; j < i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        tempExchangVal = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tempExchangVal;
        yield arr;
      }
    }
    i--;
  }
  return true;
}
// 选择排序
export function* choose(arr) {
  let len = arr.length;
  let min = null;
  let tmp = null;
  //选择排序
  for (let j = 0; j < len - 1; j++) {
    min = j;
    for (let i = j + 1; i < len; i++) {
      if (arr[i] < arr[min]) {
        min = i;
      }
    }
    tmp = arr[j];
    arr[j] = arr[min];
    arr[min] = tmp;
    yield arr;
  }
}
