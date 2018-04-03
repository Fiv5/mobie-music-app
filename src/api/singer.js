import jsonp from 'src/common/js/jsonp'
import axios from 'axios'
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

export const getSingerDetail = id => {
  const url = '/api/getSingerDetail'
  const data = Object.assign({}, commonParams, {
    g_tk: 1591850326,
    histUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'qq',
    needNewCode: 0,
    singermid: id, // 002J4UUk29y8BY
    order: 'listen',
    begin: 0,
    num: 30,
    songstatus: 1
  })

  return axios
    .get(url, {
      params: data
    })
    .then(res => Promise.resolve(res.data))
    .catch(e => console.log(e))
}
