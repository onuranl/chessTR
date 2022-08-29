<template>
  <div>
    <div class="content">
      <vs-button
        block
        v-for="mod in mods"
        :key="mod.value"
        @click="openModal(mod)"
      >
        {{ mod.name }}
      </vs-button>
    </div>
    <vs-dialog width="420px" center v-model="active">
      <template #header>
        <h4 class="text-center">{{ mod.name }}</h4>
      </template>

      <template>
        <div class="d-flex justify-content-center align-items-center">
          <p class="m-0 mr-3 text-secondary">Time Control</p>
          <vs-select placeholder="Select" v-model="value">
            <vs-option label="Real time" value="real"> Real time </vs-option>
            <vs-option label="Unlimited" value="unlimited">
              Unlimited
            </vs-option>
          </vs-select>
        </div>
        <div class="mt-3" v-if="value === 'real'">
          <div class="text-center">
            <p class="mb-0">
              <span class="text-secondary">Minutes per side:</span>
              {{ minutes }}
            </p>
            <input type="range" min="1" max="30" step="1" v-model="minutes" />
          </div>
          <div class="mt-2 text-center">
            <p class="mb-0">
              <span class="text-secondary">Increment in seconds:</span>
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
              createChart(mod.value)
            "
          >
            <vs-tooltip class="color" :class="{ random: color === 'random' }">
              <div
                class="icon"
                :style="`background: url(/${color}.svg) no-repeat center center`"
              ></div>
              <template #tooltip>
                {{
                  color === 'random'
                    ? 'Random side'
                    : color.charAt(0).toUpperCase() + color.slice(1)
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
import { mapMutations, mapActions } from 'vuex'

export default {
  data() {
    return {
      mod: '',
      active: false,
      value: 'unlimited',
      minutes: 5,
      increment: 0,
      mods: [
        { name: 'Create a game', value: 'public' },
        { name: 'Play with a friend', value: 'private' },
        { name: 'Play with the computer', value: 'offline' },
      ],
      colors: ['black', 'random', 'white'],
    }
  },
  methods: {
    ...mapMutations({ setColor: 'chart/setColor' }),
    ...mapActions({ createChart: 'chart/createChart' }),
    openModal(mod) {
      this.mod = mod
      this.active = true
    },
  },
}
</script>

<style lang="scss" scoped>
.content {
  width: 400px;
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
