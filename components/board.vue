<template>
  <div v-if="users" class="board">
    <div class="w-100" v-if="!unlimited">
      <div class="w-50 border">
        <span>{{ otherUserFormateedElapsedTime }}</span>
      </div>
    </div>
    <b-card-group deck>
      <b-card>
        <template #header>
          <div class="d-flex align-items-center">
            <span
              class="dot"
              :class="isOtherUserOnline || chart.ai ? 'bg-success' : ''"
            />
            <div class="ml-2">
              {{
                chart.ai
                  ? 'Computer'
                  : users.otherUser
                  ? users.otherUser.username
                  : '----'
              }}
            </div>
          </div>
        </template>
        <div class="d-flex flex-column align-items-between">
          <span>
            {{ chart.chartHistory.history }}
          </span>
          <span v-if="isGameOver">
            the game is over, {{ winingColor }} won!
          </span>
        </div>
        <template #footer>
          <div class="d-flex align-items-center">
            <span class="dot bg-success" />
            <span class="ml-2">
              {{
                chart.ai
                  ? stateUser.username
                  : users.currentUser
                  ? users.currentUser.username
                  : '----'
              }}
            </span>
          </div>
        </template>
      </b-card>
    </b-card-group>
    <div class="w-100" v-if="!unlimited">
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
      unlimited: false,
      currentUserElapsedTime: null,
      currentUserTimer: undefined,
      currentUserTimerState: false,
      otherUserElapsedTime: null,
      otherUserTimer: undefined,
      otherUserTimerState: false,
      isGameOver: false,
      winingColor: null,
    }
  },
  mounted() {
    if (this.chart.ai) {
      this.currentUserElapsedTime = this.chart.aiTime
      return
    }

    this.socket = this.$parent.$parent.$parent.socket

    if (this.hasTheMatchStarted) {
      if (this.isOtherUserOnline) {
        this.getTimeByOtherUser()
      } else {
        this.getChart().then(() => {
          this.currentUserElapsedTime = this.users.currentUser.time
          this.otherUserElapsedTime = this.users.otherUser.time
        })
      }
    } else {
      if (this.time) {
        this.currentUserElapsedTime = this.time
        this.otherUserElapsedTime = this.time
      } else {
        this.currentUserElapsedTime = this.chart.users[0].time
        this.otherUserElapsedTime = this.chart.users[0].time
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
    if (!this.isOtherUserOnline && this.hasTheMatchStarted && !this.chart.ai) {
      this.updateTime()
    }
  },
  watch: {
    'chart.chartHistory.turn': {
      immediate: true,
      deep: true,
      handler(turn, prevTurn) {
        if (!turn) {
          this.isGameOver = true

          if (!prevTurn) return

          this.winingColor = prevTurn

          this.chart.users.map(async (el) => {
            const username = el.user.username
            if (this.stateUser.username === username)
              el.color === prevTurn
                ? await this.updateRating({
                    username,
                    status: 'win',
                    chart: this.chart,
                  })
                : await this.updateRating({ username, status: 'lose' })
          })
        } else {
          if (this.chart.ai) {
            const currentUserColor = this.color || this.chart.aiColor

            if (turn === currentUserColor) {
              this.startCurrentUserTimer()
            } else {
              this.stopCurrentUserTimer()
            }
          } else {
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
          }
        }
      },
    },
    currentUserElapsedTime(val, oldVal) {
      if (val < 0 || (!oldVal && val === 0)) this.unlimited = true
    },
    otherUserElapsedTime(val, oldVal) {
      if (val < 0 || (!oldVal && val === 0)) this.unlimited = true
    },
    currentUserTimerState(val) {
      if (this.users.currentUser.increment > 0 && !val) {
        this.currentUserElapsedTime += this.users.currentUser.increment
      }
    },
    otherUserTimerState(val) {
      if (this.users.otherUser.increment > 0 && !val) {
        this.otherUserElapsedTime += this.users.otherUser.increment
      }
    },
  },
  computed: {
    ...mapGetters({
      stateUser: 'auth/stateUser',
      chart: 'chart/chart',
      users: 'chart/users',
      chartID: 'chart/chartID',
      hasTheMatchStarted: 'chart/hasTheMatchStarted',
      time: 'chart/time',
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
      updateRating: 'user/updateRating',
    }),
    async updateTime() {
      const payload = {}

      payload[this.users.currentUser.id] = this.currentUserElapsedTime
      payload[this.users.otherUser.id] = this.otherUserElapsedTime

      await this.$axios.put(`chart/update-time/${this.chartID}`, payload)
    },
    getTimeByOtherUser() {
      const otherUser = this.users.otherUser.id
      this.socket.emit('get time', otherUser)
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

<style lang="scss" scoped>
.board {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 991px) {
    align-items: initial;
  }

  .card-deck {
    .card {
      margin-bottom: 0px;
    }
  }
}
</style>