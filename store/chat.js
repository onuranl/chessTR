import axios from 'axios'
import config from '../nuxt.config.js'

const baseURL = config ? config.axios.baseURL : ''

const chat = {
  state: () => ({
    chats: null,
    activeChatIDs: [],
  }),
  getters: {
    chats: (state) => state.chats,
    activeChatIDs: (state) => state.activeChatIDs,
    activeChats: (state) =>
      state.chats?.filter((chat) =>
        state.activeChatIDs.some((id) => id === chat._id)
      ),
  },
  mutations: {
    setChats(state, data) {
      state.chats = data
    },
    setActiveChatIDs(state, data) {
      if (typeof data === 'object') {
        state.activeChatIDs = data
      } else {
        state.activeChatIDs.push(data)
      }
      this.app.$cookies.set('activeChatIDs', state.activeChatIDs)
    },
    setChatMessageByChatID(state, { chatID, payload }) {
      state.chats.some((chat) => {
        if (chat._id === chatID) {
          chat.messages.push(payload)
          return
        }
      })
    },
  },
  actions: {
    async getChats({ commit }, userID) {
      try {
        const chats = await axios.get(baseURL + '/chat/user/' + userID)

        commit('setChats', chats.data)
      } catch (error) {
        console.log({ error })
      }
    },
    async startChat({ commit, dispatch }, users) {
      try {
        const payload = {
          users,
        }
        const chat = await axios.post(baseURL + '/chat', payload)

        if (chat.status === 200) {
          dispatch('getChats', users[0])
          commit('setActiveChatIDs', chat.data._id)
        }
      } catch (error) {
        console.log({ error })
      }
    },
    async sendMessage({ context }, data) {
      try {
        const payload = {
          authorID: data.authorID,
          message: data.message,
        }

        await axios.put(baseURL + '/chat/' + data.chatID, payload)
      } catch (error) {
        console.log({ error })
      }
    },
  },
}

export default chat
