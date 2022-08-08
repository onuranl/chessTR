export default function ({ app, store, redirect, route }) {
  const token = app.$cookies.get('authToken')
  const isAuthPage = route.name === 'login' || route.name === 'register'

  if (token === null || token === undefined) {
    if (isAuthPage) {
      return
    } else {
      return redirect('/login')
    }
  } else {
    if (isAuthPage) {
      return redirect('/')
    } else {
      store.dispatch('auth/setToken', token).then(() => {
        const isAuthenticated = store.state.auth.user
        if (!isAuthenticated) {
          return redirect('/login')
        }
        if (isAuthenticated && isAuthPage) {
          return redirect('/')
        }
      })
    }
  }
}
