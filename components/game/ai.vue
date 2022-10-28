<template>
  <div class="d-flex flex-column justify-content-center align-items-center">
    <chessboard
      ref="ai"
      @onMove="onMove"
      :fen="chart.chartHistory.fen"
      :orientation="currentUserColor || 'white'"
    />
  </div>
</template>

<script>
import { chessboard } from 'vue-chessboard'

import deepClone from '../../utilities/deepClone'

import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'ai',
  components: { chessboard },
  mounted() {
    if (
      this.currentUserColor === 'black' &&
      this.chart.chartHistory.turn === 'white'
    ) {
      this.aiNextMove()
    }
    window.addEventListener('beforeunload', async () => {
      await this.saveChart()
    })
  },
  async beforeDestroy() {
    await this.saveChart()
  },
  watch: {
    'chart.chartHistory.turn': {
      handler(turn) {
        if (turn !== this.currentUserColor) {
          this.aiNextMove()
        }
      },
    },
  },
  computed: {
    ...mapGetters({
      color: 'chart/color',
      chart: 'chart/chart',
      chartID: 'chart/chartID',
    }),
    currentUserColor() {
      return this.color || this.chart.aiColor
    },
    currentUserElapsedTime() {
      var time = null
      this.$parent.$children.map((child) => {
        if (child._name === '<Board>') {
          time = child.currentUserElapsedTime
        }
      })
      return time
    },
  },
  methods: {
    ...mapMutations({
      setChart: 'chart/setChart',
    }),
    aiNextMove() {
      let moves = this.$refs.ai.game.moves({ verbose: true })
      let randomMove = moves[Math.floor(Math.random() * moves.length)]
      this.$refs.ai.game.move(randomMove)

      const chart = deepClone(this.chart)

      chart.chartHistory.fen = this.$refs.ai.game.fen()
      chart.chartHistory.turn = this.$refs.ai.toColor()

      this.setChart(chart)
    },
    onMove(data) {
      const chart = deepClone(this.chart)

      chart.chartHistory = data

      this.setChart(chart)
    },
    async saveChart() {
      const chart = deepClone(this.chart)

      if (!chart.aiColor && this.color) {
        chart.aiColor = this.color
      }

      chart.aiTime = this.currentUserElapsedTime

      await this.$axios.put(`/chart/${this.chartID}`, chart)
    },
  },
}
</script>

<style lang="scss" scoped>
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
