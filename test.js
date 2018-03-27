const axios = require('axios')

const url = 'http://ustbhuangyi.com/music/api/getCdInfo'
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
      host: 'ustbhuangyi.com'
    },
    params: data
  })
  .then(res => console.log(res.data))
