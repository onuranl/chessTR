import axios from 'axios'
import setBaseURL from '../utilities/setBaseURL'

const baseURL = setBaseURL('chat')
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

      const isTablet = this.app.store.getters['vuesax/isTablet']
      const activeComponent = this.app.store.getters['vuesax/activeComponent']

      if (isTablet && activeComponent === 'messages') {
        window.$nuxt.$store.commit('vuesax/setActiveComponent', 'private-chat')
      }
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
        const chats = await axios.get(baseURL + '/user/' + userID)

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
        const chat = await axios.post(baseURL, payload)

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

        await axios.put(baseURL + '/' + data.chatID, payload)
      } catch (error) {
        console.log({ error })
      }
    },
  },
}

export default chat
