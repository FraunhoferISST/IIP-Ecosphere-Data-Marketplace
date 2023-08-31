<template>
<div class="card">
  <div class="card-header">
    <slot name="header">
      <h3>
        {{ header }}
      </h3>
    </slot>
  </div>
  <div class="card-body">
    <slot></slot>
  </div>
</div>
</template>

<script>
export default {
  name: "Card",
  props: {
    header: {
      type: String,
      required: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  padding: 16px 16px;
  border-radius: $border-radius;
  border: 2px solid $secondary;
}
</style>
