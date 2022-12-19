<template>
  <div>
    <vs-table class="text-white" style="max-width: 600px">
      <template #thead>
        <vs-tr>
          <vs-th> {{ traslations.Rooms.Player }} </vs-th>
          <vs-th sort @click="rooms = $vs.sortData($event, rooms, 'rating')">
            {{ traslations.Rooms.Rating }}
          </vs-th>
          <vs-th> {{ traslations.Rooms.Time }} </vs-th>
          <vs-th />
        </vs-tr>
      </template>
      <template #tbody>
        <vs-tr
          v-for="(tr, i) in $vs.getPage(rooms, page, max)"
          :key="i"
          :data="tr"
        >
          <vs-td>
            {{ tr.users[0].user.username }}
          </vs-td>
          <vs-td>
            {{ tr.users[0].user.rating }}
          </vs-td>
          <vs-td> {{ formattedElapsedTime(tr.users[0].time) }} min </vs-td>
          <vs-td class="d-flex justify-content-end">
            <vs-button
              flat
              success
              animation-type="vertical"
              @click="$router.push('/chart/' + tr._id)"
            >
              {{ traslations.Rooms.Join }}
              <template #animate>
                <arrow-right-icon size="1.5x" />
              </template>
            </vs-button>
          </vs-td>
        </vs-tr>
      </template>
      <template #footer>
        <vs-pagination v-model="page" :length="$vs.getLength(rooms, max)" />
      </template>
      <template #notFound> {{ traslations.Rooms.NotFound }} </template>
    </vs-table>
  </div>
</template>

<script>
import { ArrowRightIcon } from 'vue-feather-icons'

import { mapGetters } from 'vuex'

export default {
  components: {
    ArrowRightIcon,
  },
  data: () => ({
    page: 1,
    max: 5,
  }),
  async asyncData({ $axios, app }) {
    const loading = app.router.app.$vs.loading()

    const rooms = await $axios.$get('/chart/public')

    loading.close()

    return { rooms }
  },
  computed: {
    ...mapGetters({
      traslations: 'lang/traslations',
    }),
  },
  methods: {
    formattedElapsedTime(elapsedTime) {
      const date = new Date(null)
      date.setSeconds(elapsedTime / 1000)
      const utc = date.toUTCString()
      let result = utc.substr(utc.indexOf(':') - 5, 8).substring(6)
      return result < 10 ? result.charAt(1) : result
    },
  },
}
</script>
