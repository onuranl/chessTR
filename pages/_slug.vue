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
            <div class="userActions-mobile">
              <div class="d-flex h1 margin-top">
                <vs-button icon color="discord">
                  <user-plus-icon size="1.5x"></user-plus-icon>
                </vs-button>
                <vs-button icon color="discord">
                  <message-circle-icon size="1.5x"></message-circle-icon>
                </vs-button>
              </div>
            </div>
            <div class="socialMedias-mobile">
              <div class="d-flex h1 margin-top">
                <vs-button href="http://vuesax.com/" blank icon color="twitter">
                  <twitter-icon size="1.5x"></twitter-icon>
                </vs-button>
                <vs-button
                  href="http://vuesax.com/"
                  blank
                  icon
                  color="linkedin"
                >
                  <linkedin-icon size="1.5x"></linkedin-icon>
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
              >{{ $moment(user.Active).fromNow() }}
            </span>
          </p>
          <div class="socialMedias">
            <div class="d-flex">
              <vs-button href="http://vuesax.com/" blank icon color="twitter">
                <twitter-icon size="1.5x"></twitter-icon>
              </vs-button>
              <vs-button href="http://vuesax.com/" blank icon color="linkedin">
                <linkedin-icon size="1.5x"></linkedin-icon>
              </vs-button>
              <vs-button href="http://vuesax.com/" blank icon color="tumblr">
                <github-icon size="1.5x"></github-icon>
              </vs-button>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="userActions">
            <div class="d-flex h1 margin-top">
              <vs-button icon color="discord">
                <user-plus-icon size="1.5x"></user-plus-icon>
              </vs-button>
              <vs-button icon color="discord">
                <message-circle-icon size="1.5x"></message-circle-icon>
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

import { mapGetters } from 'vuex'

export default {
  name: 'profile',
  components: {
    TwitterIcon,
    LinkedinIcon,
    GithubIcon,
    UserPlusIcon,
    MessageCircleIcon,
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
  computed: {
    ...mapGetters({
      connectedUsers: 'user/connectedUsers',
    }),
    isUserOnline() {
      return this.connectedUsers && this.user
        ? this.connectedUsers.map((e) => e.userID).indexOf(this.user._id) > -1
        : false
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
