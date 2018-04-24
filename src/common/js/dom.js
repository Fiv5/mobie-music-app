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

let elementStyle = document.createElement('div').style

let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== void 0) {
      return key
    }
  }

  return false
})()

export const prefixStyle = style => {
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    return style
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}
