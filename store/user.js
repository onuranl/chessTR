import axios from 'axios'
import deepClone from '~/utilities/deepClone'
import setBaseURL from '../utilities/setBaseURL'

const baseURL = setBaseURL('user')

const user = {
  state: () => ({
    connectedUsers: null,
    onlineUsers: null,
    isOtherUserOnline: null,
  }),
  getters: {
    currentUserID: (state, getters, rootState, rootGetters) =>
      rootGetters['auth/stateUser']?.id,
    connectedUsers: (state) => state.connectedUsers,
    onlineUsers: (state) => state.onlineUsers,
    isOtherUserOnline(state, getters, rootState, rootGetters) {
      const users = rootGetters['chart/users']
      const otherUserId = users.otherUser ? users.otherUser.id : null

      return state.onlineUsers.some(user => user === otherUserId)
    },
    isUserMyFriend: () => (friends, userID) => {
      return friends.some((friend) => friend._id === userID)
    },
  },
  mutations: {
    setOnlineUsers(state, data) {
      state.onlineUsers = data
    },
    setConnectedUsers(state, data) {
      state.connectedUsers = data
    },
  },
  actions: {
    async updateUser({ commit }, user) {
      try {
        const response = await axios.put(baseURL, user)

        if (response.status === 200) {
          const notification = {
            color: 'success',
            title: 'Başarılı',
            text: 'Bilgiler başarıyla güncellendi.',
          }

          commit('auth/setUser', response.data.user, { root: true })
          commit('vuesax/openNotification', notification, { root: true })
        }
      } catch (error) {
        commit('vuesax/openNotification', { text: error }, { root: true })
      }
    },
    async updateRating({ commit, dispatch }, payload) {
      try {
        const response = await axios.get(baseURL + '/' + payload.username)

        const user = response.data.user

        user.matches++

        user[payload.status]++

        switch (payload.status) {
          case 'win':
            const chart = deepClone(payload.chart)

            chart.won = user.id

            await dispatch('chart/updateChart', chart, { root: true })

            user.rating += 50
            break;
          case 'lose':
            user.rating -= 50
          default:
            user.rating = user.rating
            break;
        }

        await axios.put(baseURL, user)
      } catch (error) {
        commit('vuesax/openNotification', { text: error }, { root: true })
      }
    },
  },
}

export default user
