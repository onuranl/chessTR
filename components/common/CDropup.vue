<template>
  <div
    class="wrapper"
    :class="{
      'wrapper-short': !isOpen && !mobile,
      'wrapper-mobile visible rounded-0': mobile,
    }"
  >
    <div v-if="mobile" class="wrapper-header-mobile">
      <div class="d-flex align-items-center">
        <h4 class="mr-4">
          <slot v-if="activeComponent === 'private-chat'" name="title" />
          <span v-else v-html="firstLetterUpperCase(activeComponent)" />
        </h4>
        <vs-input v-show="activeComponent !== 'private-chat'" v-model="search">
          <template #icon>
            <search-icon size="1x" />
          </template>
        </vs-input>
      </div>
      <x-icon
        class="cursor-pointer"
        size="1.5x"
        @click="
          activeComponent === 'private-chat'
            ? $emit('closeChat') && setActiveComponent('messages')
            : setActiveComponent(null)
        "
      />
    </div>
    <div
      v-else
      class="wrapper-header"
      :class="{ 'wrapper-header-active': isOpen }"
      @click="isOpen = !isOpen"
    >
      <div
        class="d-flex align-items-center"
        :class="{
          'justify-content-between w-100':
            (parent === '<Friends>' || parent === '<Users>') && lang === 'tr',
        }"
      >
        <div
          :class="{
            'mr-3':
              parent === '<PrivateChat>' ||
              parent === '<Messages>' ||
              lang !== 'tr',
          }"
        >
          <chevron-down-icon v-if="isOpen" size="1.5x" />
          <chevron-up-icon v-else size="1.5x" />
        </div>
        <slot name="title" />
      </div>
      <x-icon v-if="closeIcon" @click="$emit('closeChat')" size="1.5x" />
    </div>
    <div class="wrapper-content" :class="classContent" v-if="isOpen || mobile">
      <slot />
    </div>
  </div>
</template>

<script>
import {
  ChevronUpIcon,
  ChevronDownIcon,
  XIcon,
  SearchIcon,
} from 'vue-feather-icons'

import { mapGetters, mapMutations } from 'vuex'

import firstLetterUpperCase from '~/utilities/firstLetterUpperCase'

export default {
  props: ['classContent', 'closeIcon', 'open', 'mobile'],
  components: {
    ChevronUpIcon,
    ChevronDownIcon,
    XIcon,
    SearchIcon,
  },
  data() {
    return {
      isOpen: this.open,
      search: '',
    }
  },
  watch: {
    isOpen(newVal, oldVal) {
      if (!oldVal && newVal) {
        setTimeout(() => {
          this.$emit('scrollToBottom')
        }, 100)
      }
    },
    search(val) {
      this.$emit('updateSearchInput', val)
    },
  },
  computed: {
    ...mapGetters({
      lang: 'lang/lang',
      activeComponent: 'vuesax/activeComponent',
    }),
    parent() {
      return this.$parent._name
    },
  },
  methods: {
    firstLetterUpperCase,
    ...mapMutations({
      setActiveComponent: 'vuesax/setActiveComponent',
    }),
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  min-width: 150px;
  height: 400px;
  background: #262421;
  border-radius: 15px;
  position: relative;
  transition: height 0.5s;
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 23%);
  &-mobile {
    position: fixed;
    padding: 0;
    margin: 0;
    bottom: 0;
    left: 0;
    width: 100% !important;
    height: 100% !important;
  }
  &-short {
    height: 50px;
  }
  &-header {
    background: rgba(var(--vs-gray-2), 1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    border-radius: 15px;
    width: 100%;
    height: 50px;
    bottom: 0px;
    padding: 0px 20px;
    cursor: pointer;
    &-active {
      bottom: auto;
      top: 0px;
    }
    &-mobile {
      padding: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  &-content {
    width: 100%;
    height: calc(100% - 50px);
    position: absolute;
    bottom: 0px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    overflow: auto;
  }
}
</style>
