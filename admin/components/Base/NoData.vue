<template>
  <v-alert class="no-data text-center text-slate-500 bg-slate-50">
    <slot> No data available </slot>
  </v-alert>
</template>

<script></script>

<style scoped lang="scss">
.no-data {
  border-radius: $b-radius;
}
</style>
