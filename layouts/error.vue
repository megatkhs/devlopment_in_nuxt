<template>
  <div class="contianer">
    <h1 v-if="errorStatus === 404">
      ページが見つかりません
    </h1>
    <n-link to="/">
      ホームに戻ります。
    </n-link>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      require: true,
      default: null
    }
  },
  computed: {
    errorStatus() {
      return this.error.statusCode
    }
  }
}
</script>
