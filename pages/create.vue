<template>
  <div>
    <div class="content">
      <vs-button
        class="mx-0"
        block
        v-for="mod in mods"
        :key="mod"
        @click="openModal(mod)"
      >
        {{ traslations.CreateRoom[firstLetterUpperCase(mod)] }}
      </vs-button>
    </div>
    <vs-dialog width="420px" center v-model="active" v-if="mod">
      <template #header>
        <h4
          class="text-center"
          v-html="traslations.CreateRoom[firstLetterUpperCase(mod)]"
        />
      </template>

      <template>
        <div class="d-flex justify-content-center align-items-center">
          <p
            class="m-0 mr-3 text-secondary"
            v-html="traslations.CreateRoom.TimeControl"
          />
          <vs-select placeholder="Select" v-model="value">
            <vs-option
              value="real"
              :label="traslations.CreateRoom.RealTime"
              v-html="traslations.CreateRoom.RealTime"
            />
            <vs-option
              value="unlimited"
              :label="traslations.CreateRoom.Unlimited"
              v-html="traslations.CreateRoom.Unlimited"
            />
          </vs-select>
        </div>
        <div class="mt-3" v-if="value === 'real'">
          <div class="text-center">
            <p class="mb-0">
              <span
                class="text-secondary"
                v-html="traslations.CreateRoom.MinutesPerSide"
              />
              {{ minutes }}
            </p>
            <input type="range" min="1" max="30" step="1" v-model="minutes" />
          </div>
          <div class="mt-2 text-center">
            <p class="mb-0">
              <span
                class="text-secondary"
                v-html="traslations.CreateRoom.IncrementInSeconds"
              />
              {{ increment }}
            </p>
            <input type="range" min="0" max="20" step="1" v-model="increment" />
          </div>
        </div>
      </template>

      <template #footer>
        <div class="colors mt-4">
          <div
            v-for="color in colors"
            :key="color"
            @click="
              setColor(color)
              setTime(value !== 'unlimited' ? minutes : -1)
              setIncrement(increment)
              createChart(mod !== 'public' ? mod : null)
              clearTooltips()
            "
          >
            <vs-tooltip class="color" :class="{ random: color === 'random' }">
              <div
                class="icon"
                :style="`background: url(/${color}.svg) no-repeat center center`"
              />
              <template #tooltip>
                {{
                  color === 'random'
                    ? traslations.CreateRoom.RandomSide
                    : traslations.CreateRoom[firstLetterUpperCase(color)]
                }}
              </template>
            </vs-tooltip>
          </div>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

import firstLetterUpperCase from '../utilities/firstLetterUpperCase'

export default {
  data() {
    return {
      mod: '',
      active: false,
      value: 'unlimited',
      minutes: 5,
      increment: 0,
      mods: ['public', 'private', 'ai'],
      colors: ['black', 'random', 'white'],
    }
  },
  computed: {
    ...mapGetters({ traslations: 'lang/traslations' }),
  },
  methods: {
    firstLetterUpperCase,
    ...mapMutations({
      setColor: 'chart/setColor',
      setTime: 'chart/setTime',
      setIncrement: 'chart/setIncrement',
    }),
    ...mapActions({ createChart: 'chart/createChart' }),
    openModal(mod) {
      this.mod = mod
      this.active = true
    },
    clearTooltips() {
      const tooltips = document.getElementsByClassName('vs-tooltip top')

      while (tooltips.length > 0) {
        tooltips[0].parentNode.removeChild(tooltips[0])
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.content {
  width: 400px;

  @media only screen and (max-width: 418px) {
    width: 90%;
  }
}

.colors {
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.color {
  height: 64px;
  width: 64px;
  background: linear-gradient(to bottom, #3c3934, #33312e 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  cursor: pointer;
  border-radius: 3px;
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 23%);
}

.random {
  height: 85px;
  width: 85px;
  margin-left: 10px;
  margin-right: 10px;
  padding: 8px;
}

.icon {
  height: 100%;
  width: 100%;
  background-size: cover !important;
  border-radius: 10px;
}
</style>
