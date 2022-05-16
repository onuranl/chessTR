<template>
  <section class="section">
    <div class="columns">
      <div class="column is-4 is-offset-4">
        <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <input class="input" type="email" v-model="form.email" />
          </div>
        </div>
        <div class="field">
          <label class="label">Password</label>
          <div class="control">
            <input class="input" type="password" v-model="form.password" />
          </div>
        </div>
        <div class="field is-grouped">
          <div class="control">
            <button @click="submit" class="button is-link">Submit</button>
          </div>
          <nuxt-link to="/login">
            <button>
              <p>login ?</p>
            </button>
          </nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'register',
  data() {
    return {
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
