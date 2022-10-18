<template>
  <div>
    <vs-navbar class="position-relative mb-3" center-collapsed v-model="active">
      <template #left>
        <div v-if="clientWidth < 690">
          <menu-icon
            size="1.5x"
            class="custom-class"
            @click="$refs.sidebar._data.activeSidebar = true"
          />
        </div>
        <div
          class="logo"
          style="background: url(/icon.png) no-repeat center center"
          type="button"
          @click="reDesingTab('index')"
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
          :active="active == 'chart-actives'"
          id="chart-actives"
          class="chart-actives"
          to="/chart/actives"
          v-html="traslations.Navbar.ActiveMatches"
        />
      </template>
      <template #right>
        <div class="d-flex" v-if="!isAuthenticated">
          <vs-button flat>Login</vs-button>
          <vs-button>Get Started</vs-button>
        </div>
        <div v-else class="d-flex align-items-center">
          <notifications />
          <userMenu :username="stateUser.username" />
        </div>
      </template>
    </vs-navbar>
    <!-- <SideBar ref="sidebar" /> -->
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
    active: 'create',
    clientWidth: document.body.clientWidth,
    isMobile: document.body.clientWidth < 480,
  }),
  components: {
    MenuIcon,
    SideBar,
    userMenu,
  },
  created() {
    this.active = this.$route.name
  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
  },
  watch: {
    lang() {
      const path = this.$route.name

      const mainPages = ['index', 'create', 'rooms', 'chart-actives']

      mainPages.includes(path) ? this.reDesingTab(path) : null
    },
  },
  computed: {
    ...mapGetters({
      lang: 'lang/lang',
      traslations: 'lang/traslations',
      isAuthenticated: 'auth/isAuthenticated',
      stateUser: 'auth/stateUser',
    }),
  },
  methods: {
    handleResize() {
      this.clientWidth = document.body.clientWidth
      this.isMobile = document.body.clientWidth < 480
    },
    reDesingTab(path) {
      document.getElementsByClassName(path)[0].click()
    },
  },
}
</script>

<style lang="scss" scoped>
.logo {
  height: 40px;
  width: 40px;
  background-size: cover !important;
  border-radius: 10px;
}

.user {
  cursor: pointer;
}
</style>
