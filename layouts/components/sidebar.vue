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
    </vs-sidebar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Sidebar',
  data: () => ({
    active: 'index',
    activeSidebar: false,
  }),
  created() {
    this.active = this.$route.name
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
      traslations: 'lang/traslations',
    }),
  },
}
</script>
