import { getSongUrlVkey, getLyric } from 'api/song'
import { ERR_OK } from 'api/config'
import { Base64 } from 'js-base64'

export default class Song {
  constructor({ id, mid, singer, name, album, duration, image, url }) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }

  getLyric() {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }

    return new Promise((resolve, reject) => {
      getLyric(this.mid).then(res => {
        if (res.retcode === ERR_OK) {
          this.lyric = Base64.decode(res.lyric)
          resolve(this.lyric)
        } else {
          reject('no lyric')
        }
      })
    })
  }
}

export const createSong = musicData => {
  let song = new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `//y.gtimg.cn/music/photo_new/T002R300x300M000${
      musicData.albummid
    }.jpg?max_age=2592000`
  })
  getSongUrl(song, musicData.songmid)
  return song
}

export function getSongUrl(song, mid) {
  getSongUrlVkey(mid).then(res => {
    // debugger
    if (res.code === ERR_OK) {
      if (res.data.items) {
        let item = res.data.items[0]
        song.url = `http://dl.stream.qqmusic.qq.com/${item.filename}?vkey=${
          item.vkey
        }&guid=4300126822&fromtag=66`
      }
    }
  })
}

const filterSinger = singer => {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach(s => {
    ret.push(s.name)
  })
  return ret.join('/')
}
