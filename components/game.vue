<template>
  <div v-if="chart && chart.chartHistory" class="main">
    <chessboard @onMove="onMove" :fen="chart.chartHistory.fen" />
  </div>
</template>

<script>
import { chessboard } from 'vue-chessboard'
import 'vue-chessboard/dist/vue-chessboard.css'

import { mapMutations, mapGetters } from 'vuex'

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
      }
    })
  },
  computed: {
    ...mapGetters({
      // userInfo: 'user/userInfo',
      user: 'auth/stateUser',
      color: 'chart/color',
      chart: 'chart/chart',
      chartID: 'chart/chartID',
    }),
  },
  methods: {
    ...mapMutations({
      setChart: 'chart/setChart',
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
