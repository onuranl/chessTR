<template>
  <div ref="button" class="content" @click="open = true">
    <vs-button icon color="danger" border :active="open">
      <bell-icon size="1x" />
    </vs-button>
    <div
      v-if="open"
      class="notifications"
      v-closableNoti="{
        exclude: ['button'],
        handler: 'onClose',
      }"
    >
      <div
        v-if="friendshipRequests && friendshipRequests.length > 0"
        class="w-100 overflow-auto"
        :class="{ 'pr-1': friendshipRequests.length > 3 }"
      >
        <friend-request
          v-for="(request, index) in friendshipRequests"
          :key="request._id"
          :request="request"
          :classContent="index + 1 == friendshipRequests.length ? ' mb-0' : ''"
        />
      </div>
      <div
        v-else
        class="w-100 text-center"
        v-html="traslations.Notification.NotFound"
      />
    </div>
    <span class="badge" v-if="pendingRequest" v-html="pendingRequest.length" />
  </div>
</template>

<script>
import { BellIcon } from 'vue-feather-icons'

import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  components: {
    BellIcon,
  },
  data() {
    return {
      open: false,
    }
  },
  async fetch() {
    await this.getFriendshipRequests()
  },
  mounted() {
    this.socket = this.$parent.$parent.$parent.socket
    this.socket.on('friendship', async (data) => {
      if (data.status && data.status === 'accepted') {
        const notification = {
          color: 'success',
          title: this.traslations.Notification.RequestAccepted,
          text: this.traslations.Notification.FriendsNow(data.user),
        }

        this.openNotification(notification)
      }
      await this.getFriendshipRequests()
    })
  },
  computed: {
    ...mapGetters({
      traslations: 'lang/traslations',
      stateUser: 'auth/stateUser',
      friendshipRequests: 'request/friendshipRequests',
    }),
    pendingRequest() {
      return this.friendshipRequests?.filter(
        (request) =>
          request.status === 'pending' && request.to._id === this.stateUser._id
      )
    },
  },
  methods: {
    ...mapActions({
      getFriendshipRequests: 'request/getFriendshipRequests',
    }),
    ...mapMutations({
      openNotification: 'vuesax/openNotification',
    }),
    onClose() {
      this.open = false
    },
  },
}
</script>

<style lang="scss" scoped>
.content {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
}

.notifications {
  min-width: 315px;
  max-height: 350px;
  position: absolute;
  top: 55px;
  background: rgba(var(--vs-color), 1);
  border-radius: 15px;
  padding: 1rem 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  transition: all 0.25s ease;
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 23%);
}

.badge {
  position: absolute;
  border-radius: 100%;
  background: red;
  color: white;
  z-index: 2;
  top: 0;
}
</style>
