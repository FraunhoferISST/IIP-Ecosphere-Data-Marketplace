<template>
  <div
    class="table-list-row __header"
    :style="{ gridTemplateColumns: gridTemplate }"
  >
    <slot>
      <span
        class="__header-item"
        :class="{ '__sort-active': isSortByActive(header.prop) }"
        v-for="header in headers"
        :key="header"
        @click="() => setSortBy(header.prop)"
      >
        {{ header.title }}
        <span class="__icon">
          <v-icon :color="isSortByActive(header.prop) ? 'accent' : 'default'">
            {{
              isSortAscending && isSortByActive(header.prop)
                ? "arrow_drop_up"
                : "arrow_drop_down"
            }}
          </v-icon>
        </span>
      </span>
    </slot>
  </div>
</template>

<script setup lang="ts">
import type { SortBy } from "@/types";
import { computed, ref } from "vue";
const {
  modelValue,
  headers,
  gridTemplate = "repeat(6, 1fr)",
} = defineProps<{
  headers: { title: string; prop?: string };
  modelValue?: SortBy;
  gridTemplate?: boolean;
}>();
const emit = defineEmits<{
  (e: "update:modelValue", sortBy: SortBy): void;
}>();
const sortBy = ref<SortBy | undefined>(modelValue);
const isSortAscending = computed<boolean>(() => !!sortBy.value?.asc);
const setSortBy = (property: string) => {
  sortBy.value = {
    property: property,
    asc: sortBy.value?.property === property ? !sortBy.value?.asc : false,
  };
  emit("update:modelValue", sortBy.value);
};
const isSortByActive = (property: string): boolean =>
  sortBy.value?.property === property;
</script>

<style scoped lang="scss">
.table-list-row {
  display: grid;
  gap: 16px;
  padding: 15px;
  &.__header {
    font-size: 1rem;
    background-color: rgb(var(--v-theme-slate-50));
    color: rgb(var(--v-theme-slate-500));
    border-bottom: 2px solid rgb(var(--v-theme-slate-100));
  }
}
.__header-item {
  cursor: pointer;
  &:hover {
    .__icon {
      opacity: 1;
    }
  }
  .__icon {
    opacity: 0;
  }
  &.__sort-active {
    .__icon {
      opacity: 1;
    }
  }
}
</style>
