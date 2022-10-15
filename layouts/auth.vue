<template>
  <div>
    <div class="config">
      <Translate />
      <Theme />
    </div>
    <Nuxt />
  </div>
</template>

<script>
import Translate from './components/translate.vue'
import Theme from './components/theme.vue'

export default {
  name: 'auth',
  components: { Translate, Theme },
}
</script>

<style lang="scss" scoped>
.config {
  z-index: 99001;
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  background: #1e2023;
  border: 0;
  border-radius: 0 20px 0 0;
  outline: none;
  padding: 15px;
  padding-bottom: 0px;
}
</style>
