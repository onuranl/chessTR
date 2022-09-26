<template>
  <div class="wrapper" :class="{ 'wrapper-short': !open }">
    <div
      class="wrapper-header"
      :class="{ 'wrapper-header-active': open }"
      @click="open = !open"
    >
      <div class="d-flex align-items-center">
        <div class="mr-3">
          <chevron-down-icon v-if="open" size="1.5x" />
          <chevron-up-icon v-else size="1.5x" />
        </div>
        <span>onuranl</span>
      </div>
      <x-icon size="1.5x" />
    </div>
    <div class="wrapper-content" v-if="open">
      <div class="overflow-auto p-1">
        <div class="wrapper-content-messages">
          <div class="wrapper-content-messages-mine">
            <span>asdasdsad</span>
          </div>
          <div class="wrapper-content-messages-your">
            <span style="text-align: end">asdasdsad</span>
          </div>
          <div class="wrapper-content-messages-your">
            <span style="text-align: end">asdasdsad</span>
          </div>
          <div class="wrapper-content-messages-your">
            <span style="text-align: end">asdasdsad</span>
          </div>
          <div class="wrapper-content-messages-your">
            <span style="text-align: end">asdasdsad</span>
          </div>
          <div class="wrapper-content-messages-your">
            <span style="text-align: end">asdasdsad</span>
          </div>
        </div>
      </div>
      <div class="wrapper-content-input">
        <vs-input v-model="message" />
      </div>
    </div>
  </div>
</template>

<script>
import { ChevronUpIcon, ChevronDownIcon, XIcon } from 'vue-feather-icons'

export default {
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
  width: 300px;
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
  }
  &-content {
    width: 100%;
    height: calc(100% - 50px);
    position: absolute;
    bottom: 0px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &-messages {
      &-mine {
        width: 100%;
        display: flex;
        align-items: center;
      }
      &-your {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }
      span {
        width: 40%;
        word-break: break-word;
      }
    }
  }
}
</style>

<style lang="scss">
.wrapper-content-input {
  .vs-input {
    width: 100%;
  }
}
</style>
