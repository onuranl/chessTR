<template>
  <div
    class="config"
    :class="{ 'd-none': !($parent._name === '<Auth>' || sidebar) && isTablet }"
  >
    <Translate />
    <Theme />
    <vs-button
      href="https://github.com/onuranl/chessTR"
      blank
      icon
      color="dark"
    >
      <github-icon size="1.5x" />
    </vs-button>
  </div>
</template>

<script>
import Translate from './translate.vue'
import Theme from './theme.vue'

import { GithubIcon } from 'vue-feather-icons'

import { mapGetters } from 'vuex'

export default {
  name: 'Config',
  components: { Translate, Theme, GithubIcon },
  computed: {
    ...mapGetters({
      isTablet: 'vuesax/isTablet',
      sidebar: 'vuesax/sidebar',
    }),
  },
}
</script>

<style lang="scss" scoped>
.config {
  z-index: 99001;
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  background: #1e2023;
  border: 0;
  border-radius: 0 20px 0 0;
  outline: none;
  padding: 15px;
  padding-bottom: 0px;

  .vs-button {
    margin-left: 15px;
    margin-bottom: 20px;
  }
}
</style>
