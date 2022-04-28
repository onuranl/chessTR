<template>
  <div v-if="chart" id="app">
    <game v-if="userInfo" :userInfo="userInfo" />
    <user-info v-else :users="chart.users" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      chartID: null,
      chart: null,
    }
  },
  async created() {
    this.chartID = this.$route.params.id
    try {
      let chart = await this.$axios.$get('chart/' + this.chartID)
      if (chart) {
        this.chart = chart
      } else {
        console.log('there is no chart for this id')
      }
    } catch (error) {
      console.log({ error })
    }
  },
  computed: {
    ...mapGetters({ userInfo: 'user/userInfo' }),
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
