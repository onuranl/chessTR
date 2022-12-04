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
        >{{ traslations.UserMenu[option.name] }}
      </vs-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

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
  computed: {
    ...mapGetters({
      traslations: 'lang/traslations',
      stateUser: 'auth/stateUser',
    }),
  },
  methods: {
    ...mapMutations({ logOut: 'auth/logOut' }),
    onClose() {
      this.open = false
    },
    execute(val) {
      switch (val) {
        case 'logout':
          this.logOut()
          break
        case 'profile':
          this.$router.push('/' + this.stateUser.username)
          break
        case 'settings':
          this.$router.push('/' + val)
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
  transition: all 0.25s ease;
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 23%);
}
</style>
