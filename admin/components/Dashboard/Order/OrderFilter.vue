<template>
  <div>
    <filter-provider :filters-count="filtersCount">
      <template #default>
        <h2 class="d-flex align-center">
          <span> Filter assets </span>
          <v-btn
            v-if="filtersCount > 0"
            style="text-transform: capitalize"
            class="ml-6"
            rounded="lg"
            size="x-small"
            variant="text"
            @click="() => resetFilter()"
          >
            reset all
          </v-btn>
        </h2>
        <div class="my-10">
          <div class="filter-title mb-4 d-flex align-center">
            <div class="d-inline-block">Status</div>
          </div>
          <div>
            <v-chip-group
              v-model="state.orderFilters.status"
              @update:modelValue="updateState"
            >
              <v-chip
                density="comfortable"
                v-for="option in orderStatus"
                :key="option"
                label
                color="accent"
                :value="option"
              >
                {{ option }}
              </v-chip>
            </v-chip-group>
          </div>
        </div>
        <div class="my-10">
          <div class="filter-title mb-4 d-flex align-center">
            <div class="d-inline-block">Fulfilment status</div>
          </div>
          <div>
            <v-chip-group
              multiple
              v-model="state.orderFilters.fulfillmentStatus"
              @update:modelValue="updateState"
            >
              <v-chip
                density="comfortable"
                v-for="option in fulfillmentStatus"
                :key="option"
                label
                color="accent"
                :value="option"
              >
                {{ option }}
              </v-chip>
            </v-chip-group>
          </div>
        </div>
      </template>
    </filter-provider>
  </div>
</template>

<script setup lang="ts">
import FilterProvider from "@/components/Base/FilterProvider.vue";
import { OrderFulfillmentStatus, OrderStatus, SearchQuery } from "@/types";
import { computed, ref } from "vue";
import cloneDeep from "lodash.clonedeep";

const { modelValue = {} } = defineProps<{
  modelValue: SearchQuery;
}>();
const emit = defineEmits<{
  (e: "update:modelValue", filter: SearchQuery): void;
}>();

const state = ref<SearchQuery>(cloneDeep(modelValue));
const initialValue = ref<SearchQuery>(cloneDeep(modelValue));
const orderStatus = ref<OrderStatus[]>([
  OrderStatus.New,
  OrderStatus.Processing,
  OrderStatus.Completed,
]);
const fulfillmentStatus = ref<OrderFulfillmentStatus[]>([
  OrderFulfillmentStatus.New,
  OrderFulfillmentStatus.Completed,
  OrderFulfillmentStatus.Processing,
]);

const filtersCount = computed<number>(
  () =>
    Object.keys(state.value).filter((k) =>
      ["isArchived", "isVisible"].includes(k)
    ).length
);

const resetFilter = () => {
  state.value = {
    ...initialValue.value,
  };
  updateState();
};

const getVisibilityOptionTitle = (option: boolean | "undefined"): string => {
  if (option === "undefined") {
    return "Not applied";
  }
  return option ? "Visible" : "Not visible";
};
const getArchivedOptionTitle = (option: boolean | "undefined"): string => {
  if (option === "undefined") {
    return "Not applied";
  }
  return option ? "Archived" : "Not archived";
};

const updateState = () => {
  state.value = {
    ...state.value,
    isVisible:
      state.value?.isVisible === "undefined"
        ? undefined
        : state.value?.isVisible,
    isArchived:
      state.value?.isArchived === "undefined"
        ? undefined
        : state.value?.isArchived,
  };
  emit("update:modelValue", state.value);
};
</script>

<style scoped lang="scss">
.filter-title {
  color: rgb(var(--v-theme-slate-500));
}
</style>
