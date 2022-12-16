<template>
  <div
    v-if="chart.chartHistory && users.currentUser"
    class="d-flex flex-column justify-content-center align-items-center"
    :class="{ disable: users.currentUser.color !== chart.chartHistory.turn }"
  >
    <chessboard
      @onMove="onMove"
      :fen="chart.chartHistory.fen"
      :orientation="users.currentUser.color || 'white'"
      :key="count"
    />
  </div>
</template>

<script>
import { chessboard } from 'vue-chessboard'
import 'vue-chessboard/dist/vue-chessboard.css'

import { mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  components: { chessboard },
  data() {
    return {
      socket: null,
      started: false,
      count: 0,
    }
  },
  mounted() {
    this.socket = this.$parent.$parent.$parent.socket
    this.socket.emit('join', {
      user: this.user._id,
      color: this.color || null,
      time: this.time,
      increment: this.increment,
    })
    this.started = true
    this.socket.on('broadcast', async (msg) => {
      if (msg) {
        this.setChart(msg)
        if (this.users && (!this.users.currentUser || !this.users.otherUser)) {
          await this.getChart()
        }
      }
    })
  },
  watch: {
    width() {
      this.count++
    },
  },
  beforeDestroy() {
    this.quitFromGame()
  },
  computed: {
    ...mapGetters({
      width: 'vuesax/width',
      user: 'auth/stateUser',
      color: 'chart/color',
      time: 'chart/time',
      increment: 'chart/increment',
      chart: 'chart/chart',
      users: 'chart/users',
    }),
  },
  methods: {
    ...mapMutations({
      setChart: 'chart/setChart',
    }),
    ...mapActions({
      getChart: 'chart/getChart',
    }),
    quitFromGame() {
      this.socket.emit('quit')
    },
    onMove(data) {
      if (this.started && data.history.length) {
        const payload = {
          chartHistory: data,
          user: this.user._id,
        }
        this.socket.emit('move on', payload)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.disable {
  ::v-deep .cg-board {
    pointer-events: none;
  }
}
</style>
