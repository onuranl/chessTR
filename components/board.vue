<template>
  <div v-if="users">
    <b-card-group deck>
      <b-card
        :header="users.otherUser ? users.otherUser.email : '----'"
        header-tag="header"
        :footer="users.currentUser ? users.currentUser.email : '----'"
        footer-tag="footer"
        title="Title"
      >
        <b-card-text>Header and footers using props.</b-card-text>
        <b-button href="#" variant="primary">Go somewhere</b-button>
      </b-card>
    </b-card-group>
    <div>
      <p>{{ formattedElapsedTime }}</p>
    </div>
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
      stateUser: 'auth/stateUser',
      chart: 'chart/chart',
      users: 'chart/users',
      chartID: 'chart/chartID',
    }),
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
