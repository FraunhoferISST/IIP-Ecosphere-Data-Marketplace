<template>
  <div class="table-list">
    <div class="table-list-container" :style="{ minWidth: minWidth }">
      <slot name="header">
        <table-list-header
          v-model="computedSortBy"
          :headers="data.headers"
          :grid-template="gridTemplate"
        />
      </slot>
      <table-list-row
        v-for="(item, i) in data.items"
        :key="i"
        :expanded="expandedRowIndex === i"
        :grid-template="gridTemplate"
      >
        <slot name="row" :item="item" :index="i">
          <table-list-cell v-for="(header, n) in data.headers" :key="n">
            <template #title>
              {{ item[header.prop] }}
            </template>
          </table-list-cell>
        </slot>
        <template #expansion>
          <slot name="expansion" :item="item" :index="i"> </slot>
        </template>
      </table-list-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import TableListHeader from "@/components/Base/TableList/TableListHeader.vue";
import TableListRow from "@/components/Base/TableList/TableListRow.vue";
import TableListCell from "@/components/Base/TableList/TableListCell.vue";
import type { SortBy } from "@/types";
import { computed } from "vue";

const {
  data,
  sortBy,
  gridTemplate,
  expandedRowIndex,
  minWidth = "900px",
} = defineProps<{
  data: {
    headers?: { title: string; prop?: string }[];
    items?: object[];
  };
  gridTemplate?: boolean;
  expandedRowIndex?: number;
  minWidth?: string;
  sortBy?: SortBy;
}>();
const emit = defineEmits<{
  (e: "update:sortBy", sortBy: SortBy | undefined): void;
}>();

const computedSortBy = computed<SortBy | undefined>({
  get: () => sortBy,
  set: (val: SortBy | undefined) => emit("update:sortBy", val),
});
</script>

<style scoped lang="scss">
.table-list {
  max-width: 100%;
  overflow-x: auto;
}
.table-list-container {
  min-width: 1520px;
}
</style>
