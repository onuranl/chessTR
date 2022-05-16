export default async function ({ store, redirect, route }) {
  const token = localStorage.getItem('authToken')
  const isAuthPage = route.name === 'login' || route.name === 'register'

  if (token === null) {
    if (isAuthPage) {
      return
    } else {
      return redirect('/login')
    }
  } else {
    if (isAuthPage) {
      return redirect('/')
    } else {
      await store.dispatch('auth/setToken', token).then(() => {
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
