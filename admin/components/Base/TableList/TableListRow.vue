<template>
  <div class="table-list-row-container">
    <div
      class="table-list-row __data"
      :style="{ gridTemplateColumns: gridTemplate }"
      :class="{ __expanded: expanded }"
    >
      <slot></slot>
    </div>
    <v-expand-transition>
      <div v-if="expanded" class="__overview">
        <slot name="expansion"></slot>
      </div>
    </v-expand-transition>
  </div>
</template>

<script setup lang="ts">
const { expanded = false, gridTemplate = "repeat(6, 1fr)" } = defineProps<{
  expanded?: boolean;
  gridTemplate?: boolean;
}>();
</script>

<style scoped lang="scss">
.table-list-row-container {
  border-bottom: 2px solid rgb(var(--v-theme-slate-100));
  .__overview {
    background-color: rgb(var(--v-theme-slate-50));
  }
}
.table-list-row {
  transition: background-color 0.2s;
  font-size: 0.75rem;
  display: grid;
  /*grid-template-columns:
    60px minmax(200px, 1fr) repeat(3, minmax(100px, 200px)) minmax(100px, 300px)
    90px;*/
  gap: 16px;
  padding: 15px;
  &.__data {
    padding: 15px 15px;
    &:hover {
      background-color: rgb(var(--v-theme-slate-50));
    }
    &.__expanded {
      background-color: rgb(var(--v-theme-slate-50));
    }
  }
}
</style>
