const user = {
  state: {
    userInfo: null,
    onlineUsers: null,
    isOtherUserOnline: null,
  },
  getters: {
    userInfo: (state) => state.userInfo,
    onlineUsers: (state) => state.onlineUsers,
    isOtherUserOnline(state) {
      const users = window.$nuxt.$store.getters['chart/users']
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
  },
  mutations: {
    setUserInfo(state, data) {
      state.userInfo = data
    },
    setOnlineUsers(state, data) {
      state.onlineUsers = data
    },
  },
}

export default user
