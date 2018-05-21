const axios = require('axios')

const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
const disstid = 3281874488
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
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    disstid,
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    platform: 'yqq',
    needNewCode: 0
  }
)

axios
  .get(url, {
    headers: {
      referer: `https://y.qq.com/n/yqq/playlist/${disstid}.html`
    },
    params: data
  })
  .then(res => console.log(res.data))
