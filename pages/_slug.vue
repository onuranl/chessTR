<template>
  <div v-if="user">
    <div class="profile text-secondary">
      <div class="row">
        <div class="col-lg-6">
          <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center">
              <span
                class="dot mr-2 mt-1"
                :class="{ 'bg-success': isUserOnline }"
              />
              <h1 class="text-white" v-html="user.username" />
            </div>
            <div
              class="userActions-mobile"
              :class="{ 'd-none': stateUser.username === $route.params.slug }"
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
                <vs-button
                  :href="stateUser.links[0]"
                  blank
                  icon
                  color="twitter"
                >
                  <twitter-icon size="1.5x" />
                </vs-button>
                <vs-button
                  :href="stateUser.links[1]"
                  blank
                  icon
                  color="linkedin"
                >
                  <linkedin-icon size="1.5x" />
                </vs-button>
                <vs-button :href="stateUser.links[2]" blank icon color="tumblr">
                  <github-icon size="1.5x" />
                </vs-button>
              </div>
            </div>
          </div>
          <p>
            {{ traslations.Profile.MemberSince }}
            <span class="text-white">{{
              $moment(user.createdAt).locale(lang).format('ll')
            }}</span>
          </p>
          <p>
            {{ traslations.Profile.Active }}
            <span class="text-white"
              >{{ $moment(user.active).locale(lang).fromNow() }}
            </span>
          </p>
          <div class="socialMedias">
            <div class="d-flex">
              <vs-button :href="stateUser.links[0]" blank icon color="twitter">
                <twitter-icon size="1.5x" />
              </vs-button>
              <vs-button :href="stateUser.links[1]" blank icon color="linkedin">
                <linkedin-icon size="1.5x" />
              </vs-button>
              <vs-button :href="stateUser.links[2]" blank icon color="tumblr">
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
            {{ traslations.Profile.Rating }}
            <span class="text-white" v-html="user.rating" />
          </p>
          <p>
            {{ traslations.Profile.TotalMatch }}
            <span class="text-white" v-html="user.matches" />
          </p>
          <div class="d-flex justify-content-between">
            <p>
              {{ traslations.Profile.Win }}
              <span class="text-success ml-2" v-html="user.win" />
            </p>
            <p>
              {{ traslations.Profile.Draw }}
              <span class="text-primary ml-2" v-html="user.draw" />
            </p>
            <p>
              {{ traslations.Profile.Lose }}
              <span class="text-danger ml-2" v-html="user.lose" />
            </p>
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
      user: null,
    }
  },
  async fetch() {
    const loading = this.$vs.loading()
    try {
      const username = this.$route.params.slug

      const response = await this.$axios.$get(`user/${username}`)

      loading.close()

      this.user = response.user
    } catch (error) {
      this.openNotification({ text: error.response.data.error })

      this.$router.push('/')
    }
  },
  mounted() {
    this.socket = this.$parent.$parent.socket
  },
  computed: {
    ...mapGetters({
      lang: 'lang/lang',
      traslations: 'lang/traslations',
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
      openNotification: 'vuesax/openNotification',
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

@media only screen and (max-width: 478px) {
  .profile {
    padding: 24px;
  }

  .socialMedias-mobile {
    margin-left: 10px;
  }
}
</style>
