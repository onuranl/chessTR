<template>
  <div
    v-if="chart && chart.chartHistory"
    class="main"
    :class="userInfo.color !== chart.chartHistory.turn ? 'disable' : ''"
  >
    <chessboard
      @onMove="onMove"
      :fen="chart.chartHistory.fen"
      :orientation="userInfo.color || 'white'"
    />
    <p v-if="userInfo">{{ userInfo.name }}</p>
    <p v-if="users && userInfo">
      <!-- {{
        users.findIndex((element) => {
          if (element.color === userInfo.color || 'white') {
            return true
          }
        })
      }} -->
    </p>
  </div>
</template>

<script>
import { chessboard } from 'vue-chessboard'
import 'vue-chessboard/dist/vue-chessboard.css'

export default {
  components: { chessboard },
  props: {
    userInfo: {
      type: Object,
      required: true,
      default: null,
    },
  },
  data() {
    return {
      chartID: null,
      chart: null,
      users: null,
      audience: null,
      started: false,
    }
  },
  async created() {
    this.chartID = this.$route.params.id
    try {
      await this.$axios
        .$get('chart/' + this.chartID)
        .then((result) => {
          if (result) {
            this.users = result.users
            this.audience = result.audience
            this.chart = result
          } else {
            console.log('there is no chart for this id')
          }
        })
        .catch((err) => {
          console.log({ err })
        })
    } catch (error) {
      console.log({ error })
    }
  },
  mounted() {
    this.socket = this.$nuxtSocket({
      channel: '/',
    })
    const userInfo = {
      chartID: this.chartID,
      user: this.userInfo,
    }
    this.socket.emit('connection', userInfo)
    this.started = true
    this.socket.on('broadcast', async (msg) => {
      try {
        if (msg) {
          this.users = msg.users
          this.audience = msg.audience
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
