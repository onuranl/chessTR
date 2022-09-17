<template>
  <div class="theme">
    <vs-switch dark v-model="dark">
      <template #off>
        <moon-icon size="1.5x" class="custom-class"></moon-icon>
      </template>
      <template #on>
        <sun-icon size="1.5x" class="custom-class"></sun-icon>
      </template>
    </vs-switch>
  </div>
</template>

<script>
import { MoonIcon, SunIcon } from 'vue-feather-icons'

export default {
  components: {
    MoonIcon,
    SunIcon,
  },
  data() {
    return {
      dark: localStorage.getItem('vsTheme') === null ? true : localStorage.getItem('vsTheme') === 'dark' ? true : false,
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
  width: 70px;
  height: 40px;
  z-index: 99001;
  position: absolute;
  bottom: 0;
  left: 10px;
}
</style>
