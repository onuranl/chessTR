<template>
  <div ref="button" class="content" @click="open = true">
    <vs-button icon color="danger" border :active="open">
      <bell-icon size="1x" />
    </vs-button>
    <div
      class="notifications"
      v-if="open"
      v-closableNoti="{
        exclude: ['button'],
        handler: 'onClose',
      }"
    >
      selam
    </div>
  </div>
</template>

<script>
import { BellIcon } from 'vue-feather-icons'

import Vue from 'vue'

let handleOutsideClick

Vue.directive('closableNoti', {
  bind(el, binding, vnode) {
    handleOutsideClick = (e) => {
      e.stopPropagation()
      const { handler, exclude } = binding.value
      let clickedOnExcludedEl = false
      exclude.forEach((refName) => {
        if (!clickedOnExcludedEl) {
          const excludedEl = vnode.context.$refs[refName]
          clickedOnExcludedEl = excludedEl.contains(e.target)
        }
      })
      if (!el.contains(e.target) && !clickedOnExcludedEl) {
        vnode.context[handler]()
      }
    }
    document.addEventListener('click', handleOutsideClick)
    document.addEventListener('touchstart', handleOutsideClick)
  },
  unbind() {
    document.removeEventListener('click', handleOutsideClick)
    document.removeEventListener('touchstart', handleOutsideClick)
  },
})

export default {
  components: {
    BellIcon,
  },
  data() {
    return {
      open: false,
    }
  },
  methods: {
    onClose() {
      this.open = false
    },
  },
}
</script>

<style lang="scss" scoped>
.content {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.notifications {
  position: absolute;
  top: 55px;
  width: 150px;
  background: rgba(var(--vs-color), 1);
  border-radius: 15px;
  padding: 5px 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  transition: all 0.25s ease;
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 23%);
}
</style>
