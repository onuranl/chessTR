<template>
  <div>
    <NavBar v-if="!isAuthPage" />
    <Theme />
    <Nuxt
      v-if="socket"
      class="d-flex justify-content-center align-items-center"
    />
    <!-- <div class="online_users" v-if="onlineUsers">
      Online Users: {{ onlineUsers }}
    </div> -->
  </div>
</template>

<script>
import Theme from './components/theme.vue'
import NavBar from './components/navbar.vue'

import { mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    Theme,
    NavBar,
  },
  data() {
    return {
      socket: null,
    }
  },
  mounted() {
    this.socket = this.$nuxtSocket({
      channel: '/',
    })
    this.socket.on('onlineUsers', async (data) => {
      console.log('triggered')
      if (data) {
        const onlineUsers = Object.values(data)
        this.setOnlineUsers(onlineUsers)
      }
    })
  },
  computed: {
    ...mapGetters({
      onlineUsers: 'user/onlineUsers',
    }),
    isAuthPage() {
      const name = this.$route.name
      if (name === 'login' || name === 'register') {
        return true
      } else {
        return false
      }
    },
  },
  methods: {
    ...mapMutations({
      setOnlineUsers: 'user/setOnlineUsers',
    }),
  },
}
</script>

<style lang="scss" scoped>
.online_users {
  position: absolute;
  right: 10px;
  bottom: 10px;
  color: white;
}
</style>
