const vusax = {
  state: () => ({
    width: null,
    activeComponent: null,
    sidebar: false
  }),
  getters: {
    width: (state) => state.width,
    isMobile: (state) => state.width < 400,
    isTablet: (state) => state.width < 991,
    activeComponent: (state) => state.width >= 991 ? false : state.activeComponent,
    sidebar: (state) => state.sidebar
  },
  mutations: {
    setWidth(state, data) {
      state.width = data
    },
    setActiveComponent(state, data) {
      state.activeComponent = data
    },
    setSidebar(state, data) {
      state.sidebar = data
    },
    openNotification(state, payload) {
      this.app.router.app.$vs.notification({
        progress: 'auto',
        color: payload.color || 'danger',
        position: 'top-right',
        title: payload.title || 'error',
        text: payload.text || '',
      })
    },
  },
}

export default vusax
