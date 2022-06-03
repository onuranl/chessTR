<template>
  <div v-if="chart" id="app" class="container">
    <div class="d-flex justify-content-between">
      <chat class="chat" />
      <div class="game">
        <game />
      </div>
      <!-- <board class="d-flex align-items-center" /> -->
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
      // userInfo: 'user/userInfo',
      isAuthenticated: 'auth/isAuthenticated',
      chart: 'chart/chart',
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
</style>
