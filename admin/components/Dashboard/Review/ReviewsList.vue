<template>
  <table-list
    :data="tableData"
    :gridTemplate="tableGridTemplate"
    :expanded-row-index="expandedIndex"
  >
    <template #row="{ item, index }">
      <table-list-cell>
        <template #title>
          {{ item._id }}
          <div>
            <v-btn
              size="x-small"
              variant="flat"
              color="transparent"
              :icon="expandedIndex === index ? 'expand_less' : 'expand_more'"
              @click="() => toggleRowExpansion(index)"
            >
            </v-btn>
          </div>
        </template>
      </table-list-cell>

      <table-list-cell>
        <template #title>
          <div class="d-flex">
            <account-card dense :account="item.account" :index="0" />
          </div>
        </template>
      </table-list-cell>

      <table-list-cell>
        <template #title>
          <date-display :date="item.createdAt" format="dd.MM.yyyy" />
        </template>
        <template #subtitle>
          <date-display :date="item.createdAt" format="HH:mm" />
        </template>
      </table-list-cell>

      <table-list-cell>
        <template #title>
          <v-rating
            density="compact"
            size="small"
            color="accent"
            readonly
            v-model="item.reviewRating"
          ></v-rating>
        </template>
      </table-list-cell>

      <table-list-cell>
        <template #title>
          <v-chip
            label
            size="small"
            :color="!item.published ? 'warning' : 'success'"
          >
            {{ item.published ? "Published" : "Pending" }}
          </v-chip>
        </template>
      </table-list-cell>
    </template>
    <template #expansion="{ item, index }">
      <div v-if="item.attributedProductId" class="px-5 pt-5">
        <router-link class="link" :to="`/assets/${item.attributedProductId}`">
          {{ item.attributedProduct?.title }}
        </router-link>
      </div>
      <div class="px-5 pb-5 text-slate-500">
        <p>
          <b>"{{ item.reviewBody }}"</b>
        </p>
      </div>
    </template>
  </table-list>
</template>

<script setup lang="ts">
import TableList from "~/components/Base/TableList/TableList.vue";
import TableListCell from "~/components/Base/TableList/TableListCell.vue";
import DateDisplay from "~/components/Base/DateDisplay.vue";
import { Review } from "~/types";
import AccountCard from "~/components/Base/AccountCard.vue";

const { reviews } = defineProps<{
  reviews: Review[];
}>();

const tableGridTemplate = `200px repeat(4, 1fr)`;
const expandedIndex = ref<number>(-1);
const tableData = computed(() => ({
  headers: [
    {
      title: "ID",
      prop: "_id",
    },
    {
      title: "Author",
      prop: "account",
    },
    {
      title: "Created at",
      prop: "createdAt",
    },
    {
      title: "rating",
      prop: "reviewRating",
    },
    {
      title: "Status",
      prop: "published",
    },
  ],
  items: reviews,
}));

const toggleRowExpansion = (index: number) => {
  if (expandedIndex.value === index) {
    return (expandedIndex.value = -1);
  }
  return (expandedIndex.value = index);
};
</script>

<style scoped></style>
