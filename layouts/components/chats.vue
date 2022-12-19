<template>
  <div
    v-if="activeChats"
    class="activeChats"
    :class="{ visible: activeComponent === 'private-chat' }"
  >
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
      this.open = oldVal.length !== 0
    },
  },
  computed: {
    ...mapGetters({
      activeComponent: 'vuesax/activeComponent',
      currentUserID: 'user/currentUserID',
      activeChats: 'chat/activeChats',
      activeChatIDs: 'chat/activeChatIDs',
    }),
  },
  methods: {
    ...mapMutations({
      setActiveChatIDs: 'chat/setActiveChatIDs',
    }),
    ...mapActions({
      getChats: 'chat/getChats',
    }),
    to(users) {
      return users.find((user) => user.id !== this.currentUserID)
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
