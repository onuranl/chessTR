const vusax = {
  mutations: {
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
