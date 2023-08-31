<template>
  <v-layout class="custom-layout">
    <side-navigation />
    <navigation-bar />
    <v-main>
      <v-container
        id="page-container"
        class="py-md-16"
        style="max-width: 1300px"
      >
        <nuxt-page></nuxt-page>
      </v-container>
    </v-main>
  </v-layout>
</template>
<script setup lang="ts">
import SideNavigation from "~/components/Navigation/SideNavigation.vue";
import NavigationBar from "~/components/Navigation/TopNavigation.vue";

const { load, loadSettings } = useShop();
load.execute();
loadSettings.execute();
</script>
<style scoped lang="scss"></style>
