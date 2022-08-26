<template>
  <div>
    <vs-navbar class="position-relative mb-3" center-collapsed v-model="active">
      <template #left>
        <div v-if="clientWidth < 690">
          <menu-icon
            size="1.5x"
            class="custom-class"
            @click="$refs.sidebar._data.activeSidebar = true"
          ></menu-icon>
        </div>
        <div v-else class="d-flex">
          <div
            class="logo"
            style="background: url(/icon.png) no-repeat center center"
            alt=""
          />
          <div class="d-flex ml-2">
            <span>chess</span>
            <span class="h5">TR</span>
          </div>
        </div>
      </template>
      <vs-navbar-item :active="active == 'index'" id="index" to="/">
        Home
      </vs-navbar-item>
      <vs-navbar-item :active="active == 'create'" id="create" to="/create">
        Create Room
      </vs-navbar-item>
      <vs-navbar-item :active="active == 'rooms'" id="rooms" to="/rooms">
        War Rooms
      </vs-navbar-item>
      <template #right>
        <div class="d-flex" v-if="!isAuthenticated">
          <vs-button flat>Login</vs-button>
          <vs-button>Get Started</vs-button>
        </div>
        <div v-else>
          <vs-button @click="logOut" flat>Logout</vs-button>
        </div>
      </template>
    </vs-navbar>
    <SideBar ref="sidebar" />
  </div>
</template>
<script>
import { MenuIcon } from 'vue-feather-icons'

import SideBar from './sidebar.vue'

import { mapGetters, mapMutations } from 'vuex'

export default {
  data: () => ({
    active: 'create',
    clientWidth: document.body.clientWidth,
    isMobile: document.body.clientWidth < 480,
  }),
  components: {
    MenuIcon,
    SideBar,
  },
  created() {
    this.active = this.$route.name
  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated',
    }),
  },
  methods: {
    ...mapMutations({ logOut: 'auth/logOut' }),
    handleResize() {
      this.clientWidth = document.body.clientWidth
      this.isMobile = document.body.clientWidth < 480
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
</style>
