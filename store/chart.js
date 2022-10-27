import axios from 'axios'
import config from '../nuxt.config.js'

const baseURL = config ? config.axios.baseURL : ''

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
      return {
        currentUser,
        otherUser,
      }
    },
    color: (state) => state.color,
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
    // setUsers({ state, rootGetters }) {
    //   console.log({ rootGetters })
    //   const stateUser = rootGetters['auth/stateUser']
    //   console.log({ stateUser })
    //   var currentUser, otherUser
    //   if (state.chart && state.chart.users && stateUser) {
    //     state.chart.users.map((element) => {
    //       element.user.id === stateUser.id
    //         ? (currentUser = {
    //             id: element.user.id,
    //             email: element.user.email,
    //             color: element.color,
    //             time: element.time,
    //           })
    //         : (otherUser = {
    //             id: element.user.id,
    //             email: element.user.email,
    //             color: element.color,
    //             time: element.time,
    //           })
    //     })
    //   }
    //   state.users = {
    //     currentUser,
    //     otherUser,
    //   }
    // },
    setColor(state, data) {
      if (data !== 'random') {
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
        const response = await axios.get(baseURL + '/chart/' + state.chartID)

        if (response.status === 200) {
          commit('setChart', response.data)
          // commit('setUsers')
        }
      } catch (error) {
        notification.text = error

        commit('vuesax/openNotification', notification, { root: true })

        this.app.router.push('/')
      }
    },
    async createChart({ commit }, mod) {
      const endpoint =
        mod === 'private'
          ? '/chart/private'
          : mod === 'ai'
          ? '/chart/ai'
          : '/chart'

      try {
        const response = await axios.post(baseURL + endpoint)

        console.log({ response })

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
        await axios.put(baseURL + '/chart/' + state.chartID, chart)
      } catch (error) {
        notification.text = error

        commit('vuesax/openNotification', notification, { root: true })

        this.app.router.push('/')
      }
    },
    async deleteChart({ state, commit }) {
      try {
        const response = await axios.delete(baseURL + '/chart/' + state.chartID)

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
