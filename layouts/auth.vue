<template>
  <div>
    <Theme />
    <Nuxt />
  </div>
</template>

<script>
import Theme from './components/theme.vue'

export default {
  name: 'auth',
  components: { Theme },
}
</script>
