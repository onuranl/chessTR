const user = {
  state: {
    userInfo: null,
  },
  getters: {
    userInfo: (state) => state.userInfo,
  },
  mutations: {
    setUserInfo(state, data) {
      state.userInfo = data
    },
  },
}

export default user
