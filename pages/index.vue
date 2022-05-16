<template>
  <div>
    <button @click="newGame">create room</button>
    <button @click="logOut">logOut</button>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  methods: {
    ...mapMutations({ logOut: 'auth/logOut' }),
    async newGame() {
      await this.$axios
        .$post('chart')
        .then((result) => {
          if (result) {
            this.$router.push('chart/' + result._id)
          }
        })
        .catch((err) => {
          console.log({ err })
        })
    },
  },
}
</script>
