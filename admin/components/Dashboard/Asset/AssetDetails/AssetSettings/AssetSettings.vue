<template>
  <div>
    <asset-variant-settings v-if="isVariant" :data="data" />
    <asset-product-settings v-else :data="data" />
  </div>
</template>

<script setup lang="ts">
import { Product, ProductVariant } from "~/types";
import { inject } from "vue";
import { Ref } from "@vue/runtime-core";
import AssetVariantSettings from "~/components/Dashboard/Asset/AssetDetails/AssetSettings/AssetVariantSettings.vue";
import AssetProductSettings from "~/components/Dashboard/Asset/AssetDetails/AssetSettings/AssetProductSettings.vue";

const { data } = defineProps<{
  data: Product | ProductVariant;
}>();

const belongsToProduct: Ref<Product> = inject("belongsTo");

const isVariant = computed<boolean>(() => !!belongsToProduct?.value);
</script>

<style scoped></style>
