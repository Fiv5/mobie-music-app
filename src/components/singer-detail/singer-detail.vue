<template>
<transition name="slide">
  <div class="singer-detail"></div>
</transition>
</template>

<script>
import { getSingerDetail } from 'src/api/singer'
export default {
  created() {
    const { id } = this.$route.params
    this._getSingerDetail(id)
    console.log(this.$store.state)
  },
  methods: {
    _getSingerDetail(id) {
      getSingerDetail(id).then(res => {
        console.log(res)
      })
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
