import axios from 'axios'
import config from '../nuxt.config.js'

const baseURL = config ? config.axios.baseURL : ''

const chart = {
  state: {
    chartID: null,
    chart: null,
    users: null,
    started: false,
    color: null,
  },
  getters: {
    chartID: (state) => state.chartID,
    chart: (state) => state.chart,
    users: (state) => state.users,
    color: (state) => state.color,
    hasTheMatchStarted: (state) => state.chart.chartHistory.history.length >= 2,
  },
  mutations: {
    setChartID(state, data) {
      state.chartID = data
    },
    setChart(state, data) {
      state.chart = data
    },
    setUsers(state) {
      const stateUser = this.app.store.state.auth.user
      var currentUser, otherUser
      if (state.chart && state.chart.users && stateUser) {
        state.chart.users.map((element) => {
          element.user.id === stateUser.id
            ? (currentUser = {
                id: element.user.id,
                email: element.user.email,
                color: element.color,
                time: element.time,
              })
            : (otherUser = {
                id: element.user.id,
                email: element.user.email,
                color: element.color,
                time: element.time,
              })
        })
      }
      state.users = {
        currentUser,
        otherUser,
      }
    },
    setColor(state, data) {
      if (data) {
        state.color = data
      } else {
        const color = (arr) => arr[Math.floor(Math.random() * arr.length)]

        state.color = color(['white', 'black'])
      }
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
              commit('setUsers')
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
    async createChart({ context }, mod) {
      const endpoint = mod === 'public' ? '/chart/public' : '/chart'

      try {
        await axios
          .post(baseURL + endpoint)
          .then((result) => {
            if (result) {
              this.app.router.push('chart/' + result.data._id)
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
