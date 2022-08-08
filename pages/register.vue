<template>
  <div class="center">
    <vs-dialog v-model="active" not-close prevent-close>
      <template #header>
        <h5>Welcome to <b>ChessTR</b></h5>
      </template>

      <div class="register-form">
        <vs-input class="mb-2" v-model="form.email" placeholder="Email">
          <template #icon>
            <mail-icon size="1x" class="custom-class"></mail-icon>
          </template>
        </vs-input>
        <vs-input
          type="password"
          v-model="form.password"
          placeholder="Password"
        >
          <template #icon>
            <lock-icon size="1x" class="custom-class"></lock-icon>
          </template>
        </vs-input>
        <!-- <vs-checkbox class="mt-3" v-model="remember">Remember me</vs-checkbox> -->
      </div>

      <template #footer>
        <vs-button @click="submit" block> Create Account </vs-button>
        <div class="d-flex justify-content-center mt-3">
          <div style="font-size: 0.7rem">
            You are here ? <nuxt-link to="/login">Login</nuxt-link>
          </div>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import { LockIcon, MailIcon } from 'vue-feather-icons'

export default {
  name: 'register',
  components: {
    LockIcon,
    MailIcon,
  },
  data() {
    return {
      active: true,
      form: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    ...mapActions({ register: 'auth/register' }),
    async submit() {
      try {
        this.$vs.loading()
        await this.register(this.form)
        setInterval(() => {
          location.reload()
        }, 1000)
      } catch (error) {
        console.log({ error })
      }
    },
  },
}
</script>

<style lang="scss">
.register-form {
  .vs-input {
    width: 100%;
    &-content {
      width: 100%;
    }
    &__label {
      margin: 0px;
    }
  }
  .vs-checkbox-label {
    margin: 0px;
  }
}
</style>
