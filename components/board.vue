<template>
  <div
    v-if="users"
    class="d-flex flex-column align-items-center justify-content-center"
  >
    <div class="w-100">
      <div class="w-50 border">
        <span>{{ otherUserFormateedElapsedTime }}</span>
      </div>
    </div>
    <b-card-group deck>
      <b-card>
        <template #header>
          <div class="d-flex align-items-center">
            <span class="dot" :class="isOtherUserOnline ? 'bg-success' : ''" />
            <div class="ml-2">
              {{ users.otherUser ? users.otherUser.email : '----' }}
            </div>
          </div>
        </template>
        <div class="d-flex flex-column align-items-between">
          {{ chart.chartHistory.history }}
        </div>
        <template #footer>
          <div class="d-flex align-items-center">
            <span class="dot bg-success" />
            <span class="ml-2">
              {{ users.currentUser ? users.currentUser.email : '----' }}
            </span>
          </div>
        </template>
      </b-card>
    </b-card-group>
    <div class="w-100">
      <div class="w-50 border">
        <span>{{ currentUserFormattedElapsedTime }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      socket: null,
      currentUserElapsedTime: 300000,
      currentUserTimer: undefined,
      currentUserTimerState: false,
      otherUserElapsedTime: 300000,
      otherUserTimer: undefined,
      otherUserTimerState: false,
    }
  },
  mounted() {
    this.socket = this.$parent.socket
    if (this.hasTheMatchStarted) {
      if (this.isOtherUserOnline) {
        this.getTimeByOtherUser()
      } else {
        this.getChart().then(() => {
          this.currentUserElapsedTime = this.users.currentUser.time
          this.otherUserElapsedTime = this.users.otherUser.time
        })
      }
    }
    this.socket.on('setTime', (user) => {
      if (user === this.users.currentUser.id) {
        this.setTimeToOtherUser()
      }
    })
    this.socket.on('timeBroadcast', (data) => {
      if (data.otherUser === this.users.currentUser.id) {
        this.currentUserElapsedTime = data.currentUserElapsedTime
        this.otherUserElapsedTime = data.otherUserElapsedTime
      }
    })
  },
  beforeDestroy() {
    if (!this.isOtherUserOnline && this.hasTheMatchStarted) {
      this.updateTime()
    }
  },
  watch: {
    'chart.chartHistory.turn': {
      immediate: true,
      deep: true,
      handler(turn) {
        const currentUserColor = this.users.currentUser
          ? this.users.currentUser.color
          : null
        const otherUserColor = this.users.otherUser
          ? this.users.otherUser.color
          : null
        if (this.chart && this.hasTheMatchStarted) {
          if (turn === currentUserColor || turn !== otherUserColor) {
            this.startCurrentUserTimer()
            this.stopOtherUserTimer()
          } else {
            this.startOtherUserTimer()
            this.stopCurrentUserTimer()
          }
        }
      },
    },
  },
  computed: {
    ...mapGetters({
      chart: 'chart/chart',
      users: 'chart/users',
      chartID: 'chart/chartID',
      hasTheMatchStarted: 'chart/hasTheMatchStarted',
      isOtherUserOnline: 'user/isOtherUserOnline',
    }),
    currentUserFormattedElapsedTime() {
      const date = new Date(null)
      date.setSeconds(this.currentUserElapsedTime / 1000)
      const utc = date.toUTCString()
      let result = utc.substr(utc.indexOf(':') - 2, 8)
      return result.substring(3)
    },
    otherUserFormateedElapsedTime() {
      const date = new Date(null)
      date.setSeconds(this.otherUserElapsedTime / 1000)
      const utc = date.toUTCString()
      let result = utc.substr(utc.indexOf(':') - 2, 8)
      return result.substring(3)
    },
  },
  methods: {
    ...mapActions({
      getChart: 'chart/getChart',
    }),
    async updateTime() {
      const payload = {}

      payload[this.users.currentUser.id] = this.currentUserElapsedTime
      payload[this.users.otherUser.id] = this.otherUserElapsedTime

      await this.$axios.put(`chart/update-time/${this.chartID}`, payload)
    },
    getTimeByOtherUser() {
      const otherUser = this.users.otherUser.id
      this.socket.emit('getTime', otherUser)
    },
    setTimeToOtherUser() {
      const payload = {
        otherUser: this.users.otherUser.id,
        currentUserElapsedTime: this.otherUserElapsedTime,
        otherUserElapsedTime: this.currentUserElapsedTime,
      }
      this.socket.emit('time', payload)
    },
    startCurrentUserTimer() {
      if (!this.currentUserTimerState) {
        this.currentUserTimer = setInterval(() => {
          this.currentUserElapsedTime -= 1000
        }, 1000)
        this.currentUserTimerState = true
      }
    },
    startOtherUserTimer() {
      if (!this.otherUserTimerState) {
        this.otherUserTimer = setInterval(() => {
          this.otherUserElapsedTime -= 1000
        }, 1000)
        this.otherUserTimerState = true
      }
    },
    stopCurrentUserTimer() {
      if (this.currentUserTimerState) {
        clearInterval(this.currentUserTimer)
        this.currentUserTimerState = false
      }
    },
    stopOtherUserTimer() {
      if (this.otherUserTimerState) {
        clearInterval(this.otherUserTimer)
        this.otherUserTimerState = false
      }
    },
  },
}
</script>

<style scoped>
.dot {
  height: 20px;
  width: 20px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
}
</style>
