<template>
  <div class="hidden">
    <vs-sidebar absolute v-model="active" :open.sync="activeSidebar">
      <template #logo>
        <div
          class="logo"
          style="background: url(/icon.png) no-repeat center center"
          type="button"
        />
      </template>
      <vs-sidebar-item
        :active="active == 'index'"
        id="index"
        to="/"
        v-html="traslations.Navbar.Home"
      >
      </vs-sidebar-item>
      <vs-sidebar-item
        :active="active == 'create'"
        id="create"
        to="/create"
        v-html="traslations.Navbar.CreateRoom"
      />
      <vs-sidebar-item
        :active="active == 'rooms'"
        id="rooms"
        to="/rooms"
        v-html="traslations.Navbar.WarRooms"
      />
      <vs-sidebar-item
        :active="active == 'chart-actives'"
        id="chart-actives"
        to="/chart/actives"
        v-html="traslations.Navbar.ActiveMatches"
      />
      <hr />
      <div v-if="isTablet && isAuthenticated">
        <div @click="setActiveComponent('users')">
          <vs-sidebar-item
            id="users"
            to=""
            v-html="traslations.Default.Users"
          />
        </div>
        <div @click="setActiveComponent('friends')">
          <vs-sidebar-item
            id="friends"
            to=""
            v-html="traslations.Default.Friends"
          />
        </div>
        <div @click="setActiveComponent('messages')">
          <vs-sidebar-item
            id="messages"
            to=""
            v-html="traslations.Default.Messages"
          />
        </div>
        <hr />
      </div>
      <vs-sidebar-item
        class="text-success"
        href="https://www.linkedin.com/in/onuranl/"
        v-html="traslations.Navbar.Reach"
      />
    </vs-sidebar>
  </div>
</template>

<script>
import Translate from './translate.vue'
import Theme from './theme.vue'

import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Sidebar',
  components: {
    Translate,
    Theme,
  },
  data: () => ({
    active: 'index',
    activeSidebar: false,
  }),
  created() {
    this.active = this.$route.name
  },
  watch: {
    activeSidebar(val) {
      this.setSidebar(val)
    },
  },
  mounted() {
    const items = document.getElementsByClassName('vs-sidebar__item')

    for (const item of items) {
      item.addEventListener('click', () => {
        this.activeSidebar = false
      })
    }
  },
  computed: {
    ...mapGetters({
      isTablet: 'vuesax/isTablet',
      traslations: 'lang/traslations',
      isAuthenticated: 'auth/isAuthenticated',
    }),
  },
  methods: {
    ...mapMutations({
      setActiveComponent: 'vuesax/setActiveComponent',
      setSidebar: 'vuesax/setSidebar',
    }),
  },
}
</script>
