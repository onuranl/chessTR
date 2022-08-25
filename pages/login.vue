<template>
  <vs-dialog v-model="active" not-close prevent-close>
    <template #header>
      <h5>Welcome to <b>ChessTR</b></h5>
    </template>

    <div class="login-form">
      <vs-input class="mb-2" v-model="form.email" placeholder="Email">
        <template #icon>
          <mail-icon size="1x" class="custom-class"></mail-icon>
        </template>
      </vs-input>
      <vs-input type="password" v-model="form.password" placeholder="Password">
        <template #icon>
          <lock-icon size="1x" class="custom-class"></lock-icon>
        </template>
      </vs-input>
      <!-- <vs-checkbox class="mt-3" v-model="remember">Remember me</vs-checkbox> -->
    </div>

    <template #footer>
      <vs-button @click="submit" block> Sign In </vs-button>
      <div class="d-flex justify-content-center mt-3">
        <div style="font-size: 0.7rem">
          New Here? <nuxt-link to="/register">Create New Account</nuxt-link>
        </div>
      </div>
    </template>
  </vs-dialog>
</template>

<script>
import { mapActions } from 'vuex'

import { LockIcon, MailIcon } from 'vue-feather-icons'

export default {
  name: 'login',
  components: {
    LockIcon,
    MailIcon,
  },
  data() {
    return {
      active: true,
      form: {
        email: 'onuro99cent@gmail.com',
        password: 'sqtrbe123',
      },
    }
  },
  methods: {
    ...mapActions({ logIn: 'auth/logIn' }),
    submit() {
      const loading = this.$vs.loading()

      this.logIn(this.form)
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
          loading.close()
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
.login-form {
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
