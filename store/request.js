import axios from 'axios'
import config from '../nuxt.config.js'

const baseURL = config ? config.axios.baseURL : ''

const request = {
  state: () => ({
    friendshipRequests: null,
  }),
  getters: {
    friendshipRequests: (state) => state.friendshipRequests,
  },
  mutations: {
    setFriendshipRequests(state, value) {
      state.friendshipRequests = value
    },
  },
  actions: {
    async getFriendshipRequests({ commit, rootGetters }) {
      try {
        const userID = rootGetters['auth/stateUser']._id

        const response = await axios.get(baseURL + '/friendship/' + userID)

        if (response.status === 200) {
          commit('setFriendshipRequests', response.data.reverse())
        }
      } catch (error) {
        commit('vuesax/openNotification', { text: error }, { root: true })
      }
    },
    async sendFriendshipRequest({ commit, dispatch, rootGetters }, to) {
      try {
        const payload = {
          from: rootGetters['auth/stateUser']._id,
          to,
        }

        const response = await axios.post(baseURL + '/friendship', payload)

        if (response.status === 200) {
          const notification = {
            color: 'success',
            title: 'Başarılı',
            text: 'Arkadaşlık isteği başarıyla gönderildi',
          }

          dispatch('getFriendshipRequests')
          commit('vuesax/openNotification', notification, { root: true })
        }

        return response
      } catch (error) {
        commit('vuesax/openNotification', { text: error }, { root: true })
      }
    },
    async updateFriendshipRequest({ commit, dispatch }, request) {
      try {
        const payload = {
          status: request.status,
        }

        const response = await axios.put(
          baseURL + '/friendship/' + request.id,
          payload
        )

        if (response.status === 200) {
          dispatch('getFriendshipRequests')
        }
      } catch (error) {
        commit('vuesax/openNotification', { text: error }, { root: true })
      }
    },
  },
}

export default request
