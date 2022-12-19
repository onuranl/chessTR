<template>
  <div class="d-flex flex-column justify-content-between">
    <div v-if="chat" class="chat">
      <div v-if="chat.length === 0" class="text-center text-white mt-3">
        <p>Send message to your oppenent !</p>
      </div>
      <div
        v-else
        v-for="(messageInfo, index) in chat"
        :key="index"
        :class="
          messagesIsMine(messageInfo) ? 'mine messages' : 'yours messages'
        "
      >
        <div
          class="message"
          :class="
            (!messagesIsMine(messageInfo) && messagesIsMine(chat[index + 1])) ||
            (messagesIsMine(messageInfo) && !messagesIsMine(chat[index + 1])) ||
            index + 1 === chat.length
              ? 'last'
              : ''
          "
        >
          {{ messageInfo.message }}
        </div>
      </div>
    </div>
    <div class="wrapper-content-input">
      <vs-input v-model="message" v-on:keyup.enter="sendMessage" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      socket: null,
      chat: null,
      message: '',
    }
  },
  mounted() {
    this.socket = this.$parent.$parent.$parent.socket
    this.socket.on('chat', async (msg) => {
      if (msg) {
        this.chat = msg.chat
      }
    })
    this.getChat()
  },
  computed: {
    ...mapGetters({
      stateUser: 'auth/stateUser',
      chart: 'chart/chart',
      users: 'chart/users',
      chartID: 'chart/chartID',
    }),
  },
  methods: {
    async sendMessage() {
      let result = {
        message: this.message,
        created: new Date(),
      }

      this.socket.emit('message', result)
      this.message = ''
    },
    getChat() {
      if (this.chat === null) {
        this.chat = this.chart.chat
      }
    },
    messagesIsMine(message) {
      if (message) {
        return message.authorID === this.stateUser.id
      } else {
        return null
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.chat {
  width: 300px;
  height: 570px;
  display: flex;
  flex-direction: column;
  padding: 4px 10px;
  overflow: auto;

  @media only screen and (max-width: 625px) {
    width: 100%;
  }
}

.messages {
  display: flex;
  flex-direction: column;
}

.message {
  border-radius: 20px;
  padding: 8px 15px;
  margin-top: 3px;
  margin-bottom: 5px;
  display: inline-block;
}

.yours {
  align-items: flex-start;
}

.yours .message {
  margin-right: 25%;
  background-color: #eee;
  position: relative;
}

.yours .message.last:before {
  content: '';
  position: absolute;
  z-index: 0;
  bottom: 0;
  left: -7px;
  height: 20px;
  width: 20px;
  background: #eee;
  border-bottom-right-radius: 15px;
}
.yours .message.last:after {
  content: '';
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: -10px;
  width: 10px;
  height: 20px;
  background: #18191c;
  border-bottom-right-radius: 10px;
}

.mine {
  align-items: flex-end;
}

.mine .message {
  color: white;
  margin-left: 25%;
  background: linear-gradient(to bottom, #00d0ea 0%, #0085d1 100%);
  background-attachment: fixed;
  position: relative;
}

.mine .message.last:before {
  content: '';
  position: absolute;
  z-index: 0;
  bottom: 0;
  right: -8px;
  height: 20px;
  width: 20px;
  background: linear-gradient(to bottom, #00d0ea 0%, #0085d1 100%);
  background-attachment: fixed;
  border-bottom-left-radius: 15px;
}

.mine .message.last:after {
  content: '';
  position: absolute;
  z-index: 1;
  bottom: 0;
  right: -10px;
  width: 10px;
  height: 20px;
  background: #18191c;
  border-bottom-left-radius: 10px;
}
</style>
