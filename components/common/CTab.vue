<template>
  <div v-show="$parent.activeTab === id"><slot /></div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
      default: '',
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    icon: {
      type: String,
      required: false,
      default: '',
    },
    id: {
      type: [String, Number],
      required: true,
    },
  },
  created() {
    const { disabled, icon, id, title } = this

    const payload = { disabled, icon, id, title }

    this.$parent.tabs.push(payload)
  },
}
</script>
