<template>
  <c-dropup classContent="justify-content-between" :closeIcon="true">
    <template slot="title">
      <span>{{ username }} </span>
    </template>
    <div class="overflow-auto p-1">
      <div class="wrapper-content-messages">
        <div class="wrapper-content-messages-mine">
          <span>asdasdsad</span>
        </div>
        <div class="wrapper-content-messages-your">
          <span style="text-align: end">asdasdsad</span>
        </div>
        <div class="wrapper-content-messages-your">
          <span style="text-align: end">asdasdsad</span>
        </div>
        <div class="wrapper-content-messages-your">
          <span style="text-align: end">asdasdsad</span>
        </div>
        <div class="wrapper-content-messages-your">
          <span style="text-align: end">asdasdsad</span>
        </div>
        <div class="wrapper-content-messages-your">
          <span style="text-align: end">asdasdsad</span>
        </div>
      </div>
    </div>
    <div class="wrapper-content-input">
      <vs-input v-model="message" v-on:keyup.enter="sendMessage" />
    </div>
  </c-dropup>
</template>

<script>
import { ChevronUpIcon, ChevronDownIcon, XIcon } from 'vue-feather-icons'

import CDropup from '~/components/common/CDropup.vue'

import { mapGetters } from 'vuex'

export default {
  components: {
    ChevronUpIcon,
    ChevronDownIcon,
    XIcon,
    CDropup,
  },
  props: ['username'],
  data() {
    return {
      open: false,
      message: null,
    }
  },
  mounted() {
    this.socket = this.$parent.$parent.socket
    this.socket.on('private message', (msg) => {
      console.log({ msg })
    })
  },
  computed: {
    ...mapGetters({
      connectedUsers: 'user/connectedUsers',
    }),
    targetSocketID() {
      var id = false
      if (this.connectedUsers) {
        this.connectedUsers.map((user) => {
          if (user.username === this.username) {
            id = user.socketID
          }
        })
        return id
      }
    },
  },
  methods: {
    sendMessage() {
      if (this.targetSocketID) {
        this.socket.emit('private message', {
          socketID: this.targetSocketID,
          message: this.message,
        })
        this.message = ''
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 300px;
  &-content-messages {
    &-mine {
      width: 100%;
      display: flex;
      align-items: center;
    }
    &-your {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
    span {
      width: 40%;
      word-break: break-word;
    }
  }
}
</style>

<style lang="scss">
.wrapper-content-input {
  .vs-input {
    width: 100%;
  }
}
</style>
