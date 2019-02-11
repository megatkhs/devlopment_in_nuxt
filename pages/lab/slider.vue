<template>
  <div>
    <div class="l-hero is-lab">
      <div class="l-hero-head">
        <n-link to="/">
          HotPage Lab
        </n-link>
      </div>
      <div class="l-hero-body">
        <div class="container">
          <h1 class="title">
            注目記事スライダー
          </h1>
          <p class="subtitle">
            特殊な動きをするスライダー。レスポンシブ対応は必須です。
          </p>
        </div>
      </div>
    </div>
    <div class="container">
      <h2>スライダー</h2>
      <div class="slider-area">
        <hotpage-slider :slides="slideData" />
      </div>
    </div>
  </div>
</template>

<script>
import HotpageSlider from '~/components/HotpageSlider.vue'

export default {
  components: {
    HotpageSlider
  },
  data() {
    return {
      slideData: [
        {
          src: 'https://placehold.jp/16px/5ad9ed/ffffff/320x240.png?text=slide1'
        },
        {
          src: 'https://placehold.jp/16px/5ad9ed/ffffff/320x240.png?text=slide2'
        },
        {
          src: 'https://placehold.jp/16px/5ad9ed/ffffff/320x240.png?text=slide3'
        },
        {
          src: 'https://placehold.jp/16px/5ad9ed/ffffff/320x240.png?text=slide4'
        },
        {
          src: 'https://placehold.jp/16px/5ad9ed/ffffff/320x240.png?text=slide5'
        }
      ]
    }
  }
}
</script>

<style>
.slider-area {
  background-color: #d4d4d4;
}
</style>
