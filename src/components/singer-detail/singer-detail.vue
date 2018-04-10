<template>
<transition name="slide">
  <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  <!-- <div class="singer-detail"></div> -->
</transition>
</template>

<script>
import { mapGetters } from 'vuex'
import { getSingerDetail } from 'src/api/singer'
import { ERR_OK } from 'src/api/config'
import { createSong } from 'common/js/song'
import MusicList from 'src/components/music-list/music-list'
export default {
  data() {
    return {
      songs: null,
    }
  },
  created() {
    const { id } = this.$route.params
    this._getSingerDetail(id)
  },
  components: {
    MusicList,
  },
  computed: {
    title() {
      return this.singer.name
    },
    bgImage() {
      return this.singer.avatar
    },
    ...mapGetters(['singer']),
  },
  methods: {
    _getSingerDetail(id) {
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      getSingerDetail(id).then(res => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.data.list)
          console.log(this.songs)
        }
      })
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach(item => {
        let { musicData } = item
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    },
  },
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable';

.singer-detail {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: $color-background;
}

.slide-enter-active, .slide-leave-active {
  transition: all 0.3s;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
