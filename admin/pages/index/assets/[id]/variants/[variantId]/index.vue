<template>
  <data-viewer
    :loading="productComp.load.loading.value || variantComp.load.loading.value"
    :error="computedError"
  >
    <asset-details
      v-if="variantComp.variant.value"
      :data="variantComp.variant.value ?? {}"
      @save="onSaveChanges"
      :pages="pages"
    />
  </data-viewer>
</template>

<script setup lang="ts">
import AssetDetails from "~/components/Dashboard/Asset/AssetDetails/AssetDetails.vue";
import DataViewer from "~/components/DataViewer.vue";
import { useToast } from "vue-toastification";
import { provide } from "vue";

const route = useRoute();
const toast = useToast();
const productComp = useProduct(route.params.id as string);
const variantComp = useProductVariant(
  route.params.variantId as string,
  route.params.id as string
);

const loadProductAndVariant = () =>
  productComp.load
    .execute()
    .then(() => variantComp.load.execute(productComp.product.value));

const reloadProductAndVariant = () =>
  productComp.reload
    .execute()
    .then(() => variantComp.reload.execute(productComp.product.value));

provide("triggerReload", () => reloadProductAndVariant());
provide("belongsTo", productComp.product);

const pages = ["Overview", "Pricing", "Distributions"];
const computedError = computed(
  () => productComp.load.error.value ?? variantComp.load.error.value
);
const onSaveChanges = ({ patch }) =>
  variantComp.update
    .execute(patch)
    .then(() => {
      toast.success("Data successfully updated!");
      reloadProductAndVariant();
    })
    .catch((e) => toast.error(e));

loadProductAndVariant();
</script>

<style scoped></style>
