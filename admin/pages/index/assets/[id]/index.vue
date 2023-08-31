<template>
  <data-viewer
    :loading="load.loading.value && !product"
    :error="load.error.value"
  >
    <asset-details
      :data="product || {}"
      :routes="routes"
      @save="onSaveChanges"
    />
  </data-viewer>
</template>

<script setup lang="ts">
import AssetDetails from "~/components/Dashboard/Asset/AssetDetails/AssetDetails.vue";
import DataViewer from "~/components/DataViewer.vue";
import { useToast } from "vue-toastification";
import { provide } from "vue";

const { product, load, reload, update } = useProduct(
  useRoute().params.id as string
);

provide("triggerReload", () => reload.execute());

const routes = [
  {
    title: "Overview",
    icon: "short_text",
    name: "entity_details_general",
  },
  {
    title: "History",
    icon: "history",
    name: "entity_details_history",
  },
  {
    title: "Reviews",
    icon: "question_answer",
    name: "entity_details_reviews",
  },
  {
    title: "Data Network",
    icon: "insights",
    name: "entity_details_datanetwork",
  },
];

const onSaveChanges = ({ patch, close }) =>
  update
    .execute(patch)
    .then(() => {
      useToast().success("Data updated!");
    })
    .then(reload.execute)
    .then(close)
    .catch((e) => useError().notify(e));

load.execute();
</script>

<style scoped></style>
