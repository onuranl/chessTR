<template>
  <div v-if="users">
    <b-modal
      ref="modal"
      @ok="handleOk"
      cancel-disabled
      visible
      hide-header
      no-close-on-backdrop
      no-close-on-esc
      no-enforce-focus
      :ok-disabled="okDisabled"
    >
      <form ref="form">
        <b-form-group
          label="Name"
          label-for="name-input"
          invalid-feedback="Name is required"
        >
          <b-form-input
            id="name-input"
            v-model="name"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          v-show="users.length < 2"
          :disabled="users.length >= 1"
          label="Color"
        >
          <b-form-radio
            v-model="color"
            :aria-describedby="ariaDescribedby"
            name="some-radios"
            value="black"
            >Black</b-form-radio
          >
          <b-form-radio
            v-model="color"
            :aria-describedby="ariaDescribedby"
            name="some-radios"
            value="white"
            >White</b-form-radio
          >
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  props: {
    users: {
      type: Object,
    },
  },
  data() {
    return {
      name: null,
      color: null,
    }
  },
  created() {
    if (this.users && this.users.length === 1) {
      this.users[0].color === 'black'
        ? (this.color = 'white')
        : (this.color = 'black')
    }
  },
  computed: {
    okDisabled() {
      if (!this.name) {
        return true
      }
      if (this.users && this.users.length >= 2) {
        return false
      }
      if (!this.color) {
        return true
      }
    },
  },
  methods: {
    ...mapMutations({
      setUserInfo: 'user/setUserInfo',
    }),
    handleOk() {
      const data = {
        name: this.name,
        color: this.color,
      }
      this.setUserInfo(data)
    },
  },
}
</script>
