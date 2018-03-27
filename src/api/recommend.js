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

export const getDiscList = () => {
  // const url = 'http://ustbhuangyi.com/music/api/getCdInfo'
  const url = '/api/getDiscList'

  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    g_tk: 1928093487,
    disstid: 3701583902,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    type: 1,
    json: 1,
    utf8: 1,
    format: 'json',
    onlysong: 0,
    rnd: Math.random()
  })
  // console.log(data)
  return axios
    .get(url, {
      params: data
    })
    .then(res => Promise.resolve(res.data))
  // return jsonp(url, data, options)
}
// export const getDiscList = () => {
//   const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
//   const data = Object.assign({}, commonParams, {
//     picmid: 1,
//     g_tk: 1591850326,
//     platform: 'yqq',
//     hostUin: 0,
//     sin: 0,
//     ein: 29,
//     sortId: 5,
//     needNewCode: 0,
//     categoryId: 10000000,
//     // jsonpCallback: 'getPlaylist',
//     rnd: Math.random()
//   })
//   return jsonp(url, data, options)
// }
