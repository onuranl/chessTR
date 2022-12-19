<template>
  <div>
    <div class="invite text-secondary">
      <h3>Challange to game</h3>
      <div class="invite-main my-4">
        <p>To invite someone to play, give this URL:</p>
        <div class="d-flex align-items-center my-3">
          <vs-input state="success" v-model="url" readonly />
          <vs-button
            class="mb-0"
            icon
            active
            :disabled="copied"
            @click="copyUrl"
          >
            <copy-icon v-if="!copied" size="1.5x" class="cursor-pointer" />
            <check-icon v-else size="1.5x" class="cursor-pointer" />
          </vs-button>
        </div>
        <p>The first person to come to this URL will play with you.</p>
      </div>
      <div class="d-flex justify-content-center align-items-center">
        <vs-button @click="deleteChart" danger border class="text-white" active>
          <x-icon size="1.5x" class="mr-1" /> CANCEL
        </vs-button>
      </div>
    </div>
  </div>
</template>

<script>
import { XIcon, CopyIcon, CheckIcon } from 'vue-feather-icons'

import { mapActions } from 'vuex'

export default {
  name: 'inviteSection',
  components: {
    XIcon,
    CopyIcon,
    CheckIcon,
  },
  data() {
    return {
      url: window.location.origin + this.$route.path,
      copied: false,
    }
  },
  methods: {
    ...mapActions({
      deleteChart: 'chart/deleteChart',
    }),
    copyUrl() {
      navigator.clipboard.writeText(this.url)

      this.copied = true
    },
  },
}
</script>

<style scoped lang="scss">
.invite {
  background: #262421;
  box-shadow: 0 2px 2px 0rgba (0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  border-radius: 3px;
  padding: 36px 48px;
  &-main {
    padding: 20px;
    background: #302e2c;
    border-radius: 3px;
  }
}

p {
  margin: 0px;
}
</style>
