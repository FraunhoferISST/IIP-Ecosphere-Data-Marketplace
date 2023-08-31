<template>
  <div>
    <overview-heading>
      Recent assets
      <template #link>
        <nuxt-link class="link" to="/assets" v-if="products.length > 0">
          view all
        </nuxt-link>
      </template>
    </overview-heading>
    <data-viewer :loading="load.loading.value" :error="load.error.value">
      <v-container fluid class="pa-0">
        <v-row dense="" v-if="products.length > 0">
          <v-col
            cols="12"
            v-for="product in products.slice(0, 5)"
            :key="product?._id"
          >
            <template v-if="product">
              <product-card :product="product" :product-id="product._id" />
            </template>
            <v-alert color="error" variant="tonal" v-else>
              Product broken :(
            </v-alert>
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col cols="12">
            <no-data class="pa-10 text-center">
              Currently no assets are available in this shop
            </no-data>
          </v-col>
        </v-row>
      </v-container>
    </data-viewer>
  </div>
</template>

<script setup lang="ts">
import DataViewer from "~/components/DataViewer.vue";
import OverviewHeading from "~/components/Dashboard/Overview/OverviewHeading.vue";
import ProductCard from "~/components/Base/ProductCard.vue";
import NoData from "~/components/Base/NoData.vue";

const { products, load } = useProducts();
load.execute();
</script>

<style scoped></style>
