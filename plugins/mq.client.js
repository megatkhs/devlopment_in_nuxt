import Vue from 'vue'

const MediaQuery = {}

MediaQuery.install = (Vue, options) => {
  Vue.prototype.$device = {}

  Vue.mixin({
    data() {
      return {
        $device: this.$device
      }
    },
    created() {
      window.addEventListener('resize', this.getMediaQuery, false)
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.getMediaQuery, false)
    },
    methods: {
      getMediaQuery() {
        this.$device.winWidth = window.innerWidth

        const width = this.$device.winWidth
        if (width >= 1200) {
          this.$device.screen = 'full'
        } else if (width >= 685) {
          this.$device.screen = 'middle'
        } else {
          this.$device.screen = 'sp'
        }
      }
    }
  })
}

Vue.use(MediaQuery)
