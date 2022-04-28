<template>
  <div>
    <button @click="newGame">create room</button>
  </div>
</template>

<script>
export default {
  methods: {
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
