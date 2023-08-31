<template>
  <data-viewer :loading="load.loading.value" :error="load.error.value">
    <v-container class="pa-0" fluid v-if="state">
      <details-save-changes
        :show="hasChanges"
        @save="updateShop"
        @discard="discardChanges"
      />
      <v-row>
        <v-col cols="12" class="mb-6">
          <h3>General shop data</h3>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col cols="12">
          <v-text-field
            variant="outlined"
            density="comfortable"
            bg-color="transparent"
            hide-details
            v-model="state.name"
            name="name"
            type="text"
            label="Edit shop name"
          />
        </v-col>
        <v-col cols="12">
          <v-textarea
            class="mt-6"
            v-model="state.description"
            bg-color="transparent"
            variant="outlined"
            density="comfortable"
            name="description"
            type="text"
            label="Edit description"
          />
        </v-col>
        <v-col cols="12">
          <v-combobox
            variant="outlined"
            label="Add any additional keywords"
            multiple
            density="comfortable"
            v-model="keywordsState"
          >
            <template #chip="{ props, item }">
              <v-chip class="mb-1 mr-1" label v-bind="props">
                {{ item.title }}
              </v-chip>
            </template>
          </v-combobox>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col cols="12" class="mb-6">
          <h3>Shop Emails</h3>
        </v-col>
        <v-col cols="12">
          <shop-emails v-model="state.emails" />
        </v-col>
      </v-row>
      <v-row class="mb-6">
        <v-col cols="12">
          <shop-addresses :shop="shop" />
        </v-col>
      </v-row>
    </v-container>
  </data-viewer>
</template>

<script setup lang="ts">
import DetailsSaveChanges from "~/components/Dashboard/DetailsSaveChanges.vue";
import { useToast } from "vue-toastification";
import DataViewer from "~/components/DataViewer.vue";
import cloneDeep from "lodash.clonedeep";
import { Shop } from "~/types";
import ShopAddresses from "~/components/Dashboard/Shop/ShopAddresses.vue";
import ShopEmails from "~/components/Dashboard/Shop/ShopEmails.vue";
import isEqual from "lodash.isequal";
import { watch } from "vue";

const { shop, load, update } = useShop();

const state = ref<Shop>(cloneDeep(shop.value));
const keywordsState = ref<string[]>(shop.value.keywords?.split(" "));

watch(
  () => shop.value,
  () => {
    state.value = cloneDeep(shop.value);
  }
);

const hasChanges = computed(
  () =>
    Object.entries({
      ...state.value,
      keywords: keywordsState.value ? keywordsState.value.join(" ") : null,
    }).filter(([k, v]) => !isEqual(v, shop.value[k])).length > 0
);

const discardChanges = () => {
  keywordsState.value = shop.value.keywords?.split(" ");
  state.value = JSON.parse(JSON.stringify(shop.value));
};
const createPatch = () => {
  const changes = Object.entries(state.value).filter(
    ([k, v]) => !isEqual(v, shop.value[k])
  );
  return Object.fromEntries(changes);
};
const updateShop = () =>
  update
    .execute({
      ...createPatch(),
      keywords: keywordsState.value ? keywordsState.value.join(" ") : null,
    })
    .then(() => useToast().success("Shop data updated"))
    .catch((e) => useToast().error(e?.response?.data?.message ?? e.toString()));

load.execute().then(() => {
  if (shop.value) {
    state.value = cloneDeep(shop.value);
  } else {
    navigateTo({
      name: "index-shop-create",
    });
  }
});
</script>

<style scoped></style>
