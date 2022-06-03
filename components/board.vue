<template>
  <div v-if="setName">
    <b-card-group deck>
      <b-card
        :header="setName.otherUser ? setName.otherUser.name : '----'"
        header-tag="header"
        :footer="setName.currentUser ? setName.currentUser.name : '----'"
        footer-tag="footer"
        title="Title"
      >
        <b-card-text>Header and footers using props.</b-card-text>
        <b-button href="#" variant="primary">Go somewhere</b-button>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      elapsedTime: 300000,
      timer: undefined,
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'user/userInfo',
      chart: 'chart/chart',
      chartID: 'chart/chartID',
    }),
    setName() {
      if (this.userInfo && this.chart.users) {
        let color = this.userInfo.color ? this.userInfo.color : 'white'
        let current = this.chart.users.findIndex((element) => {
          return element.color === color
        })
        let other = current === 1 ? 0 : 1
        return {
          currentUser: this.chart.users[current],
          otherUser: this.chart.users[other],
        }
      }
    },
    formattedElapsedTime() {
      const date = new Date(null)
      date.setSeconds(this.elapsedTime / 1000)
      const utc = date.toUTCString()
      let result = utc.substr(utc.indexOf(':') - 2, 8)
      return result.substring(3)
    },
  },
  methods: {
    start() {
      this.timer = setInterval(() => {
        this.elapsedTime -= 1000
      }, 1000)
    },
    stop() {
      clearInterval(this.timer)
    },
    reset() {
      this.elapsedTime = 0
    },
  },
}
</script>
