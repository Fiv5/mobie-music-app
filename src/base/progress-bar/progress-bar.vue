<template>
  <div class="progress-bar"
       ref="progressBar"
       @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper"
           ref="progressBtn"
           @touchstart.prevent="progressTouchStart"
           @touchmove.prevent="progressTouchMove"
           @touchend="progressTouchEnd">
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { prefixStyle } from 'common/js/dom'

const transform = prefixStyle('transform')
const PROGRESS_BTN_WIDTH = 16
export default {
  props: {
    percent: {
      type: Number,
      default: 0,
    },
  },
  created() {
    this.touch = {}
    // 缓存进度条宽度
    this.barWidth = null
  },
  methods: {
    progressClick(e) {
      const offsetWidth =
        e.offsetX || e.clientX - e.currentTarget.getBoundingClientRect().left
      this._offset(offsetWidth)
      this._triggerPercent()
    },
    progressTouchStart(e) {
      this.touch.initiated = true
      this.touch.startX = e.touches[0].pageX
      this.touch.left = this.$refs.progress.clientWidth
    },
    progressTouchMove(e) {
      if (!this.touch.initiated) {
        return
      }

      const deltaX = e.touches[0].pageX - this.touch.startX
      const offsetWidth = Math.min(
        this.barWidth,
        Math.max(0, this.touch.left + deltaX)
      )
      this._offset(offsetWidth)
    },
    progressTouchEnd(e) {
      this.touch.initiated = false
      this._triggerPercent()
    },
    _triggerPercent() {
      const barWidth = this.barWidth
      const percent = this.$refs.progress.clientWidth / barWidth
      this.$emit('percentChange', percent)
    },
    _offset(offsetWidth) {
      this.$refs.progress.style.width = `${offsetWidth}px`
      this.$refs.progressBtn.style[
        transform
      ] = `translate3d(${offsetWidth}px, 0, 0)`
    },
    _cacheBarWidth() {
      if (!this.barWidth) {
        this.barWidth = this.$refs.progressBar.clientWidth - PROGRESS_BTN_WIDTH
      }
    },
  },
  watch: {
    percent(newVal) {
      if (newVal >= 0 && !this.touch.initiated) {
        this._cacheBarWidth()
        const barWidth = this.barWidth
        const offsetWidth = newVal * barWidth
        this._offset(offsetWidth)
      }
    },
  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.progress-bar {
  height: 30px;

  .bar-inner {
    position: relative;
    top: 13px;
    height: 4px;
    background: rgba(0, 0, 0, 0.3);

    .progress {
      position: absolute;
      height: 100%;
      background: $color-theme;
    }

    .progress-btn-wrapper {
      position: absolute;
      left: -8px;
      top: -13px;
      width: 30px;
      height: 30px;

      .progress-btn {
        position: relative;
        top: 7px;
        left: 7px;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 3px solid $color-text;
        border-radius: 50%;
        background: $color-theme;
      }
    }
  }
}
</style>
