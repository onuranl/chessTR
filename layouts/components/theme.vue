<template>
  <div class="theme">
    <vs-switch dark v-model="dark">
      <template #off>
        <moon-icon size="1.5x"></moon-icon>
      </template>
      <template #on>
        <sun-icon size="1.5x"></sun-icon>
      </template>
    </vs-switch>
  </div>
</template>

<script>
import { MoonIcon, SunIcon } from 'vue-feather-icons'

export default {
  name: 'Theme',
  components: {
    MoonIcon,
    SunIcon,
  },
  data() {
    return {
      dark:
        localStorage.getItem('vsTheme') === null ||
        localStorage.getItem('vsTheme') === 'dark',
    }
  },
  watch: {
    dark: {
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal) {
          if (
            oldVal !== undefined &&
            localStorage.getItem('vsTheme') !== null
          ) {
            this.$vs.toggleTheme()
          } else {
            document.body.setAttribute('vs-theme', 'dark')
          }
        } else {
          if (oldVal !== undefined) {
            this.$vs.toggleTheme()
          }
        }
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.theme {
  margin-left: 15px;
  width: 70px;
  height: 40px;
}
</style>
