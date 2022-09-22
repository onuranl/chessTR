<template>
  <div ref="button" class="content" @click="open = true">
    <vs-button dark shadow :active="open">
      {{ username }}
    </vs-button>
    <div
      class="userMenu"
      v-if="open"
      v-closable="{
        exclude: ['button'],
        handler: 'onClose',
      }"
    >
      <vs-button
        v-for="(option, index) in options"
        :key="index"
        class="w-100"
        :dark="option.dark"
        :shadow="option.dark"
        :flat="option.flat"
        @click="execute(option.val)"
        >{{ option.name }}
      </vs-button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

import Vue from 'vue'

let handleOutsideClick

Vue.directive('closable', {
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
  props: ['username'],
  data() {
    return {
      open: false,
      options: [
        {
          name: 'Profile',
          val: 'profile',
          dark: true,
        },
        {
          name: 'Settings',
          val: 'settings',
          dark: true,
        },
        {
          name: 'Logout',
          val: 'logout',
          falt: true,
        },
      ],
    }
  },
  methods: {
    ...mapMutations({ logOut: 'auth/logOut' }),
    onClose() {
      this.open = false
    },
    execute(val) {
      if (val == 'logout') {
        this.logOut()
      } else {
        this.$router.push(val)
      }
      this.onClose()
    },
  },
}
</script>

<style lang="scss" scoped>
.content {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: self-end;
  position: absolute;
}

.userMenu {
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
}
</style>
