import originJSONP from 'jsonp'

/**
 * 将jsonp默认回调形式封装为promise形式
 *
 * @export
 * @param {any} url 请求地址
 * @param {any} data 请求参数
 * @param {any} options 选项
 * @returns
 */
export default function jsonp(url, data, options) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  return new Promise((resolve, reject) => {
    originJSONP(url, options, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

/**
 * 将请求参数单独抽离出来
 *
 * @param {any} data
 * @returns
 */
function param(data) {
  let url = ''
  for (let k in data) {
    // 防止将 undefined传入后台
    let value = data[k] !== undefined ? data[k] : ''
    url += `&${k}=${encodeURIComponent(value)}`
  }
  return url ? url.substring(1) : ''
}
