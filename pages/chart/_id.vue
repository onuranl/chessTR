<template>
  <div v-if="chart" id="app">
    <div class="d-flex" v-if="userInfo">
      <game />
      <div class="d-flex align-items-center ml-4">
        <board class="board" />
      </div>
    </div>
    <user-info v-else :users="chart.users" />
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
      userInfo: 'user/userInfo',
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
  display: flex;
  justify-content: center;
}

.board {
  width: 357px;
  height: 262px;
}
</style>
