<template>
  <div>
    <table-list :data="tableData" :gridTemplate="tableGridTemplate">
      <template #row="{ item, index }">
        <table-list-cell>
          <template #title>
            {{ item.title }}
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
            <v-chip
              label
              size="small"
              :color="!item.published ? 'warning' : 'success'"
            >
              {{ item.published ? "Published" : "Pending" }}
            </v-chip>
          </template>
        </table-list-cell>

        <table-list-cell>
          <template #title>
            <v-btn
              color="accent"
              icon="more_vert"
              variant="tonal"
              rounded
              size="small"
              @click="() => showDetails(item)"
            >
            </v-btn>
          </template>
        </table-list-cell>
      </template>
    </table-list>

    <overlay-sidebar
      v-model:show="showInquiryDetails"
      :styles="{ width: 'unset' }"
    >
      <template #close="{ close }">
        <section-heading style="font-size: 1.6rem">
          Inquiry Details
          <template #arrow>
            <v-btn class="mr-6" flat icon="arrow_back" @click="close" />
          </template>
        </section-heading>
        <div v-if="selectedInquiry" class="order-id ml-16 pl-5 text-slate-400">
          {{ selectedInquiry._id }}
        </div>
      </template>
      <inquiry-details
        :id="selectedInquiry._id"
        v-model:show="showInquiryDetails"
        :key="selectedInquiry._id"
      />
    </overlay-sidebar>
  </div>
</template>

<script setup lang="ts">
import TableList from "~/components/Base/TableList/TableList.vue";
import TableListCell from "~/components/Base/TableList/TableListCell.vue";
import DateDisplay from "~/components/Base/DateDisplay.vue";
import { Inquiry } from "../../../../shared/types";
import AccountCard from "~/components/Base/AccountCard.vue";
import OverlaySidebar from "~/components/Base/OverlaySidebar.vue";
import SectionHeading from "~/components/Base/SectionHeading.vue";
import InquiryDetails from "~/components/Dashboard/Inquiry/InquiryDetails.vue";

const { inquiries } = defineProps<{
  inquiries: Inquiry[];
}>();

const selectedInquiry = ref(inquiries[0]);
const showInquiryDetails = ref<boolean>(false);
const tableGridTemplate = `repeat(4, 1fr) 40px`;
const tableData = computed(() => ({
  headers: [
    {
      title: "Title",
      prop: "title",
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
      title: "Status",
      prop: "published",
    },
  ],
  items: inquiries,
}));

const showDetails = (inquiryToSelect: Inquiry) => {
  selectedInquiry.value = inquiryToSelect;
  showInquiryDetails.value = true;
};
</script>

<style scoped></style>
