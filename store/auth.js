import axios from 'axios'
import config from '../nuxt.config.js'

const baseURL = config ? config.axios.baseURL : ''

const auth = {
  state: {
    user: null,
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
    stateUser: (state) => state.user,
  },
  mutations: {
    setUser(state, data) {
      state.user = data
    },
    logOut(state) {
      state.user = null
      this.app.$cookies.set('authToken', null)
      this.app.router.push('/login')
    },
  },
  actions: {
    async logIn({ dispatch }, user) {
      const result = await axios.post(baseURL + '/auth/login', user)
      if (result && result.status === 200) {
        dispatch('setToken', result.data.user.token)
      }
      return result
    },
    async register({ dispatch }, form) {
      const result = await axios.post(baseURL + '/auth/register', form)
      if (result && result.status === 200) {
        dispatch('logIn', form)
      }
      return result
    },
    async setToken({ commit }, token) {
      if (token) {
        try {
          const result = await axios.get(baseURL + '/auth/user', {
            headers: {
              'Content-Type': 'application/json',
              Authorization: token,
            },
          })
          if (result.data.status) {
            commit('setUser', result.data.user)
          } else {
            commit('logOut')
          }
          this.app.$cookies.set('authToken', token)
        } catch (error) {
          console.log({ error })
          commit('logOut')
        }
      }
    },
  },
}

export default auth
