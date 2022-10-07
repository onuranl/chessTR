<template>
  <c-dropup>
    <template slot="title">
      <span>messages</span>
    </template>
    <div v-for="chat in chats" :key="chat._id">
      <div
        v-if="
          chat.messages.length > 0 && activeChatIDs.includes(chat._id) === false
        "
        class="cursor-pointer"
        @click="setActiveChatIDs(chat._id)"
      >
        <small>{{ to(chat.users).username }} </small>
        <p>{{ chat.messages[chat.messages.length - 1].message }}</p>
      </div>
    </div>
  </c-dropup>
</template>

<script>
import CDropup from '~/components/common/CDropup.vue'

import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'messages',
  props: ['currentUserID'],
  components: { CDropup },
  computed: {
    ...mapGetters({
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
        return user.id !== this.currentUserID
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
