<template>
  <scroll class="listview"
          :data="data"
          :probeType="probeType"
          :listenScroll="listenScroll"
          ref="listview"
          @scroll="scroll">
    <ul>
      <li class="list-group" v-for="group of data" :key="group.title" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li v-for="item of group.items"
              :key="item.id"
              class="list-group-item">
            <img class="avatar" v-lazy="item.avatar" alt="">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut"
         @touchstart="onShortcutTouchStart"
         @touchmove.stop.prevent="onShortcutTouchMove">
      <ul>
        <li v-for="(item, index) of shortcutList"
            :key="item"
            :data-index="index"
            class="item"
            :class="{current:currIndex === index}">
          {{item}}
        </li>
      </ul>
    </div>
    <div class="list-fixed" v-show="fixedTitle" ref="fixed">
      <h1 class="fixed-title">{{fixedTitle}}</h1>
    </div>
    <div class="loading-container" v-show="!data.length">
      <loading></loading>
    </div>
  </scroll>
</template>

<script>
import Scroll from 'src/base/scroll/scroll'
import Loading from 'src/base/loading/loading'
import { getData } from 'common/js/dom'

const ANCHOR_HEIGHT = 18
const FIXED_TITLE = 30

export default {
  created() {
    this.touch = {}
    this.probeType = 3
    this.listenScroll = true
    this.listHeight = []
  },
  data() {
    return {
      scrollY: -1,
      currIndex: 0,
      diff: -1,
    }
  },
  props: {
    data: {
      type: Array,
      default: function() {
        return []
      },
    },
  },
  computed: {
    shortcutList() {
      return this.data.map(group => group.title.slice(0, 1))
    },
    fixedTitle() {
      if (this.scrollY > 0) {
        return null
      }
      return this.data[this.currIndex] ? this.data[this.currIndex].title : null
    },
  },
  methods: {
    onShortcutTouchStart(e) {
      let anchorIndex = parseInt(getData(e.target, 'index'), 10)
      let firstTouch = e.touches[0]
      this.touch.y1 = firstTouch.pageY
      this.touch.anchorIndex = anchorIndex
      this._scrollTo(anchorIndex)
    },
    onShortcutTouchMove(e) {
      let firstTouch = e.touches[0]
      this.touch.y2 = firstTouch.pageY
      // | 0 是向下取整
      let delta = ((this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT) | 0
      let anchorIndex = this.touch.anchorIndex + delta
      this._scrollTo(anchorIndex)
    },
    scroll(pos) {
      this.scrollY = pos.y
    },
    _scrollTo(index) {
      if (!index && index !== 0) {
        return
      }
      // 适应滑动到shortcut上下内边距的情况
      if (index < 0) {
        index = 0
      } else if (index > this.listHeight.length - 2) {
        index = this.listHeight.length - 2
      }
      // 得到相应item的clientHeight之和, 然后手动通过better-scroll滑到至该位置
      this.scrollY = -this.listHeight[index]
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
    },
    _calcHeight() {
      // 监听数据变化, 每次发生变化就重置listHeight, 计算各个list下的item高度
      this.listHeight = []
      const list = this.$refs.listGroup
      let height = 0
      this.listHeight.push(height)
      for (let i = 0, len = list.length; i < len; i++) {
        let item = list[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
  },
  watch: {
    data() {
      setTimeout(() => {
        this._calcHeight()
      }, 20)
    },
    scrollY(newY) {
      // 主要处理左边list-item的touch事件处理
      const { listHeight } = this
      // 当滚动到顶部上方, newY >= 0
      if (newY >= 0) {
        this.currIndex = 0
        return
      }
      // 在中间部分滚动
      for (let i = 0; i < listHeight.length - 1; i++) {
        let height1 = listHeight[i]
        let height2 = listHeight[i + 1]
        if (-newY >= height1 && -newY < height2) {
          this.currIndex = i
          this.diff = height2 - -newY
          return
        }
      }

      // 滚动到底部, 且-newY > 最后一个元素的上限, listHeight的第一位是0, 因此length要多加1
      this.currIndex = listHeight.length - 1 - 1
    },
    diff(newVal) {
      const fixedTop =
        newVal > 0 && newVal < FIXED_TITLE ? newVal - FIXED_TITLE : 0
      this.$refs.fixed.style.transform = `translate3d(0, ${fixedTop}px, 0)`
    },
  },
  components: {
    Scroll,
    Loading,
  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.listview {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: $color-background;

  .list-group {
    padding-bottom: 30px;

    .list-group-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }

    .list-group-item {
      display: flex;
      align-items: center;
      padding: 20px 0 0 30px;

      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }

      .name {
        margin-left: 20px;
        color: $color-text-l;
        font-size: $font-size-medium;
      }
    }
  }

  .list-shortcut {
    position: absolute;
    z-index: 30;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    padding: 20px 0;
    border-radius: 10px;
    text-align: center;
    background: $color-background-d;
    font-family: Helvetica;

    .item {
      padding: 3px;
      line-height: 1;
      color: $color-text-l;
      font-size: $font-size-small;

      &.current {
        color: $color-theme;
      }
    }
  }

  .list-fixed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;

    .fixed-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }
  }

  .loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
