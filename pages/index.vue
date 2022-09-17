<template>
  <div>
    <div class="content">
      <div class="pools">
        <div
          class="pool rounded border border-secondary text-center text-white cursor-pointer"
          v-for="(pool, index) in pools"
          :key="index"
        >
          <div class="clock">{{ pool.clock }}</div>
          <div class="perf">
            {{ pool.perf.charAt(0).toUpperCase() + pool.perf.slice(1) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
  data() {
    return {
      color: null,
      pools: [
        {
          clock: '1+0',
          perf: 'bullet',
        },
        {
          clock: '2+1',
          perf: 'bullet',
        },
        {
          clock: '3+0',
          perf: 'blitz',
        },
        {
          clock: '3+2',
          perf: 'blitz',
        },
        {
          clock: '5+0',
          perf: 'blitz',
        },
        {
          clock: '5+3',
          perf: 'blitz',
        },
        {
          clock: '10+0',
          perf: 'rapid',
        },
        {
          clock: '10+5',
          perf: 'rapid',
        },
        {
          clock: '15+10',
          perf: 'rapid',
        },
        {
          clock: '30+0',
          perf: 'classical',
        },
        {
          clock: '30+20',
          perf: 'classical',
        },
      ],
    }
  },
  methods: {
    ...mapMutations({ setColor: 'chart/setColor' }),
    ...mapActions({ createChart: 'chart/createChart' }),
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
}

.pool {
  padding: 20px;
  padding-top: 30px;
  padding-bottom: 30px;
  &:hover {
    background: rgb(236, 105, 0);
  }
}
</style>
