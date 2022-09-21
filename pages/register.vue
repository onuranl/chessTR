<template>
  <vs-dialog v-model="active" not-close prevent-close>
    <template #header>
      <h5>Welcome to <b>ChessTR</b></h5>
    </template>

    <div class="register-form">
      <vs-input class="mb-2" v-model="form.username" placeholder="Username">
        <template #icon>
          <user-icon size="1x" class="custom-class"></user-icon>
        </template>
      </vs-input>
      <vs-input class="mb-2" v-model="form.email" placeholder="Email">
        <template #icon>
          <mail-icon size="1x" class="custom-class"></mail-icon>
        </template>
      </vs-input>
      <vs-input
        type="password"
        v-model="form.password"
        placeholder="Password"
        :progress="getProgress"
      >
        <template #icon>
          <lock-icon size="1x" class="custom-class"></lock-icon>
        </template>
      </vs-input>
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
</template>

<script>
import { mapActions } from 'vuex'

import { LockIcon, MailIcon, UserIcon } from 'vue-feather-icons'

export default {
  name: 'register',
  layout: 'auth',
  components: {
    LockIcon,
    MailIcon,
    UserIcon,
  },
  data() {
    return {
      active: true,
      form: {
        username: '',
        email: '',
        password: '',
      },
    }
  },
  computed: {
    getProgress() {
      let progress = 0

      // at least one number

      if (/\d/.test(this.form.password)) {
        progress += 20
      }

      // at least one capital letter

      if (/(.*[A-Z].*)/.test(this.form.password)) {
        progress += 20
      }

      // at menons a lowercase

      if (/(.*[a-z].*)/.test(this.form.password)) {
        progress += 20
      }

      // more than 5 digits

      if (this.form.password.length >= 6) {
        progress += 20
      }

      // at least one special character

      if (/[^A-Za-z0-9]/.test(this.form.password)) {
        progress += 20
      }

      return progress
    },
  },
  methods: {
    ...mapActions({ register: 'auth/register' }),
    async submit() {
      const loading = this.$vs.loading()

      this.register(this.form)
        .then((response) => {
          if (response && response.status === 200) {
            setInterval(() => {
              location.reload()
            }, 1000)
          } else {
            loading.close()
            this.openNotification(
              'top-center',
              'danger',
              'Hata',
              response.data.error
            )
          }
        })
        .catch((err) => {
          console.log({ err })
          this.openNotification('top-center', 'danger', 'Hata', err)
        })
    },
    openNotification(position = null, color, title, text) {
      this.$vs.notification({
        color,
        position,
        title,
        text,
      })
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
