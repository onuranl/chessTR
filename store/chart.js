import axios from 'axios'
import config from '../nuxt.config.js'

const baseURL = config ? config.axios.baseURL : ''

var notiPayload = {
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
    users: (state) => state.users,
    color: (state) => state.color,
    hasTheMatchStarted: (state) => state.chart.chartHistory.history.length >= 2,
    inviteSection: (state) => state.inviteSection,
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
    setInviteSection(state, data) {
      if (state.chart && !state.chart.public && !state.users.otherUser) {
        state.inviteSection = true
      } else {
        state.inviteSection = false
      }
    },
  },
  actions: {
    async getChart({ commit, state }) {
      const loading = this.app.router.app.$vs.loading()
      try {
        await axios
          .get(baseURL + '/chart/' + state.chartID)
          .then((result) => {
            if (result) {
              commit('setChart', result.data)
              commit('setUsers')
              commit('setInviteSection')
            }
          })
          .catch((err) => {
            notiPayload.text = err.response.data.error
            window.$nuxt.$store.commit('vuesax/openNotification', notiPayload)
            this.app.router.push('/')
          })
      } catch (error) {
        notiPayload.text = error
        window.$nuxt.$store.commit('vuesax/openNotification', notiPayload)
        this.app.router.push('/')
      }
      loading.close()
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
            notiPayload.text = err.response.data.error
            window.$nuxt.$store.commit('vuesax/openNotification', notiPayload)
            this.app.router.push('/')
          })
      } catch (error) {
        notiPayload.text = error
        window.$nuxt.$store.commit('vuesax/openNotification', notiPayload)
        this.app.router.push('/')
      }
    },
    async deleteChart({ state }) {
      try {
        await axios
          .delete(baseURL + '/chart/' + state.chartID)
          .then((result) => {
            if (result.status === 200) {
              notiPayload.color = 'success'
              notiPayload.title = 'Canceled'
              notiPayload.text = result.data
              window.$nuxt.$store.commit('vuesax/openNotification', notiPayload)
              this.app.router.push('/')
            }
          })
          .catch((err) => {
            notiPayload.text = err.response.data.error
            window.$nuxt.$store.commit('vuesax/openNotification', notiPayload)
            this.app.router.push('/')
          })
      } catch (error) {
        notiPayload.text = error
        window.$nuxt.$store.commit('vuesax/openNotification', notiPayload)
        this.app.router.push('/')
      }
    },
  },
}

export default chart
