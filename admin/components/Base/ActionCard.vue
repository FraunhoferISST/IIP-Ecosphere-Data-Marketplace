<template>
  <div class="action-card-container position-relative">
    <card
      outline
      class="action-card"
      :class="{ 'permanent-action': permanentAction }"
      v-bind="$attrs"
    >
      <slot></slot>
    </card>
    <div class="action-card-actions position-absolute d-flex flex-column">
      <slot name="actions"> </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import Card from "~/components/Base/Card.vue";
defineProps({
  permanentAction: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped lang="scss">
.action-card-container {
  &:hover {
    .action-card-actions {
      opacity: 1;
    }
  }
  &.permanent-action {
    .action-card-actions {
      opacity: 1;
    }
  }
}
.action-card-actions {
  transition: opacity 0.3s;
  opacity: 0;
  top: 0;
  right: 0;
  z-index: 10;
}
</style>
