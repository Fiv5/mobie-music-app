const axios = require('axios')

const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg?picmid=1&rnd=0.37914599144445216&g_tk=1591850326&jsonpCallback=getPlaylist&loginUin=362459825&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&categoryId=10000000&sortId=5&sin=0&ein=29'
const data = Object.assign(
  {},
  {
    g_tk: 5381,
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    format: 'jsonp'
  },
  {
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
    onlysong: 0,
    rnd: Math.random()
  }
)
axios
  .get(url, {
    headers: {
      // host: 'https://y.qq.com/portal/playlist.html',
      referer: 'https://y.qq.com/portal/playlist.html',
    },
    // params: data
  })
  .then(res => console.log(res.data))
