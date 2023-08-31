<template>
  <div>
    <overview-heading>
      Recent orders
      <template #link v-if="orders.length > 0">
        <nuxt-link class="link" to="/orders"> view all </nuxt-link>
      </template>
    </overview-heading>
    <data-viewer :loading="load.loading.value" :error="load.error.value">
      <orders-list :orders="orders.slice(0, 5)" v-if="orders.length > 0" />
      <no-data v-else>No orders yet</no-data>
    </data-viewer>
  </div>
</template>

<script setup lang="ts">
import DataViewer from "~/components/DataViewer.vue";
import OrdersList from "~/components/Dashboard/Order/OrdersList.vue";
import OverviewHeading from "~/components/Dashboard/Overview/OverviewHeading.vue";
import NoData from "~/components/Base/NoData.vue";

const { orders, load } = useOrders();
load.execute().catch();
</script>

<style scoped></style>
