export default function ({ store, redirect, route }) {
  const token = localStorage.getItem('authToken')
  const isAuthPage = route.name === 'login' || route.name === 'register'
  const isAuthenticated = !store.state.auth.user

  if (token === null && !isAuthPage) {
    return redirect('/login')
  }
  if (token === null && isAuthPage) return
  if (token !== null && !isAuthPage) {
    store.dispatch('auth/setToken', token).then(() => {
      if (!isAuthenticated) {
        return redirect('/login')
      }
      if (isAuthenticated && isAuthPage) {
        return redirect('/')
      }
    })
  }
  if (token !== null && isAuthPage) {
    return redirect('/')
  }
}
