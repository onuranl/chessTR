import axios from 'axios'
import setBaseURL from '../utilities/setBaseURL'

const baseURL = setBaseURL('chart')

var notification = {
  color: null,
  title: null,
  text: null,
}

const chart = {
  state: () => ({
    chartID: null,
    chart: null,
    users: null,
    started: false,
    color: null,
    time: null,
    increment: null,
    inviteSection: null,
  }),
  getters: {
    chartID: (state) => state.chartID,
    chart: (state) => state.chart,
    users: (state, getters, rootState, rootGetters) => {
      const stateUser = rootGetters['auth/stateUser']
      var currentUser, otherUser
      if (state.chart && state.chart.users && stateUser) {
        state.chart.users.map((element) => {
          element.user.id === stateUser.id
            ? (currentUser = {
              id: element.user.id,
              email: element.user.email,
              username: element.user.username,
              color: element.color,
              time: element.time,
              increment: element.increment
            })
            : (otherUser = {
              id: element.user.id,
              email: element.user.email,
              username: element.user.username,
              color: element.color,
              time: element.time,
              increment: element.increment
            })
        })
      }
      return {
        currentUser,
        otherUser,
      }
    },
    color: (state) => state.color,
    time: (state) => state.time,
    increment: (state) => state.increment,
    hasTheMatchStarted: (state) =>
      state.chart.chartHistory.history?.length >= 2,
    inviteSection: (state, getters) =>
      state.chart &&
      state.chart.private &&
      !state.chart.ai &&
      !getters.users?.otherUser,
  },
  mutations: {
    setChartID(state, data) {
      state.chartID = data
    },
    setChart(state, data) {
      state.chart = data
    },
    setColor(state, data) {
      if (data !== 'random') {
        state.color = data
      } else {
        const color = (arr) => arr[Math.floor(Math.random() * arr.length)]

        state.color = color(['white', 'black'])
      }
    },
    setTime(state, data) {
      state.time = data * 60000
    },
    setIncrement(state, data) {
      state.increment = data * 1000
    }
  },
  actions: {
    async getChart({ commit, state }) {
      try {
        const response = await axios.get(baseURL + '/' + state.chartID)

        if (response.status === 200) {
          commit('setChart', response.data)
        }
      } catch (error) {
        notification.text = error

        commit('vuesax/openNotification', notification, { root: true })

        this.app.router.push('/')
      }
    },
    async createChart({ commit }, mod) {
      const endpoint = mod ? '/' + mod : ''

      try {
        const response = await axios.post(baseURL + endpoint)

        if (response) {
          this.app.router.push('chart/' + response.data._id)
        }
      } catch (error) {
        notification.text = error

        commit('vuesax/openNotification', notification, { root: true })

        this.app.router.push('/')
      }
    },
    async updateChart({ state, commit }, chart) {
      try {
        await axios.put(baseURL + '/' + state.chartID, chart)
      } catch (error) {
        notification.text = error

        commit('vuesax/openNotification', notification, { root: true })

        this.app.router.push('/')
      }
    },
    async deleteChart({ state, commit }) {
      try {
        const response = await axios.delete(baseURL + '/' + state.chartID)

        if (response.status === 200) {
          notification.color = 'success'
          notification.title = 'Canceled'
          notification.text = response.data

          commit('vuesax/openNotification', notification, { root: true })

          this.app.router.push('/')
        }
      } catch (error) {
        notification.text = error

        commit('vuesax/openNotification', notification, { root: true })

        this.app.router.push('/')
      }
    },
  },
}

export default chart
