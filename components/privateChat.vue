<template>
  <c-dropup
    classContent="justify-content-between"
    :closeIcon="true"
    :mobile="activeComponent === 'private-chat'"
    :open="open"
    @closeChat="closeChat"
    @scrollToBottom="scrollToBottom"
  >
    <template slot="title">
      <span>{{ user.username }} </span>
    </template>
    <div id="scroll" class="overflow-auto p-1">
      <div class="wrapper-content-messages">
        <div
          v-for="(data, index) in messages"
          :key="index"
          :class="`wrapper-content-messages-${
            data.authorID === user._id ? 'your' : 'mine'
          }`"
        >
          <span :style="data.authorID !== user._id ? 'text-align: end' : ''"
            >{{ data.message }}
          </span>
        </div>
      </div>
    </div>
    <div class="wrapper-content-input">
      <vs-input v-model="message" v-on:keyup.enter="send" />
    </div>
  </c-dropup>
</template>

<script>
import { ChevronUpIcon, ChevronDownIcon, XIcon } from 'vue-feather-icons'

import CDropup from '~/components/common/CDropup.vue'

import deepClone from '../utilities/deepClone'

import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  components: {
    ChevronUpIcon,
    ChevronDownIcon,
    XIcon,
    CDropup,
  },
  props: ['user', 'chatID', 'chatMessages', 'open'],
  data() {
    return {
      message: null,
      messages: deepClone(this.chatMessages),
    }
  },
  mounted() {
    this.socket = this.$parent.$parent.socket
    this.socket.on('private message', (msg) => {
      if (msg.chatID === this.chatID) {
        delete msg.chatID
        delete msg.socketID

        this.messages.push(msg)

        this.setChatMessageByChatID({
          chatID: this.chatID,
          payload: msg,
        })
      }
    })
    this.scrollToBottom()
  },
  watch: {
    messages() {
      this.scrollToBottom()
    },
  },
  computed: {
    ...mapGetters({
      activeComponent: 'vuesax/activeComponent',
      activeChatIDs: 'chat/activeChatIDs',
      stateUser: 'auth/stateUser',
      connectedUsers: 'user/connectedUsers',
    }),
    targetSocketID() {
      var id = false
      if (this.connectedUsers) {
        this.connectedUsers.map((user) => {
          if (user.username === this.user.username) {
            id = user.socketID
          }
        })
        return id
      }
    },
  },
  methods: {
    ...mapMutations({
      setActiveChatIDs: 'chat/setActiveChatIDs',
      setChatMessageByChatID: 'chat/setChatMessageByChatID',
    }),
    ...mapActions({ sendMessage: 'chat/sendMessage' }),
    async send() {
      const payload = {
        chatID: this.chatID,
        authorID: this.stateUser._id,
        message: this.message,
      }
      await this.sendMessage(payload)

      payload.createdAt = new Date()

      if (this.targetSocketID) {
        payload.socketID = this.targetSocketID
        this.socket.emit('private message', payload)
      }

      delete payload.chatID
      delete payload.socketID

      this.messages.push(payload)

      this.setChatMessageByChatID({
        chatID: this.chatID,
        payload,
      })

      this.message = ''
    },
    scrollToBottom() {
      const element = document.getElementById('scroll')

      element ? (element.scrollTop = element.scrollHeight) : null
    },
    closeChat() {
      const activeChatIDs = deepClone(this.activeChatIDs)

      activeChatIDs.map((chatID, index) => {
        chatID === this.chatID ? activeChatIDs.splice(index, 1) : null
      })

      this.setActiveChatIDs(activeChatIDs)
    },
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 300px;
  &-content-messages {
    &-your {
      width: 100%;
      display: flex;
      align-items: center;
    }
    &-mine {
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
