<template>
  <div>
    <div class="profile text-secondary">
      <div class="row">
        <div class="col-lg-6">
          <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center">
              <span
                class="dot mr-2 mt-1"
                :class="{ 'bg-success': isUserOnline }"
              />
              <h1 class="text-white">{{ user.username }}</h1>
            </div>
            <div
              class="userActions-mobile"
              :class="{ invisible: stateUser.username === $route.params.slug }"
            >
              <div class="d-flex h1 margin-top">
                <vs-button
                  v-if="!isUserMyFriend(stateUser.friends, user._id)"
                  @click="sendRequest(user._id)"
                  icon
                  color="discord"
                >
                  <user-plus-icon size="1.5x" />
                </vs-button>
                <vs-button @click="sendMessage" icon color="discord">
                  <message-circle-icon size="1.5x" />
                </vs-button>
              </div>
            </div>
            <div class="socialMedias-mobile">
              <div class="d-flex h1 margin-top">
                <vs-button href="http://vuesax.com/" blank icon color="twitter">
                  <twitter-icon size="1.5x" />
                </vs-button>
                <vs-button
                  href="http://vuesax.com/"
                  blank
                  icon
                  color="linkedin"
                >
                  <linkedin-icon size="1.5x" />
                </vs-button>
                <vs-button href="http://vuesax.com/" blank icon color="tumblr">
                  <github-icon size="1.5x"></github-icon>
                </vs-button>
              </div>
            </div>
          </div>
          <p>
            Member since
            <span class="text-white">{{
              $moment(user.createdAt).format('ll')
            }}</span>
          </p>
          <p>
            Active
            <span class="text-white"
              >{{ $moment(user.active).locale('tr').fromNow() }}
            </span>
          </p>
          <div class="socialMedias">
            <div class="d-flex">
              <vs-button href="http://vuesax.com/" blank icon color="twitter">
                <twitter-icon size="1.5x" />
              </vs-button>
              <vs-button href="http://vuesax.com/" blank icon color="linkedin">
                <linkedin-icon size="1.5x" />
              </vs-button>
              <vs-button href="http://vuesax.com/" blank icon color="tumblr">
                <github-icon size="1.5x" />
              </vs-button>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div
            class="userActions"
            :class="{ invisible: stateUser.username === $route.params.slug }"
          >
            <div class="d-flex h1 margin-top">
              <vs-button
                v-if="!isUserMyFriend(stateUser.friends, user._id)"
                @click="sendRequest(user._id)"
                icon
                color="discord"
              >
                <user-plus-icon size="1.5x" />
              </vs-button>
              <vs-button @click="sendMessage" icon color="discord">
                <message-circle-icon size="1.5x" />
              </vs-button>
            </div>
          </div>
          <p>
            Rating <span class="text-white">{{ user.rating }}</span>
          </p>
          <p>Total Match <span class="text-white">1231</span></p>
          <div class="d-flex justify-content-between">
            <p>Win <span class="text-success ml-2">3</span></p>
            <p>Draw <span class="text-primary ml-2">3</span></p>
            <p>Lose <span class="text-danger ml-2">3</span></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  TwitterIcon,
  LinkedinIcon,
  GithubIcon,
  UserPlusIcon,
  MessageCircleIcon,
} from 'vue-feather-icons'

import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'profile',
  components: {
    TwitterIcon,
    LinkedinIcon,
    GithubIcon,
    UserPlusIcon,
    MessageCircleIcon,
  },
  data() {
    return {
      socket: null,
    }
  },
  async asyncData({ $axios, app, route }) {
    const loading = app.router.app.$vs.loading()

    try {
      const username = route.params.slug

      const response = await $axios.$get(`user/${username}`)

      loading.close()

      return { user: response.user }
    } catch (error) {
      app.router.app.$vs.notification({
        progress: 'auto',
        color: 'danger',
        position: 'top-right',
        title: 'error',
        text: error.response.data.error,
      })

      loading.close()

      app.router.push('/')
    }
  },
  mounted() {
    this.socket = this.$parent.$parent.socket
  },
  computed: {
    ...mapGetters({
      stateUser: 'auth/stateUser',
      chats: 'chat/chats',
      activeChats: 'chat/activeChats',
      connectedUsers: 'user/connectedUsers',
      isUserMyFriend: 'user/isUserMyFriend',
    }),
    isUserOnline() {
      return this.connectedUsers && this.user
        ? this.connectedUsers.map((e) => e.userID).indexOf(this.user._id) > -1
        : false
    },
  },
  methods: {
    ...mapActions({
      startChat: 'chat/startChat',
      getFriendshipRequests: 'request/getFriendshipRequests',
      sendFriendshipRequest: 'request/sendFriendshipRequest',
    }),
    ...mapMutations({
      setActiveChatIDs: 'chat/setActiveChatIDs',
    }),
    async sendMessage() {
      const users = [this.stateUser._id, this.user._id]
      if (this.chats) {
        for (const chat of this.chats) {
          const chatUsers = []

          chat.users.map((user) => {
            chatUsers.push(user._id)
          })

          const isEqual = this.checkArrays(chatUsers, users)

          if (isEqual) {
            for (const activeChat of this.activeChats) {
              const activeChatUsers = []

              activeChat.users.map((user) => {
                activeChatUsers.push(user._id)
              })

              if (this.checkArrays(activeChatUsers, users)) return
            }
            return this.setActiveChatIDs(chat._id)
          }
        }
      }
      await this.startChat(users)
    },
    async sendRequest(userID) {
      const request = await this.sendFriendshipRequest(userID)

      if (request.status === 200 && this.targetSocketID(request.data.to)) {
        this.socket.emit('friendship', {
          socketID: this.targetSocketID(request.data.to),
        })
      }
    },
    targetSocketID(to) {
      var id = false
      if (this.connectedUsers) {
        this.connectedUsers.map((user) => {
          if (user.userID === to) {
            id = user.socketID
          }
        })
      }
      return id
    },
    checkArrays(arrA, arrB) {
      if (arrA.length !== arrB.length) return false

      var cA = arrA.slice().sort().join(',')
      var cB = arrB.slice().sort().join(',')

      return cA === cB
    },
  },
}
</script>

<style lang="scss" scoped>
.profile {
  background: #262421;
  box-shadow: 0 2px 2px 0rgba (0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  border-radius: 3px;
  padding: 36px;
  margin: 0px 30px;
  width: 550px;
}

.margin-top {
  margin-top: 0.15rem !important;
}

.userActions-mobile {
  display: none;
}

.socialMedias-mobile {
  display: none;
}

@media only screen and (max-width: 992px) {
  .userActions {
    display: none;
  }
  .socialMedias {
    display: none;
  }
  .userActions-mobile {
    display: block;
  }
  .socialMedias-mobile {
    display: block;
  }
}
</style>
