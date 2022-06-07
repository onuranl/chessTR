<template>
  <div
    v-if="chart.chartHistory && users.currentUser"
    class="main"
    :class="
      users.currentUser.color !== chart.chartHistory.turn ? 'disable' : ''
    "
  >
    <chessboard
      @onMove="onMove"
      :fen="chart.chartHistory.fen"
      :orientation="users.currentUser.color || 'white'"
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
      started: false,
    }
  },
  mounted() {
    this.socket = this.$nuxtSocket({
      channel: '/',
    })
    this.socket.emit('connection', {
      chartID: this.chartID,
      user: this.user._id,
      color: this.color || null,
      time: 300000,
    })
    this.started = true
    this.socket.on('broadcast', async (msg) => {
      if (msg) {
        this.setChart(msg)
        if (this.users && (!this.users.currentUser || !this.users.otherUser)) {
          this.getChart()
        }
      }
    })
  },
  computed: {
    ...mapGetters({
      user: 'auth/stateUser',
      color: 'chart/color',
      chart: 'chart/chart',
      users: 'chart/users',
      chartID: 'chart/chartID',
    }),
  },
  methods: {
    ...mapMutations({
      setChart: 'chart/setChart',
    }),
    ...mapActions({
      getChart: 'chart/getChart',
    }),
    onMove(data) {
      if (this.started) {
        const payload = {
          _id: this.chartID,
          chartHistory: data,
        }
        this.socket.emit('moveOn', payload)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

::v-deep .cg-board-wrap {
  width: 630px;
  height: 630px;
}

.disable {
  ::v-deep .cg-board {
    pointer-events: none;
  }
}
</style>
