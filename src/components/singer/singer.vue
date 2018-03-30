<template>
  <div class="singer"></div>
</template>

<script>
import { getSingerList } from 'src/api/singer'
import { ERR_OK } from 'src/api/config'
export default {
  data() {
    return { singers: [] }
  },
  created() {
    this._getSingerList()
  },
  methods: {
    _getSingerList() {
      getSingerList().then(res => {
        console.log(res)
        if (res.code === ERR_OK) {
          this.singers = res.data.list
          console.log(this.singers)
        }
      })
    },
  },
}
</script>

<style lang="stylus" scoped>
  .singer
    position:fixed
    text-outline 88px
    bottom:0
    width:100%
</style>
