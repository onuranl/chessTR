<template>
  <div>
    <vs-table class="text-white" style="width: 600px">
      <template #thead>
        <vs-tr>
          <vs-th> Email </vs-th>
          <vs-th> Time </vs-th>
          <vs-th> </vs-th>
        </vs-tr>
      </template>
      <template #tbody>
        <vs-tr
          v-for="(tr, i) in $vs.getPage(rooms, page, max)"
          :key="i"
          :data="tr"
        >
          <vs-td>
            {{ tr.users[0].user.email }}
          </vs-td>
          <vs-td> {{ formattedElapsedTime(tr.users[0].time) }} min </vs-td>
          <vs-td class="d-flex justify-content-end">
            <vs-button
              flat
              success
              animation-type="vertical"
              @click="$router.push('/chart/' + tr._id)"
            >
              Join
              <template #animate>
                <arrow-right-icon
                  size="1.5x"
                  class="custom-class"
                ></arrow-right-icon>
              </template>
            </vs-button>
          </vs-td>
        </vs-tr>
      </template>
      <template #footer>
        <vs-pagination v-model="page" :length="$vs.getLength(rooms, max)" />
      </template>
    </vs-table>
  </div>
</template>

<script>
import { ArrowRightIcon } from 'vue-feather-icons'

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
