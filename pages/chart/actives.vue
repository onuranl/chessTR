<template>
  <div>
    <div class="charts">
      <div
        class="cursor-pointer"
        v-for="chart in charts"
        :key="chart._id"
        @click="$router.push('/chart/' + chart._id)"
      >
        <chessboard
          class="disable"
          :fen="chart.chartHistory.fen"
          :orientation="
            chart.users.find((item) => item.user.id === currentUserID).color
          "
        />
        <p class="text-white text-center">
          {{ opponent(chart) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { chessboard } from 'vue-chessboard'
import 'vue-chessboard/dist/vue-chessboard.css'

import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'ActiveMatches',
  components: { chessboard },
  data() {
    return {
      charts: null,
    }
  },
  async fetch() {
    const loading = this.$vs.loading()

    try {
      const response = await this.$axios.get(`chart/user/${this.currentUserID}`)

      this.charts = response.data
    } catch (error) {
      this.openNotification({ text: error.response.data.error })

      this.$router.push('/')
    }

    loading.close()
  },
  methods: {
    ...mapMutations({
      openNotification: 'vuesax/openNotification',
    }),
    opponent(chart) {
      return (
        chart.users.find((item) => item.user.id !== this.currentUserID)?.user
          .username || this.traslations.ActiveMatches.NoOpponent
      )
    },
  },
  computed: {
    ...mapGetters({
      traslations: 'lang/traslations',
    }),
    currentUserID() {
      return this.$store.getters['auth/stateUser']?.id
    },
  },
}
</script>

<style lang="scss" scoped>
.charts {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 20px;
  row-gap: 10px;
  padding: 20px;
}

.disable {
  ::v-deep .cg-board {
    pointer-events: none;
  }
}
</style>
