import axios from 'axios'
import config from '../nuxt.config.js'

const baseURL = config ? config.axios.baseURL : ''

const chart = {
  state: {
    chartID: null,
    chart: null,
    started: false,
  },
  getters: {
    chartID: (state) => state.chartID,
    chart: (state) => state.chart,
  },
  mutations: {
    setChartID(state, data) {
      state.chartID = data
    },
    setChart(state, data) {
      state.chart = data
    },
  },
  actions: {
    async getChart({ commit, state }) {
      try {
        await axios
          .get(baseURL + '/chart/' + state.chartID)
          .then((result) => {
            if (result) {
              commit('setChart', result.data)
            } else {
              console.log('there is no chart for this id')
            }
          })
          .catch((err) => {
            console.log({ err })
          })
      } catch (error) {
        console.log({ error })
      }
    },
    async createChart() {
      try {
        await axios
          .post(baseURL + '/chart')
          .then((result) => {
            if (result) {
              this.app.router.push('chart/' + result._id)
            }
          })
          .catch((err) => {
            console.log({ err })
          })
      } catch (error) {
        console.log({ error })
      }
    },
  },
}

export default chart