import axios from 'axios'
import setBaseURL from '../utilities/setBaseURL'

const baseURL = setBaseURL('friendship')

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

        const response = await axios.get(baseURL + '/' + userID)

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

        const response = await axios.post(baseURL, payload)

        if (response.status === 200) {
          const notification = {
            color: 'success',
            title: rootGetters['lang/traslations'].Notification.Successful,
            text: rootGetters['lang/traslations'].Notification.RequestSuccessfullySent,
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

        const response = await axios.put(baseURL + '/' + request.id, payload)

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
