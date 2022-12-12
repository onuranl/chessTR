<template>
  <c-dropup
    v-if="chats"
    :mobile="activeComponent === 'messages'"
    @updateSearchInput="(val) => (searchInput = val)"
  >
    <template slot="title">
      <span v-html="traslations.Default.Messages.toLowerCase()" />
    </template>
    <div
      v-for="chat in chats.filter((chat) =>
        to(chat.users).username.includes(searchInput)
      )"
      :key="chat._id"
    >
      <div
        v-if="
          chat.messages.length > 0 && activeChatIDs.includes(chat._id) === false
        "
        class="cursor-pointer"
        @click="setActiveChatIDs(chat._id)"
      >
        <small v-html="to(chat.users).username" />
        <p v-html="chat.messages[chat.messages.length - 1].message" />
      </div>
    </div>
  </c-dropup>
</template>

<script>
import CDropup from '~/components/common/CDropup.vue'

import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'messages',
  components: { CDropup },
  data: () => ({
    searchInput: '',
  }),
  computed: {
    ...mapGetters({
      activeComponent: 'vuesax/activeComponent',
      traslations: 'lang/traslations',
      stateUser: 'auth/stateUser',
      activeChatIDs: 'chat/activeChatIDs',
      chats: 'chat/chats',
    }),
  },
  methods: {
    ...mapMutations({
      setActiveChatIDs: 'chat/setActiveChatIDs',
    }),
    to(users) {
      const user = users.find((user) => {
        return user.id !== this.stateUser._id
      })
      return user
    },
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 200px;
}

p {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden !important;
}
small {
  font-weight: 500;
}
</style>
