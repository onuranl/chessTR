<template>
  <c-dropup
    :mobile="activeComponent === 'users'"
    @updateSearchInput="(val) => (searchInput = val)"
  >
    <template slot="title">
      <span v-html="traslations.Default.Users.toLowerCase()" />
    </template>

    <div
      class="d-flex align-items-center"
      v-for="user in connectedUsers.filter((user) =>
        user.username.includes(searchInput)
      )"
      :key="user.userID"
    >
      <span class="dot bg-success" style="height: 15px; width: 15px" />
      <nuxt-link :to="'/' + user.username" class="ml-2 text-white">{{
        user.username
      }}</nuxt-link>
    </div>

    <div
      class="d-flex align-items-center"
      v-for="user in exceptOnlineUsers"
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
import { mapGetters } from 'vuex'

import deepClone from '../../utilities/deepClone'

import CDropup from '~/components/common/CDropup.vue'

export default {
  name: 'users',
  components: { CDropup },
  data() {
    return {
      users: null,
      searchInput: '',
    }
  },
  async created() {
    try {
      const response = await this.$axios.get('user/all')

      this.users = response.data.user
    } catch (error) {
      this.$vs.notification({
        progress: 'auto',
        color: 'danger',
        position: 'top-right',
        title: 'error',
        text: error.response.data.error,
      })
    }
  },
  computed: {
    ...mapGetters({
      activeComponent: 'vuesax/activeComponent',
      traslations: 'lang/traslations',
      connectedUsers: 'user/connectedUsers',
    }),
    exceptOnlineUsers() {
      if (this.connectedUsers && this.users) {
        const users = deepClone(this.users)

        this.connectedUsers.map((user) => {
          const index = users.map((e) => e._id).indexOf(user.userID)

          if (index > -1) {
            users.splice(index, 1)
          }
        })
        return users.filter((user) => user.username.includes(this.searchInput))
      }
    },
  },
}
</script>
