<template>
  <div id="app">
    <newboard class="main" />
    <button class="button is-light" @click="undo()">UNDO</button>
  </div>
</template>

<script>
import { chessboard } from 'vue-chessboard'
import 'vue-chessboard/dist/vue-chessboard.css'
import newboard from './newboard.vue'
import bus from './bus.js'
export default {
  name: 'app',
  components: {
    chessboard,
    newboard,
  },
  data() {
    return {
      currentFen: '',
      positionInfo: null,
    }
  },
  // beforeDestroy() {
  //   this.quitFromGame()
  // },
  methods: {
    showInfo(data) {
      this.positionInfo = data
    },
    loadFen(fen) {
      this.currentFen = fen
    },
    promote() {
      if (confirm('Want to promote to rook? Queen by default')) {
        return 'r'
      } else {
        return 'q'
      }
    },
    undo() {
      bus.$emit('undo')
    },
  },
  created() {
    this.fens = [
      '5rr1/3nqpk1/p3p2p/Pp1pP1pP/2pP1PN1/2P1Q3/2P3P1/R4RK1 b - f3 0 28',
      'r4rk1/pp1b3p/6p1/8/3NpP2/1P4P1/P2K3P/R6R w - - 0 22',
    ]
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
