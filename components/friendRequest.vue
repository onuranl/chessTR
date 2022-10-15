<template>
  <c-alert :classContent="classContent" :status="request.status">
    <template slot="title">
      Arkadaşlık isteği
      <small> ( {{ request.status }} ) </small>
    </template>
    <div class="d-flex" v-if="isRequestToMe">
      <span class="mr-2">
        {{ request.from.username }} tarafından
        {{ $moment(request.createdAt).locale('tr').fromNow() }} gönderildi
      </span>
      <div class="d-flex" v-if="request.status === 'pending'">
        <vs-button
          icon
          danger
          animation-type="rotate"
          @click="completeRequest('declined')"
        >
          <x-icon size="1.5x" />
          <template #animate>
            <x-icon size="1.5x" />
          </template>
        </vs-button>
        <vs-button
          icon
          success
          animation-type="rotate"
          @click="completeRequest('accepted')"
        >
          <check-icon size="1.5x" />
          <template #animate>
            <check-icon size="1.5x" />
          </template>
        </vs-button>
      </div>
    </div>
    <div v-else>
      {{ request.to.username }} kullanıcısına
      {{ $moment(request.createdAt).locale('tr').fromNow() }} gönderdin
    </div>
  </c-alert>
</template>

<script>
import CAlert from './common/CAlert.vue'

import { XIcon, CheckIcon } from 'vue-feather-icons'

import { mapGetters, mapActions } from 'vuex'

export default {
  components: { CAlert, XIcon, CheckIcon },
  props: ['request', 'classContent'],
  data() {
    return {
      socket: null,
    }
  },
  mounted() {
    this.socket = this.$parent.$parent.$parent.$parent.socket
  },
  computed: {
    ...mapGetters({
      connectedUsers: 'user/connectedUsers',
      stateUser: 'auth/stateUser',
    }),
    isRequestToMe() {
      return this.request.to._id === this.stateUser._id
    },
  },
  methods: {
    ...mapActions({
      updateFriendshipRequest: 'request/updateFriendshipRequest',
    }),
    async completeRequest(status) {
      const payload = {
        id: this.request._id,
        status,
      }

      await this.updateFriendshipRequest(payload)

      if (this.targetSocketID()) {
        this.socket.emit('friendship', {
          socketID: this.targetSocketID(),
          status,
          user: this.request.to.username,
        })
      }
    },
    targetSocketID() {
      var id = false
      if (this.connectedUsers) {
        this.connectedUsers.map((user) => {
          if (user.userID === this.request.from._id) {
            id = user.socketID
          }
        })
        return id
      }
    },
  },
}
</script>
