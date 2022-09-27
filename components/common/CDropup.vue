<template>
  <div class="wrapper" :class="{ 'wrapper-short': !open }">
    <div
      class="wrapper-header"
      :class="{ 'wrapper-header-active': open }"
      @click="open = !open"
    >
      <div class="mr-3">
        <chevron-down-icon v-if="open" size="1.5x" />
        <chevron-up-icon v-else size="1.5x" />
      </div>
      <slot name="title" />
    </div>
    <div class="wrapper-content" :class="classContent" v-if="open">
      <slot />
    </div>
  </div>
</template>

<script>
import { ChevronUpIcon, ChevronDownIcon, XIcon } from 'vue-feather-icons'

export default {
  props: ['classContent'],
  components: {
    ChevronUpIcon,
    ChevronDownIcon,
    XIcon,
  },
  data() {
    return {
      open: false,
      message: null,
    }
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
  &-short {
    height: 50px;
  }
  &-header {
    background: rgba(var(--vs-gray-2), 1);
    display: flex;
    align-items: center;
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
  }
  &-content {
    width: 100%;
    height: calc(100% - 50px);
    position: absolute;
    bottom: 0px;
    padding: 10px;
    display: flex;
    flex-direction: column;
  }
}
</style>
