<template>
  <c-dropup
    :mobile="activeComponent === 'friends'"
    @updateSearchInput="(val) => (searchInput = val)"
  >
    <template slot="title">
      <span v-html="traslations.Default.Friends.toLowerCase()" />
    </template>

    <div
      class="d-flex align-items-center"
      v-for="user in friends.connectedFriends"
      :key="user.userID"
    >
      <span class="dot bg-success" style="height: 15px; width: 15px" />
      <nuxt-link :to="'/' + user.username" class="ml-2 text-white">{{
        user.username
      }}</nuxt-link>
    </div>

    <div
      class="d-flex align-items-center"
      v-for="user in friends.exceptOnlineFriends"
      :key="user._id"
    >
      <span class="dot" style="height: 15px; width: 15px" />
      <nuxt-link :to="'/' + user.username" class="ml-2 text-white">{{
        user.username
      }}</nuxt-link>
    </div>
  </c-dropup>
</template>

<script>
import CDropup from '~/components/common/CDropup.vue'

import deepClone from '../../utilities/deepClone'

import { mapGetters } from 'vuex'

export default {
  name: 'friends',
  components: { CDropup },
  data: () => ({
    searchInput: '',
  }),
  computed: {
    ...mapGetters({
      activeComponent: 'vuesax/activeComponent',
      traslations: 'lang/traslations',
      stateUser: 'auth/stateUser',
      connectedUsers: 'user/connectedUsers',
    }),
    friends() {
      const connectedFriends = []
      const exceptOnlineFriends = deepClone(this.stateUser.friends)

      exceptOnlineFriends?.map((friend, index) => {
        this.connectedUsers?.map((connectedUser) => {
          if (friend._id === connectedUser.userID) {
            connectedFriends.push(friend)

            exceptOnlineFriends.splice(index, 1)
          }
        })
      })

      return {
        connectedFriends: connectedFriends.filter((user) =>
          user.username.includes(this.searchInput)
        ),
        exceptOnlineFriends: exceptOnlineFriends.filter((user) =>
          user.username.includes(this.searchInput)
        ),
      }
    },
  },
}
</script>
