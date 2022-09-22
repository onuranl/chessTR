<template>
  <div>
    <div class="profile text-secondary">
      <div class="row">
        <div class="col-lg-6">
          <h1 class="text-white">{{ user.username }}</h1>
        </div>
        <div class="col-lg-6">{{ user }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'profile',
  async asyncData({ $axios, app, route }) {
    const loading = app.router.app.$vs.loading()

    try {
      const username = route.params.slug

      const response = await $axios.$get(`user/${username}`)

      loading.close()

      return { user: response.user }
    } catch (error) {
      app.router.app.$vs.notification({
        progress: 'auto',
        color: 'danger',
        position: 'top-right',
        title: 'error',
        text: error.response.data.error,
      })

      loading.close()

      app.router.push('/')
    }
  },
}
</script>

<style lang="scss" scoped>
.profile {
  background: #262421;
  box-shadow: 0 2px 2px 0rgba (0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  border-radius: 3px;
  padding: 36px;
}
</style>
