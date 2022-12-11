<template>
  <div class="content" :class="{ invisible: activeComponent }">
    <vs-navbar
      class="position-relative mb-3"
      center-collapsed
      fixed
      v-model="active"
    >
      <template #left>
        <div v-if="clientWidth < 1068">
          <menu-icon
            size="1.5x"
            @click="$refs.sidebar._data.activeSidebar = true"
          />
        </div>
        <div
          v-else
          class="logo"
          style="background: url(/icon.png) no-repeat center center"
          type="button"
          @click="
            $router.push('/')
            active = 'index'
          "
        />
      </template>
      <template class="center">
        <vs-navbar-item
          ref="index"
          :active="active == 'index'"
          class="index"
          id="index"
          to="/"
          v-html="traslations.Navbar.Home"
        />
        <vs-navbar-item
          :active="active == 'create'"
          id="create"
          class="create"
          to="/create"
          v-html="traslations.Navbar.CreateRoom"
        />
        <vs-navbar-item
          :active="active == 'rooms'"
          id="rooms"
          class="rooms"
          to="/rooms"
          v-html="traslations.Navbar.WarRooms"
        />
        <vs-navbar-item
          v-if="isAuthenticated"
          :active="active == 'chart-actives'"
          id="chart-actives"
          class="chart-actives"
          to="/chart/actives"
          v-html="traslations.Navbar.ActiveMatches"
        />
      </template>
      <template #right>
        <div class="d-flex p-0" v-if="!isAuthenticated">
          <vs-button flat @click="$router.push('/login')"
            >{{ traslations.Navbar.Login }}
          </vs-button>
          <vs-button @click="$router.push('/register')"
            >{{ traslations.Navbar.GetStarted }}
          </vs-button>
        </div>
        <div v-else class="d-flex align-items-center p-0">
          <notifications />
          <userMenu :username="stateUser.username" />
        </div>
      </template>
    </vs-navbar>
    <SideBar ref="sidebar" />
  </div>
</template>

<script>
import { MenuIcon } from 'vue-feather-icons'

import SideBar from './sidebar.vue'
import userMenu from '../../components/userMenu.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'Navbar',
  data: () => ({
    active: 'index',
    mainPages: ['index', 'create', 'rooms', 'chart-actives'],
  }),
  components: {
    MenuIcon,
    SideBar,
    userMenu,
  },
  created() {
    this.active = this.$route.name
  },
  watch: {
    lang() {
      this.reDesingTab()
    },
    isAuthenticated() {
      this.reDesingTab()
    },
    clientWidth(val) {
      if (val >= 1068 && this.$refs.sidebar._data.activeSidebar)
        this.$refs.sidebar._data.activeSidebar = false
    },
  },
  computed: {
    ...mapGetters({
      clientWidth: 'vuesax/width',
      isMobile: 'vuesax/isMobile',
      activeComponent: 'vuesax/activeComponent',
      lang: 'lang/lang',
      traslations: 'lang/traslations',
      isAuthenticated: 'auth/isAuthenticated',
      stateUser: 'auth/stateUser',
    }),
  },
  methods: {
    reDesingTab() {
      const path = this.active

      this.mainPages.includes(path)
        ? document.getElementsByClassName(path)[0]?.click()
        : null
    },
  },
}
</script>

<style scoped>
.content {
  min-height: 44px;
}
</style>

<style lang="scss">
@media only screen and (min-width: 718px) {
  .vs-navbar-content {
    .vs-navbar {
      &__left {
        width: 300px;
      }
      &__right {
        width: 300px;
      }
    }
  }
}
</style>
