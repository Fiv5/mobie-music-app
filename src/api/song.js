import axios from 'axios'
import { commonParams } from 'api/config'
const request = axios.create({
  withCredentials: true
})

// 获取歌曲url路径参数vkey
export const getSongUrlVkey = songMid => {
  const url = '/api/getSongUrl'
  const data = Object.assign({}, commonParams, {
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0,
    cid: 205361747,
    uin: 0,
    songmid: songMid,
    filename: `C400${songMid}.m4a`,
    guid: 4300126822
  })
  return request
    .get(url, {
      params: data
    })
    .then(res => {
      return Promise.resolve(res.data)
    })
}

// 获取歌词
export const getLyric = mid => {
  const url = '/api/lyric'
  const data = Object.assign({}, commonParams, {
    songmid: mid,
    pcachetime: Date.now(),
    platform: 'yqq',
    hostUin: 0,
    format: 'json',
    needNewCode: 0,
    g_tk: 5381
  })

  return axios
    .get(url, {
      params: data
    })
    .then(res => Promise.resolve(res.data))
}
