<template>
  <div v-if="socket && stateUser && traslations">
    <NavBar />
    <div class="config">
      <Translate />
      <Theme />
    </div>
    <Nuxt class="d-flex justify-content-center align-items-center mt-4" />
    <div class="bottom_content">
      <Chats />
      <Messages />
      <Friends />
      <Users />
    </div>
  </div>
</template>

<script>
import NavBar from './components/navbar.vue'
import Translate from './components/translate.vue'
import Theme from './components/theme.vue'
import Chats from './components/chats.vue'
import Messages from './components/messages.vue'
import Friends from './components/friends.vue'
import Users from './components/users.vue'

import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  components: {
    NavBar,
    Translate,
    Theme,
    Chats,
    Messages,
    Friends,
    Users,
  },
  data() {
    return {
      socket: null,
    }
  },
  created() {
    this.getTranslations()
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
      traslations: 'lang/traslations',
      stateUser: 'auth/stateUser',
      connectedUsers: 'user/connectedUsers',
    }),
  },
  methods: {
    ...mapMutations({
      setConnectedUsers: 'user/setConnectedUsers',
    }),
    ...mapActions({
      getTranslations: 'lang/getTranslations',
    }),
  },
}
</script>

<style lang="scss" scoped>
.config {
  z-index: 99001;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  background: #1e2023;
  border: 0;
  border-radius: 0 20px 0 0;
  outline: none;
  padding: 15px;
  padding-bottom: 0px;
}

.bottom_content {
  position: fixed;
  right: 15px;
  bottom: 15px;
  color: white;
  display: flex;
  align-items: flex-end;
  *:not(:last-child) {
    margin-right: 15px;
  }
}
</style>
