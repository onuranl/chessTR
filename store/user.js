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
    isOtherUserOnline(state, rootGetters) {
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
}

export default user
