export const addClass = (el, className) => {
  if (hasClass(el, className)) {
    return
  }
  el.classList.add(className)
}

export const hasClass = (el, className) => {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

export const getData = (el, name, value) => {
  const prefix = 'data-'
  if (value) {
    return el.setAttribute(prefix + name, value)
  } else {
    return el.getAttribute(prefix + name)
  }
}
