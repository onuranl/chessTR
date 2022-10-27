import axios from 'axios'
import config from '../nuxt.config.js'

const baseURL = config ? config.axios.baseURL : ''

const user = {
  state: () => ({
    userInfo: null,
    connectedUsers: null,
    onlineUsers: null,
    isOtherUserOnline: null,
  }),
  getters: {
    userInfo: (state) => state.userInfo,
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
    setUserInfo(state, data) {
      state.userInfo = data
    },
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
        const response = await axios.put(baseURL + '/user', user)

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
