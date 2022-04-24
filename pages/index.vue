<template>
  <div id="app">
    <div class="main">
      <chessboard @onMove="showInfo" />
    </div>
    <div>{{ positionInfo }}</div>
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
    }
  },
  async created() {
    try {
      let channel = await this.$axios.$get('chart')
    } catch (error) {
      console.log(error)
    }
  },
  mounted() {
    this.socket = this.$nuxtSocket({
      channel: '/',
    })
    this.socket.on('broadcast', async (msg) => {
      try {
      } catch (error) {
        console.log(error)
      }
    })
  },
  methods: {
    // async sendMessage() {
    //   let result = {
    //     channelID: this.$route.params.id,
    //     // edit nuxt auth user _id
    //     authorID: "61161010e35ff03d848f644e",
    //     message: this.message,
    //     created: new Date()
    //   }

    //   this.socket.emit('message', result)
    // },
    async showInfo(data) {
      this.positionInfo = data
      // this.socket.emit('message', data)
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
