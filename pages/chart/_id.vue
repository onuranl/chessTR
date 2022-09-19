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

.chat-board {
  height: 630px;
  margin-right: 15px;
}

.game {
  margin-right: 25px;
}
</style>
