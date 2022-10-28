<template>
  <div>
    <div class="content">
      <div class="pools">
        <div
          class="pool rounded border border-secondary text-center text-white cursor-pointer"
          v-for="(pool, index) in pools"
          :key="index"
          @click="selectPool(index)"
        >
          <div :class="{ active: pool.state }">
            <div class="clock" v-html="pool.clock" />
            <div class="perf" v-html="firstLetterUpperCase(pool.perf)" />
            <c-loader v-if="pool.state" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

import CLoader from '~/components/common/CLoader.vue'

import pools from '../helpers/pools'

import firstLetterUpperCase from '../utilities/firstLetterUpperCase'

export default {
  components: { CLoader },
  data() {
    return {
      socket: null,
      pools,
    }
  },
  mounted() {
    this.socket = this.$parent.$parent.socket
    this.socket.on('generate', (chart) => {
      this.$router.push('/chart/' + chart._id)
    })
  },
  watch: {
    pools: {
      deep: true,
      handler(pools) {
        const value = pools.find((pool) => {
          return pool.state
        })
        this.socket.emit('match', value)
      },
    },
  },
  methods: {
    firstLetterUpperCase,
    ...mapMutations({ setColor: 'chart/setColor' }),
    ...mapActions({ createChart: 'chart/createChart' }),
    selectPool(index) {
      this.pools.map((pool, poolIndex) => {
        index === poolIndex
          ? pool.state === true
            ? (pool.state = false)
            : (pool.state = true)
          : (pool.state = false)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.content {
  width: 600px;
}

.pools {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 10px;
  row-gap: 10px;
  padding: 20px;
  padding-top: 0px;
}

.pool {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 140px;
  width: 180px;
  &:hover {
    background: rgb(236, 105, 0);
  }
  .active {
    margin-bottom: -30px;
  }
}
</style>
