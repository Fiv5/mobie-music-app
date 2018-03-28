import jsonp from 'src/common/js/jsonp'
import { commonParams, options } from './config'
import axios from 'axios'

export const getRecommend = () => {
  const url =
    'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })

  return jsonp(url, data, options)
}

// QQ音乐 --- 歌单列表
export const getDiscList = () => {
  const url = '/api/getDiscList'
  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    g_tk: 1591850326,
    loginUin: 362459825,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    sin: 0,
    ein: 29,
    utf8: 1,
    format: 'json',
    onlysong: 0,
    rnd: Math.random()
  })
  return axios
    .get(url, {
      params: data
    })
    .then(res => Promise.resolve(res.data))
    .catch(e => console.log(e))
}

// 黄轶API
// export const getDiscList = () => {
//   // const url = 'http://ustbhuangyi.com/music/api/getCdInfo'
//   const url = '/api/getDiscList'

//   const data = Object.assign({}, commonParams, {
//     platform: 'yqq',
//     hostUin: 0,
//     g_tk: 1928093487,
//     disstid: 3701583902,
//     sortId: 5,
//     needNewCode: 0,
//     categoryId: 10000000,
//     type: 1,
//     json: 1,
//     utf8: 1,
//     format: 'json',
//     onlysong: 0,
//     rnd: Math.random()
//   })
//   // console.log(data)
//   return axios
//     .get(url, {
//       params: data
//     })
//     .then(res => Promise.resolve(res.data))
//   // return jsonp(url, data, options)
// }

// QQ音乐API ----  歌单类别
// export const getDiscList = () => {
//   const url = '/api/getDiscList'
//   const data = Object.assign({}, commonParams, {
//     picmid: 1,
//     g_tk: 1591850326,
//     loginUin: 362459825,
//     format: 'json',
//     platform: 'yqq',
//     hostUin: 0,
//     needNewCode: 0,
//     categoryId: 10000000,
//     rnd: Math.random()
//   })
//   return axios
//     .get(url, {
//       params: data
//     })
//     .then(res => Promise.resolve(res.data))
//     .catch(e => console.log(e))
// }
