<template>
  <div class="filter-provider-container">
    <slot name="button">
      <v-badge
        :color="filtersCount ? 'error' : 'transparent'"
        :content="filtersCount || ''"
      >
        <v-btn
          @click="toggleDrawer"
          color="accent"
          variant="tonal"
          icon="filter_list"
        >
        </v-btn>
      </v-badge>
    </slot>
    <v-navigation-drawer
      class="filter-provider-drawer"
      style="
        position: fixed;
        height: 100vh;
        width: 40%;
        min-width: 500px;
        margin-top: 0;
        z-index: 9999;
      "
      v-model="drawer"
      floating
      temporary
      location="right"
    >
      <div class="filter-provider-content pa-10">
        <slot> </slot>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
defineProps<{
  filtersCount?: number;
}>();
const drawer = ref(false);
const toggleDrawer = () => (drawer.value = !drawer.value);
</script>

<style scoped lang="scss">
.filter-provider-drawer {
  height: 100vh !important;
  position: fixed;
  top: 0;
  right: 0;
}
.filter-provider-content {
  height: 100%;
  background: rgb(var(--v-theme-background));
}
</style>
