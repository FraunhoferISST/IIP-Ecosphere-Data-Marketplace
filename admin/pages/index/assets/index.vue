<template>
  <div id="dashboard-products">
    <div class="mb-10" style="position: relative">
      <banner
        overline="assets"
        headline="Manage your assets"
        caption="Here you can offer your digital assets as products of your shop. Create new assets with variants and publish them in your shop"
      >
        <template #action>
          <div class="d-flex justify-end mt-7 px-4">
            <v-btn
              to="/assets/create"
              color="accent"
              rounded="lg"
              size="large"
              flat
            >
              Create new asset
            </v-btn>
          </div>
        </template>
      </banner>
      <asset-import-export />
    </div>
    <v-container fluid class="pa-0">
      <v-row>
        <v-col cols="6" md="6" lg="8">
          <v-text-field
            label="Search"
            variant="outlined"
            density="comfortable"
            color="accent"
            persistent-hint
            :hint="`Found ${count}`"
            v-model="searchQuery.query"
          >
          </v-text-field>
        </v-col>
        <v-col cols="6" md="6" lg="4">
          <div class="d-flex">
            <v-select
              variant="outlined"
              density="comfortable"
              label="Sort by"
              :items="sortByItems"
              color="accent"
              v-model="searchQuery.sortBy"
            >
            </v-select>
            <v-btn
              class="ml-1"
              variant="outlined"
              :icon="isSortOrderDesc ? 'south' : 'north'"
              color="secondary"
              rounded="s-sm e-sm"
              @click="toggleSortOrder"
            >
            </v-btn>
            <asset-filter class="ml-4" v-model="searchQuery" />
          </div>
        </v-col>
      </v-row>
    </v-container>
    <data-viewer :loading="load.loading.value" :error="load.error.value">
      <template #default>
        <v-container fluid class="pa-0">
          <v-row dense="" v-if="computedProducts.length > 0">
            <v-col
              cols="12"
              v-for="product in computedProducts"
              :key="product?._id"
            >
              <template v-if="product">
                <product-card
                  :product="product"
                  :product-id="product._id"
                  :actions="actions"
                />
              </template>
              <v-alert color="error" variant="tonal" v-else>
                Product broken :(
              </v-alert>
            </v-col>
          </v-row>
          <v-row v-else>
            <v-col cols="12">
              <no-data class="pa-10 text-center">
                We couldn't find any asset. Adjust the search criteria or start
                by creating a new assets if you haven't already.
              </no-data>
            </v-col>
          </v-row>
          <v-row class="mt-15" v-if="page < pages">
            <v-col cols="12" class="d-flex justify-center">
              <div>
                <p class="text-center text-slate-500 text-subtitle-2 mb-2">
                  {{ page }}/{{ pages }}
                </p>
                <v-btn
                  variant="tonal"
                  color="accent"
                  size="small"
                  @click="() => loadNextPage.execute()"
                  :loading="loadNextPage.loading.value"
                >
                  load next page
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </template>
    </data-viewer>
  </div>
</template>
<script setup lang="ts">
import DataViewer from "~/components/DataViewer.vue";
import ProductCard from "~/components/Base/ProductCard.vue";
import Banner from "~/components/Base/Banner.vue";
import NoData from "~/components/Base/NoData.vue";
import { Product, ProductSortByField, SearchQuery, SortOrder } from "~/types";
import { useToast } from "vue-toastification";
import AssetImportExport from "~/components/Dashboard/Asset/AssetImportExport.vue";
import { watch } from "vue";
import AssetFilter from "~/components/Dashboard/Asset/AssetFilter.vue";

const { products, load, loadNextPage, page, pages, count } = useProducts();
const toast = useToast();
const { notify } = useError();

const searchQuery = ref<SearchQuery>({
  query: "",
  sortBy: ProductSortByField.CreatedAt,
  sortOrder: SortOrder.Desc,
  isArchived: false,
  isVisible: undefined,
});
const sortByItems = [
  {
    title: "Title",
    value: ProductSortByField.Title,
  },
  {
    title: "Created at",
    value: ProductSortByField.CreatedAt,
  },
  {
    title: "Updated at",
    value: ProductSortByField.UpdatedAt,
  },
];

watch(
  searchQuery,
  () => {
    load.execute(searchQuery.value);
  },
  { deep: true }
);
const computedProducts = computed<Product[]>(() => products.value);
const isSortOrderDesc = computed<boolean>(
  () => searchQuery.value?.sortOrder === SortOrder.Desc
);

const toggleSortOrder = (): void => {
  searchQuery.value.sortOrder =
    searchQuery.value.sortOrder === SortOrder.Desc
      ? SortOrder.Asc
      : SortOrder.Desc;
};
const handleActionError = (error) => notify(error);
const handleActionSuccess = () => {
  load.execute();
  toast.success("Successfully updated!");
};
const actions = ref([
  {
    title: "Make visible",
    handler: (p) =>
      useProduct(p._id)
        .update.execute({ isVisible: true })
        .then(handleActionSuccess)
        .catch(handleActionError),
  },
  {
    title: "Hide",
    handler: (p) =>
      useProduct(p._id)
        .update.execute({ isVisible: false })
        .then(handleActionSuccess)
        .catch((err) => handleActionError(err)),
  },
  {
    title: "Publish",
    handler: (p) =>
      useProduct(p._id)
        .publish.execute()
        .then(handleActionSuccess)
        .catch(handleActionError),
  },
]);

load.execute(searchQuery.value);
</script>

<style lang="scss" scoped></style>
