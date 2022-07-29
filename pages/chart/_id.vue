<template>
  <div v-if="socket && chart" id="app" class="container">
    <div class="d-flex justify-content-between">
      <chat class="chat-board" />
      <div class="game">
        <game />
      </div>
      <board
        v-if="onlineUsers !== null && isOtherUserOnline !== null"
        ref="boardDetails"
      />
    </div>
    <!-- <user-info v-else :users="chart.users" /> -->
  </div>
  <div v-else class="loading-page">
    <p>Loading...</p>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  data() {
    return {
      socket: null,
    }
  },
  created() {
    this.setChartID(this.$route.params.id)
    this.getChart()
  },
  mounted() {
    this.socket = this.$nuxtSocket({
      channel: '/',
    })
    this.socket.on('onlineUsers', async (data) => {
      if (data) {
        const onlineUsers = Object.values(data)
        this.setOnlineUsers(onlineUsers)
      }
    })
  },
  computed: {
    ...mapGetters({
      chart: 'chart/chart',
      onlineUsers: 'user/onlineUsers',
      isOtherUserOnline: 'user/isOtherUserOnline',
    }),
  },
  methods: {
    ...mapMutations({
      setChartID: 'chart/setChartID',
      setOnlineUsers: 'user/setOnlineUsers',
    }),
    ...mapActions({ getChart: 'chart/getChart' }),
  },
}
</script>

<style scoped lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  height: 100%;
}

.chat-board {
  height: 630px;
  margin-right: 15px;
}

.game {
  margin-right: 25px;
}

.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  text-align: center;
  padding-top: 200px;
  font-size: 30px;
  font-family: sans-serif;
}
</style>
