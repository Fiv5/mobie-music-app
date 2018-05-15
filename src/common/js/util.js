export const shuffle = arr => {
  let len = arr.length
  let rand
  while (len-- > 1) {
    rand = ~~(Math.random() * len)
    ;[arr[len], arr[rand]] = [arr[rand], arr[len]]
  }
  return arr
}
