<template>
  <div class="activeChats" v-if="activeChats">
    <private-chat
      v-for="chat in activeChats"
      :key="chat._id"
      :user="to(chat.users)"
      :chatID="chat._id"
      :chatMessages="chat.messages"
      :open="open"
    />
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'chats',
  data() {
    return {
      open: false,
    }
  },
  async fetch() {
    await this.getChats(this.currentUserID)
    if (this.$cookies.get('activeChatIDs')) {
      this.setActiveChatIDs(this.$cookies.get('activeChatIDs'))
    }
  },
  watch: {
    activeChatIDs(newVal, oldVal) {
      oldVal.length === 0 ? (this.open = false) : (this.open = true)
    },
  },
  computed: {
    ...mapGetters({
      stateUser: 'auth/stateUser',
      activeChats: 'chat/activeChats',
      activeChatIDs: 'chat/activeChatIDs',
    }),
    currentUserID() {
      return this.stateUser._id
    },
  },
  methods: {
    ...mapMutations({
      setActiveChatIDs: 'chat/setActiveChatIDs',
    }),
    ...mapActions({
      getChats: 'chat/getChats',
    }),
    to(users) {
      const user = users.find((user) => {
        return user.id !== this.currentUserID
      })
      return user
    },
  },
}
</script>

<style lang="scss" scoped>
.activeChats {
  display: flex;
  align-items: flex-end;
  *:not(:last-child) {
    margin-right: 15px;
  }
}
</style>
