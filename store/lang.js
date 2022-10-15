const lang = {
  state: () => ({
    lang: localStorage.getItem('lang') || 'en',
    traslations: null,
  }),
  getters: {
    lang: (state) => state.lang,
    traslations: (state) => state.traslations,
  },
  mutations: {
    setLang(state, value) {
      state.lang = value

      localStorage.setItem('lang', value)
    },
    setTranslations(state, value) {
      state.traslations = value
    },
  },
  actions: {
    getTranslations({ state, commit }) {
      const traslations = require(`../lang/${state.lang}`)

      commit('setTranslations', traslations)
    },
  },
}

export default lang
