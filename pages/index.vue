<template>
  <div>
    <div>
      <button
        @click="
          setColor(color)
          createChart()
        "
      >
        create room
      </button>
      <b-form-group label="Color">
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
    </div>
    <button @click="logOut">logOut</button>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
  data() {
    return {
      color: null,
    }
  },
  methods: {
    ...mapMutations({ logOut: 'auth/logOut', setColor: 'chart/setColor' }),
    ...mapActions({ createChart: 'chart/createChart' }),
  },
}
</script>
