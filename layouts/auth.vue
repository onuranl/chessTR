<template>
  <div>
    <Config />
    <Nuxt v-if="traslations" />
  </div>
</template>

<script>
import Config from './components/config.vue'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'auth',
  components: { Config },
  created() {
    this.getTranslations()
  },
  computed: {
    ...mapGetters({
      traslations: 'lang/traslations',
    }),
  },
  methods: {
    ...mapActions({
      getTranslations: 'lang/getTranslations',
    }),
  },
}
</script>