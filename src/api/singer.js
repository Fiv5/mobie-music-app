import jsonp from 'src/common/js/jsonp'
import { commonParams, options } from './config'

export const getSingerList = () => {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'

  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    histUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    g_tk: 1591850326
  })

  return jsonp(url, data, options)
}
