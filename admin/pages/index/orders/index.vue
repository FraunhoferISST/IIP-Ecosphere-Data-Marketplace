<template>
  <div id="dashboard-shop">
    <banner overline="Orders" headline="Review and fulfill orders"> </banner>
    <v-container fluid class="pa-0 mt-10">
      <v-row>
        <v-col cols="6" md="6" lg="8">
          <v-text-field
            label="Search"
            variant="outlined"
            density="comfortable"
            color="accent"
            persistent-hint
            :hint="`Found ${count}`"
            placeholder="Search by Reference ID or customer"
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
            <order-filter class="ml-4" v-model="searchQuery" />
          </div>
        </v-col>
      </v-row>
    </v-container>
    <data-viewer :loading="load.loading.value" :error="load.error.value">
      <v-container fluid class="px-0">
        <v-row>
          <v-col cols="12">
            <orders-list :orders="orders" v-if="orders.length > 0" />
            <v-alert
              v-else
              class="my-8 text-slate-500 text-center"
              variant="tonal"
            >
              No orders yet
            </v-alert>
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
    </data-viewer>
  </div>
</template>

<script setup lang="ts">
import DataViewer from "~/components/DataViewer.vue";
import { useOrders } from "~/composables/useOrders";
import OrdersList from "~/components/Dashboard/Order/OrdersList.vue";
import Banner from "~/components/Base/Banner.vue";
import OrderFilter from "~/components/Dashboard/Order/OrderFilter.vue";
import {
  OrderFulfillmentStatus,
  ProductSortByField,
  SearchQuery,
  SortOrder,
} from "../../../../shared/types";
import { watch } from "vue";

const { orders, load, loadNextPage, page, pages, count } = useOrders();
const searchQuery = ref<SearchQuery>({
  query: "",
  sortBy: ProductSortByField.CreatedAt,
  sortOrder: SortOrder.Desc,
  orderFilters: {
    fulfillmentStatus: [
      OrderFulfillmentStatus.New,
      OrderFulfillmentStatus.Completed,
      OrderFulfillmentStatus.Processing,
    ],
    status: undefined,
  },
});
const sortByItems = [
  {
    title: "Created at",
    value: ProductSortByField.CreatedAt,
  },
];

watch(
  searchQuery,
  () => {
    load.execute(searchQuery.value);
  },
  { deep: true }
);
const isSortOrderDesc = computed<boolean>(
  () => searchQuery.value?.sortOrder === SortOrder.Desc
);

const toggleSortOrder = (): void => {
  searchQuery.value.sortOrder =
    searchQuery.value.sortOrder === SortOrder.Desc
      ? SortOrder.Asc
      : SortOrder.Desc;
};
load.execute(searchQuery.value);
</script>

<style scoped></style>
