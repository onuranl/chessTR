<template>
  <div>
    <NavBar />
    <Theme />
    <Nuxt
      v-if="socket"
      class="d-flex justify-content-center align-items-center"
    />
    <div class="connected_users" v-if="connectedUsers">
      Online Users: {{ connectedUsers.length }}
    </div>
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
    if (!this.socket) {
      this.socket = this.$nuxtSocket({
        channel: '/',
      })
    }
    this.socket.on('connectedUsers', async (data) => {
      if (data) {
        this.setConnectedUsers(data)
      }
    })
  },
  watch: {
    stateUser: {
      immediate: true,
      handler(newVal, oldVal) {
        if (!oldVal && newVal) {
          if (!this.socket) {
            this.socket = this.$nuxtSocket({
              channel: '/',
            })
          }
          this.socket.emit('connection', newVal)
        }
      },
    },
  },
  computed: {
    ...mapGetters({
      stateUser: 'auth/stateUser',
      connectedUsers: 'user/connectedUsers',
    }),
  },
  methods: {
    ...mapMutations({
      setConnectedUsers: 'user/setConnectedUsers',
    }),
  },
}
</script>

<style lang="scss" scoped>
.connected_users {
  position: absolute;
  right: 10px;
  bottom: 10px;
  color: white;
}
</style>
