import axios from 'axios'
import setBaseURL from '../utilities/setBaseURL'

const baseURL = setBaseURL('user')

const user = {
  state: () => ({
    connectedUsers: null,
    onlineUsers: null,
    isOtherUserOnline: null,
  }),
  getters: {
    connectedUsers: (state) => state.connectedUsers,
    onlineUsers: (state) => state.onlineUsers,
    isOtherUserOnline(state, getters, rootState, rootGetters) {
      const users = rootGetters['chart/users']
      const otherUserId = users.otherUser ? users.otherUser.id : null
      var result = false
      if (state.onlineUsers) {
        state.onlineUsers.map((el) => {
          if (el === otherUserId) {
            result = true
          }
        })
      }
      return result
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
  },
}

export default user
