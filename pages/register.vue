<template>
  <vs-dialog v-model="active" not-close prevent-close>
    <template #header>
      <h5 v-html="traslations.Auth.Welcome" />
    </template>

    <div class="register-form">
      <vs-input
        class="mb-2"
        v-model="form.username"
        :placeholder="traslations.Auth.Username"
      >
        <template #icon>
          <user-icon size="1x" />
        </template>
      </vs-input>
      <vs-input
        class="mb-2"
        v-model="form.email"
        :placeholder="traslations.Auth.Email"
      >
        <template #icon>
          <mail-icon size="1x" />
        </template>
      </vs-input>
      <vs-input
        type="password"
        v-model="form.password"
        :placeholder="traslations.Auth.Password"
        :progress="getProgress"
      >
        <template #icon>
          <lock-icon size="1x" />
        </template>
      </vs-input>
    </div>

    <template #footer>
      <vs-button @click="submit" block>
        {{ traslations.Auth.Register.CreateAccount }}
      </vs-button>
      <div class="d-flex justify-content-center mt-3">
        <div style="font-size: 0.7rem">
          {{ traslations.Auth.Register.YouAreHere }}
          <nuxt-link to="/login" v-html="traslations.Auth.LoginLabel" />
        </div>
      </div>
    </template>
  </vs-dialog>
</template>

<script>
import { LockIcon, MailIcon, UserIcon } from 'vue-feather-icons'

import { mapGetters, mapMutations, mapActions } from 'vuex'

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
    ...mapGetters({
      traslations: 'lang/traslations',
    }),
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
    ...mapMutations({ openNotification: 'vuesax/openNotification' }),
    ...mapActions({ register: 'auth/register' }),
    submit() {
      const loading = this.$vs.loading()

      this.register(this.form)
        .then((response) => {
          if (response && response.status === 200) {
            setTimeout(() => {
              location.reload()
            }, 1000)
          } else {
            loading.close()
            this.openNotification({ text: response.data.error })
          }
        })
        .catch((err) => {
          this.openNotification({ text: err })
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
