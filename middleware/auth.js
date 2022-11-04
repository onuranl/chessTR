export default function ({ app, store, redirect, route }) {
  const token = app.$cookies.get('authToken')

  const authPages = ['login', 'register']
  const allowedPages = ['index', 'create', 'rooms']

  const isAuthPage = authPages.includes(route.name)
  const isAllowedPage = allowedPages.includes(route.name)

  if (!token) {
    if (isAuthPage || isAllowedPage) return

    return redirect('/login')
  }

  if (isAuthPage) return redirect('/')

  store.dispatch('auth/setToken', token).then(() => {
    const isAuthenticated = store.state.auth.user

    if (!isAuthenticated) return redirect('/login')

    if (isAuthenticated && isAuthPage) return redirect('/')
  })
}
