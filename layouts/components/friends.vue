<template>
  <c-dropup>
    <template slot="title">
      <span>friends</span>
    </template>

    <div
      class="d-flex align-items-center"
      v-for="user in friends.connectedFriends"
      :key="user.userID"
    >
      <span class="dot bg-success" style="height: 15px; width: 15px" />
      <nuxt-link :to="user.username" class="ml-2 text-white">{{
        user.username
      }}</nuxt-link>
    </div>

    <div
      class="d-flex align-items-center"
      v-for="user in friends.exceptOnlineFriends"
      :key="user._id"
    >
      <span class="dot" style="height: 15px; width: 15px" />
      <nuxt-link :to="user.username" class="ml-2 text-white">{{
        user.username
      }}</nuxt-link>
    </div>
  </c-dropup>
</template>

<script>
import CDropup from '~/components/common/CDropup.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'friends',
  components: { CDropup },
  computed: {
    ...mapGetters({
      stateUser: 'auth/stateUser',
      connectedUsers: 'user/connectedUsers',
    }),
    friends() {
      const connectedFriends = []
      const exceptOnlineFriends = []

      this.stateUser.friends?.map((friend) => {
        this.connectedUsers?.map((connectedUser) => {
          if (friend._id === connectedUser.userID) {
            connectedFriends.push(friend)
          } else {
            exceptOnlineFriends.push(friend)
          }
        })
      })

      return {
        connectedFriends,
        exceptOnlineFriends,
      }
    },
  },
}
</script>
