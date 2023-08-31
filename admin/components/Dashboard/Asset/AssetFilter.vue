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
            <div class="d-inline-block">Visibility</div>
          </div>
          <div>
            <v-chip-group
              v-model="state.isVisible"
              @update:modelValue="updateState"
            >
              <v-chip
                density="comfortable"
                v-for="option in options"
                :key="option"
                label
                color="accent"
                :value="option"
              >
                {{ getVisibilityOptionTitle(option) }}
              </v-chip>
            </v-chip-group>
            <v-chip-group
              active-class="accent"
              v-model="state.isArchived"
              @update:modelValue="updateState"
            >
              <v-chip
                v-for="option in options"
                :key="option"
                color="accent"
                density="comfortable"
                label
                :value="option"
              >
                {{ getArchivedOptionTitle(option) }}
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
import { SearchQuery } from "@/types";
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
const options = ref<[true, false]>([true, false]);

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
  emit("update:modelValue", state.value);
};
</script>

<style scoped lang="scss">
.filter-title {
  color: rgb(var(--v-theme-slate-500));
}
</style>
