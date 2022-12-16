<template>
  <div
    v-if="chart && (!inviteSection || !inviteSectionControl)"
    id="app"
    class="container"
  >
    <div
      class="d-flex justify-content-between"
      :class="{ 'flex-wrap': width < 1250 }"
    >
      <chat class="chat-board" :key="chart._id" />
      <div class="game">
        <game v-if="!chart.ai && attempted" />
        <ai v-else-if="chart.ai" />
      </div>
      <board
        v-if="(onlineUsers !== null && isOtherUserOnline !== null) || chart.ai"
        ref="boardDetails"
      />
    </div>
  </div>
  <inviteSection v-else-if="inviteSection" />
</template>

<script>
import ai from '~/components/game/ai'
import inviteSection from '~/components/inviteSection.vue'

import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  components: {
    ai,
    inviteSection,
  },
  data() {
    return {
      socket: null,
      inviteSectionControl: true,
      attempted: false,
    }
  },
  async fetch() {
    const loading = this.$vs.loading()
    this.setChartID(this.$route.params.id)
    await this.getChart()
    loading.close()
  },
  mounted() {
    this.socket = this.$parent.$parent.socket
    this.socket.emit('join attempt', this.chartID)
    this.socket.on('onlineUsers', (data) => {
      if (data) {
        const onlineUsers = Object.values(data)
        this.setOnlineUsers(onlineUsers)
      } else {
        this.inviteSectionControl = false
      }
    })
    this.socket.on('attempted', () => {
      this.attempted = true
    })
  },
  watch: {
    chart(val, oldVal) {
      if (val && !oldVal && val.private && val.users.length < 1) {
        this.socket.emit('join', {
          user: this.user._id,
          color: this.color || null,
          time: this.time,
          increment: this.increment,
        })
      }
    },
  },
  computed: {
    ...mapGetters({
      width: 'vuesax/width',
      user: 'auth/stateUser',
      chart: 'chart/chart',
      chartID: 'chart/chartID',
      inviteSection: 'chart/inviteSection',
      users: 'chart/users',
      color: 'chart/color',
      time: 'chart/time',
      increment: 'chart/increment',
      onlineUsers: 'user/onlineUsers',
      isOtherUserOnline: 'user/isOtherUserOnline',
    }),
  },
  methods: {
    ...mapMutations({
      setChartID: 'chart/setChartID',
      setOnlineUsers: 'user/setOnlineUsers',
    }),
    ...mapActions({
      getChart: 'chart/getChart',
    }),
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

.container {
  @media only screen and (max-width: 1250px) {
    max-width: 980px;
  }

  @media only screen and (max-width: 991px) {
    max-width: 860px;
  }

  @media only screen and (max-width: 870px) {
    max-width: 720px;
  }

  @media only screen and (max-width: 725px) {
    max-width: 600px;
  }

  @media only screen and (max-width: 625px) {
    max-width: 540px;
  }

  @media only screen and (max-width: 560px) {
    max-width: 500px;
  }

  @media only screen and (max-width: 530px) {
    max-width: 460px;
  }

  @media only screen and (max-width: 480px) {
    max-width: 430px;
  }

  @media only screen and (max-width: 450px) {
    max-width: 400px;
  }

  @media only screen and (max-width: 420px) {
    max-width: 360px;
  }
  @media only screen and (max-width: 380px) {
    max-width: 320px;
  }
}

.chat-board {
  height: 630px;
  margin-right: 15px;
}

.game {
  margin-right: 25px;

  @media only screen and (max-width: 1250px) {
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
  }

  div {
    width: 100%;
    height: 100%;
    ::v-deep .blue {
      .cg-board-wrap {
        width: 630px;
        height: 630px;
        @media only screen and (max-width: 1250px) {
          width: 980px;
          height: 980px;

          order: 1;
        }

        @media only screen and (max-width: 991px) {
          width: 860px;
          height: 860px;
        }

        @media only screen and (max-width: 870px) {
          width: 720px;
          height: 720px;
        }

        @media only screen and (max-width: 725px) {
          width: 600px;
          height: 600px;
        }

        @media only screen and (max-width: 625px) {
          width: 540px;
          height: 540px;
        }

        @media only screen and (max-width: 560px) {
          width: 500px;
          height: 500px;
        }

        @media only screen and (max-width: 530px) {
          width: 460px;
          height: 460px;
        }

        @media only screen and (max-width: 480px) {
          width: 430px;
          height: 430px;
        }

        @media only screen and (max-width: 450px) {
          width: 400px;
          height: 400px;
        }

        @media only screen and (max-width: 420px) {
          width: 360px;
          height: 360px;
        }
        @media only screen and (max-width: 380px) {
          width: 320px;
          height: 320px;
        }
      }
    }
  }
}

@media only screen and (max-width: 1250px) {
  .game {
    margin-right: 0px;
  }

  .chat-board {
    height: 320px;
    order: 2;
  }

  .board {
    order: 3;
    justify-content: flex-start;
  }
}

@media only screen and (max-width: 625px) {
  .chat-board {
    width: 200px;
    .chat {
      width: 100%;
    }
    .wrapper-content-input {
      padding: 4px 10px;
    }
  }
}

@media only screen and (max-width: 480px) {
  .chat-board {
    order: 3;
    width: 100%;
    margin-bottom: 20px;
  }
  .board {
    order: 2;
    width: 100%;
    margin: 20px 0px;
  }
}
</style>
