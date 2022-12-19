<template>
  <div class="row">
    <div class="col-4 tabs-content">
      <ul class="tabs">
        <li
          class="tab"
          :class="{ activeTab: index + 1 === activeTab }"
          v-for="(tab, index) in tabs"
          :key="index"
          @click="selectTab(tab)"
        >
          {{ tab.title }}
        </li>
      </ul>
    </div>
    <div class="col-8 content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    activeTab: {
      type: [String, Number],
      required: true,
      default: 1,
    },
  },
  data() {
    return { tabs: [] }
  },
  watch: {
    activeTab: {
      immediate: true,
      deep: true,
      handler() {
        this.set()
      },
    },
    tabs: {
      immediate: true,
      deep: true,
      handler() {
        this.set()
      },
    },
  },
  methods: {
    selectTab(selectedTab) {
      if (!selectedTab.disabled) this.$emit('changeActiveTab', selectedTab.id)
    },
    set() {
      if (this.tabs && this.tabs.length > 0)
        this.tabs.forEach((tab) => {
          tab.isActive = tab.id === this.activeTab && !tab.disabled
        })
    },
  },
}
</script>

<style lang="scss" scoped>
ul {
  list-style-type: none;
  padding-left: 0px !important;
}
.tabs {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.tab {
  padding: 20px 16px;
  gap: 8px;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  cursor: pointer;
  text-align: center;
}
.activeTab {
  border-bottom: 2px solid white;
  opacity: 1;
  color: white;
}
</style>
