<template>
  <div
    ref="slider"
    class="slider"
    :style="`height: ${getSliderHeight}px`"
  >
    <div
      ref="view"
      class="slider-view"
      :style="`width: ${getItemWidth}px; height: ${getItemHeight}px`"
    >
      <ul
        ref="contents"
        class="slider-contents"
        :style="`width: ${getConteinerWidth}px; height: ${getItemHeight}px; left: ${posLeft}px`"
      >
        <li
          v-for="(slide, index) in slides"
          :key="index"
          class="slider-item"
          :style="`width: ${getItemWidth}px; height: ${getItemHeight}px`"
        >
          <img
            :src="slide.src"
            :alt="index"
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    slides: {
      type: Array,
      require: true,
      default: null
    },
    options: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      currentIndex: 0,
      sliderWidth: 0,
      progress: 0,
      startPosX: 0,
      startPosDiff: 0,
      posLeft: 0
    }
  },
  computed: {
    getSliderHeight() {
      return Math.floor(this.sliderWidth * 0.7)
    },
    getConteinerWidth() {
      return this.getItemWidth * this.slides.length
    },
    getItemWidth() {
      return Math.floor(this.sliderWidth * 0.8)
    },
    getItemHeight() {
      return this.getItemWidth * 0.6
    }
  },
  mounted() {
    this.updatesliderWidth()
    window.addEventListener('resize', this.updatesliderWidth, false)

    // ドラッグ処理
    this.$refs.contents.addEventListener('mousedown', this.onMouseDown, false)
    this.$refs.contents.addEventListener('touchstart', this.onMouseDown, false)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updatesliderWidth, false)
  },
  methods: {
    updatesliderWidth() {
      this.sliderWidth = this.$refs.slider.clientWidth
    },

    // マウスボタンを押下したときの処理
    onMouseDown(e) {
      // デバイスによるイベント差異を吸収
      let event = false
      if (e.type === 'mousedown') {
        event = e
      } else {
        event = e.changedTouches[0]
      }

      const left = Math.floor(this.$refs.contents.getBoundingClientRect().left)

      this.startPosX = event.pageX - left
      this.startPosDiff = this.startPosX

      // ドラッグ処理を開始
      document.body.addEventListener('mousemove', this.onMouseMove, false)
      document.body.addEventListener('touchmove', this.onMouseMove, false)
      this.$refs.contents.addEventListener('mouseup', this.onMouseUp, false)
      this.$refs.contents.addEventListener('touchend', this.onMouseUp, false)
      document.body.addEventListener('mouseleave', this.onMouseUp, false)
      document.body.addEventListener('touchleave', this.onMouseUp, false)
    },

    // マウスボタン押下時のドラッグ処理
    onMouseMove(e) {
      const left = Math.floor(this.$refs.contents.getBoundingClientRect().left)
      const pageX = event.pageX - left
      if (pageX - this.startPosX > 0) {
        this.progress--
      } else if (pageX - this.startPosX < 0) {
        this.progress++
      }

      this.startPosX = pageX
      this.posLeft = pageX - this.startPosDiff

      console.log(event.pageX, left, this.startPosX)
    },

    // マウスボタン押下時のドラッグ処理
    onMouseUp(e) {
      // イベントリスナーの削除
      document.body.removeEventListener('mousemove', this.onMouseMove, false)
      document.body.removeEventListener('touchmove', this.onMouseMove, false)
      this.$refs.contents.removeEventListener('mouseup', this.onMouseUp, false)
      this.$refs.contents.removeEventListener('touchend', this.onMouseUp, false)
      document.body.removeEventListener('mouseleave', this.onMouseUp, false)
      document.body.removeEventListener('touchleave', this.onMouseUp, false)
    }
  }
}
</script>

<style style lang="scss" scoped>
.slider {
  position: relative;
  width: 100%;

  &-view {
    position: absolute;
    top: 50%;
    left: 50%;
    overflow: hidden;
    transform: translate(-50%, -50%);
  }

  &-contents {
    position: absolute;

    list-style: none;
  }

  &-item {
    float: left;
  }

  * {
    user-select: none;
  }

  // 画像をドラッグできないように
  img {
    pointer-events: none;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
