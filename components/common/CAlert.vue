<template>
  <div class="alert" :class="status + classContent">
    <div class="alert-title">
      <slot name="title" />
    </div>
    <div class="alert-content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: ['status', 'classContent'],
}
</script>

<style lang="scss" scoped>
.alert {
  width: 100%;
  border-radius: 15px;
  padding: 10px;
  background: rgba(var(--vs-color), 0.1);
  color: #fff;
  font-size: 0.9rem;
  &-title {
    font-weight: 600;
    font-size: 1rem;
  }
}

.pending {
  --vs-color: var(--vs-primary);
}
.accepted {
  --vs-color: var(--vs-success);
}
.declined {
  --vs-color: var(--vs-danger);
}
</style>
