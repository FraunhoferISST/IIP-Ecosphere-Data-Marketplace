<template>
  <div class="table-list-cell d-flex align-center">
    <div class="fill-width">
      <div class="__title">
        <slot name="title"></slot>
      </div>
      <div class="__subtitle">
        <slot name="subtitle"> </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.table-list-cell {
  .__title {
    font-weight: bold;
    color: black;
  }
  .__subtitle {
    color: rgb(var(--v-theme-slate-500));
  }
}
</style>
