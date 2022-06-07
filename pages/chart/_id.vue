<template>
  <div v-if="chart" id="app" class="container">
    <div class="d-flex justify-content-between">
      <chat class="chat-board" />
      <div class="game">
        <game />
      </div>
      <board class="d-flex align-items-center" />
    </div>
    <!-- <user-info v-else :users="chart.users" /> -->
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  async created() {
    this.setChartID(this.$route.params.id)
    this.getChart()
  },
  computed: {
    ...mapGetters({
      chart: 'chart/chart',
      users: 'chart/users',
    }),
  },
  methods: {
    ...mapMutations({
      setChartID: 'chart/setChartID',
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
  text-align: center;
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
