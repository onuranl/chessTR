<template>
  <div id="app">
    <div class="main">
      <chessboard @onMove="showInfo"/>
    </div>
      <div>{{positionInfo}}</div>
  </div>
</template>

<script>
import {chessboard} from 'vue-chessboard'
import 'vue-chessboard/dist/vue-chessboard.css'
export default {
  name: 'App',
  components: {chessboard},
  data() {
    return {
      positionInfo: []
    }
  },
  methods: {
    showInfo(data) {
      this.positionInfo = data
    }
  }
}
</script>

<style >
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