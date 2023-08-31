<template>
  <card class="dialog-container-card" padding="pb-0 pt-8" color="white">
    <div class="dialog-container px-16 pt-8" :style="{ height: height }">
      <slot></slot>
    </div>
    <div class="py-8 px-16 d-flex justify-end elevation-2">
      <slot name="action"></slot>
    </div>
  </card>
</template>
<script setup lang="ts">
import Card from "~/components/Base/Card.vue";

const { height = "75vh" } = defineProps<{
  height?: string;
}>();
</script>
<style scoped lang="scss">
.dialog-container-card {
  overflow: hidden;
}
.dialog-container {
  overflow-y: auto;
  border-radius: $b-radius;
  //overflow-x: hidden;
}
</style>
