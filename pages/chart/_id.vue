<template>
  <div
    v-if="chart && (!inviteSection || !inviteSectionControl)"
    id="app"
    class="container"
  >
    <div class="d-flex justify-content-between">
      <chat class="chat-board" />
      <div class="game">
        <game v-if="!chart.ai" />
        <ai v-else />
      </div>
      <board
        v-if="(onlineUsers !== null && isOtherUserOnline !== null) || chart.ai"
        ref="boardDetails"
      />
    </div>
  </div>
  <div v-else-if="inviteSection">
    <div class="invite text-secondary">
      <h3>Challange to game</h3>
      <div class="invite-main my-4">
        <p>To invite someone to play, give this URL:</p>
        <div class="d-flex align-items-center my-3">
          <vs-input state="success" v-model="url" readonly />
          <vs-button
            class="mb-0"
            icon
            active
            :disabled="copied"
            @click="copyUrl"
          >
            <copy-icon v-if="!copied" size="1.5x" class="cursor-pointer" />
            <check-icon v-else size="1.5x" class="cursor-pointer"></check-icon>
          </vs-button>
        </div>
        <p>The first person to come to this URL will play with you.</p>
      </div>
      <div class="d-flex justify-content-center align-items-center">
        <vs-button @click="deleteChart" danger border class="text-white" active>
          <x-icon size="1.5x" class="mr-1"></x-icon> CANCEL
        </vs-button>
      </div>
    </div>
  </div>
</template>

<script>
import { XIcon, CopyIcon, CheckIcon } from 'vue-feather-icons'

import ai from '~/components/game/ai'

import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  components: {
    XIcon,
    CopyIcon,
    CheckIcon,
    ai,
  },
  data() {
    return {
      socket: null,
      url: window.location.origin + this.$route.path,
      copied: false,
      inviteSectionControl: true,
    }
  },
  fetch() {
    const loading = this.$vs.loading()
    this.setChartID(this.$route.params.id)
    this.getChart()
    loading.close()
  },
  mounted() {
    this.socket = this.$parent.$parent.socket
    this.socket.emit('joinAttempt', this.chartID)
    this.socket.on('onlineUsers', async (data) => {
      if (data) {
        const onlineUsers = Object.values(data)
        this.setOnlineUsers(onlineUsers)
      } else {
        this.inviteSectionControl = false
      }
    })
  },
  computed: {
    ...mapGetters({
      chart: 'chart/chart',
      chartID: 'chart/chartID',
      inviteSection: 'chart/inviteSection',
      users: 'chart/users',
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
      deleteChart: 'chart/deleteChart',
    }),
    copyUrl() {
      navigator.clipboard.writeText(this.url)

      this.copied = true
    },
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

.invite {
  background: #262421;
  box-shadow: 0 2px 2px 0rgba (0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  border-radius: 3px;
  padding: 36px 48px;
  &-main {
    padding: 20px;
    background: #302e2c;
    border-radius: 3px;
  }
}

p {
  margin: 0px;
}
</style>
