<template>
  <div id="app">
    <div class="main">
      <chessboard
        v-if="chart"
        @onMove="onMove"
        :fen="chart.chartHistory.fen"
        :free="true"
      />
    </div>
  </div>
</template>

<script>
import { chessboard } from 'vue-chessboard'
import 'vue-chessboard/dist/vue-chessboard.css'
export default {
  name: 'App',
  components: { chessboard },
  data() {
    return {
      positionInfo: [],
      charID: null,
      chart: null,
      started: false,
      fen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1',
    }
  },
  async created() {
    this.charID = this.$route.params.id
    try {
      let chart = await this.$axios.$get('chart/' + this.charID)
      if (chart) {
        this.chart = chart
      } else {
        console.log('there is no chart for this id')
      }
    } catch (error) {
      console.log(error)
    }
  },
  mounted() {
    this.socket = this.$nuxtSocket({
      channel: '/',
    })
    this.started = true
    this.socket.on('broadcast', async (msg) => {
      try {
        if (msg) {
          this.chart = msg
        }
      } catch (error) {
        console.log(error)
      }
    })
  },
  methods: {
    onMove(data) {
      if (this.started) {
        const payload = {
          _id: this.charID,
          chartHistory: data,
        }
        this.socket.emit('message', payload)
      }
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  height: 100%;
}
.main {
  display: flex;
  justify-content: center;
  align-items: center;
}

.cg-board-wrap {
  width: 630px;
  height: 630px;
}
</style>
