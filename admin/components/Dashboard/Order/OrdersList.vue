<template>
  <div>
    <table-list
      :data="tableData"
      :gridTemplate="tableGridTemplate"
      :expanded-row-index="expandedIndex"
    >
      <template #row="{ item, index }">
        <table-list-cell>
          <template #title>
            {{ item.referenceId }}
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
            <date-display :date="item.createdAt" format="dd.MM.yyyy" />
          </template>
          <template #subtitle>
            <date-display :date="item.createdAt" format="HH:mm" />
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
          <template #title> {{ item.totalItemQuantity }} </template>
        </table-list-cell>

        <table-list-cell>
          <template #title>
            <v-chip label size="small" :color="statusColorMap[item.status]">
              <v-icon
                class="mr-2"
                v-if="item.status === 'coreOrderWorkflow/completed'"
              >
                check_circle
              </v-icon>
              <b>
                {{ getOrderStatus(item.status) }}
              </b>
            </v-chip>
          </template>
        </table-list-cell>

        <table-list-cell>
          <template #title>
            {{ item.summary.total.displayAmount }}
            <div v-if="item.payments[0].userMarkedAsPaid">
              <v-chip
                color="success"
                label
                size="x-small"
                class="font-weight-bold"
              >
                <v-icon size="small">done</v-icon>
                <span class="ml-2"> Paid</span>
              </v-chip>
            </div>
          </template>
        </table-list-cell>

        <table-list-cell>
          <template #title>
            <div class="d-flex align-center">
              <v-btn
                color="accent"
                icon="more_vert"
                variant="tonal"
                rounded
                size="small"
                @click="() => showDetails(item)"
              >
              </v-btn>
            </div>
          </template>
        </table-list-cell>
      </template>
      <template #expansion="{ item, index }">
        <v-container fluid class="">
          <v-row>
            <v-col
              cols="12"
              v-for="fulfillmentItem in item.fulfillmentGroups[0].items.nodes"
            >
              <div class="order-item d-flex justify-space-between">
                <div>
                  <span class="font-weight-bold">
                    {{ fulfillmentItem.title }} -
                    <span>{{ fulfillmentItem.variantTitle }}</span>
                  </span>
                  <div class="__subtitle">
                    {{ fulfillmentItem.attributes[0].label }}
                    {{ fulfillmentItem.attributes[0].value }}
                  </div>
                </div>
                <div class="__title">
                  {{ fulfillmentItem.quantity }} x
                  {{ fulfillmentItem.price.displayAmount }}
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </template>
    </table-list>
    <overlay-sidebar
      v-model:show="showOrderDetails"
      :styles="{ width: 'unset' }"
    >
      <template #close="{ close }">
        <section-heading style="font-size: 1.6rem">
          Order Details
          <template #arrow>
            <v-btn class="mr-6" flat icon="arrow_back" @click="close" />
          </template>
        </section-heading>
        <div v-if="selectedOrder" class="order-id ml-16 pl-5">
          {{ selectedOrder.referenceId }}
        </div>
      </template>
      <order-details
        :id="selectedOrder._id"
        v-model:show="showOrderDetails"
        :key="selectedOrder._id"
      />
    </overlay-sidebar>
  </div>
</template>

<script setup lang="ts">
import { Order } from "~/types";
import { useTheme } from "vuetify";
import DateDisplay from "~/components/Base/DateDisplay.vue";
import OrderDetails from "~/components/Dashboard/Order/OrderDetails.vue";
import OverlaySidebar from "~/components/Base/OverlaySidebar.vue";
import SectionHeading from "~/components/Base/SectionHeading.vue";
import TableList from "~/components/Base/TableList/TableList.vue";
import TableListCell from "~/components/Base/TableList/TableListCell.vue";
import AccountCard from "~/components/Base/AccountCard.vue";

type SortBy = { property: string; asc: boolean };

const { orders, sortBy = { property: "date", asc: true } } = defineProps<{
  orders: Order[];
  sortBy?: SortBy;
}>();
const colors = useTheme().computedThemes.value.customTheme.colors;

const tableGridTemplate = `repeat(6, 1fr) 40px`;
const expandedIndex = ref<number>(-1);
const selectedOrder = ref<Order | object>(orders[0] ?? {});
const showOrderDetails = ref<boolean>(false);
const tableData = ref({
  headers: [
    {
      title: "id",
      sortBy: "number",
    },
    {
      title: "Date",
      sortBy: "mock",
    },
    {
      title: "Customer",
      sortBy: "createdAt",
    },
    {
      title: "items",
      sortBy: "mock1",
    },
    {
      title: "Status",
      sortBy: "mock2",
    },
    {
      title: "Revenue",
      sortBy: "status",
    },
    {
      title: "",
      sortBy: "",
    },
  ],
  items: orders,
});
const statusColorMap = {
  new: colors.accent,
  "coreOrderWorkflow/processing": colors.accent,
  "coreOrderWorkflow/completed": colors.success,
};

const toggleRowExpansion = (index: number) => {
  if (expandedIndex.value === index) {
    return (expandedIndex.value = -1);
  }
  return (expandedIndex.value = index);
};
const getOrderStatus = (orderStatus: string): string =>
  orderStatus.split("/")[1] ?? orderStatus;
const showDetails = (orderToSelect: Order) => {
  selectedOrder.value = orderToSelect;
  showOrderDetails.value = true;
};
</script>

<style scoped lang="scss">
.order-item {
  font-size: 0.8rem;
}
.order-id {
  font-size: 0.8rem;
  position: relative;
  top: -10px;
  color: rgb(var(--v-theme-slate-500));
}
</style>
