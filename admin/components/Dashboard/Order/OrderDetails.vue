<template>
  <div class="order-details fill-height">
    <data-viewer
      class="fill-height"
      #default
      :loading="load.loading.value"
      :error="load.error.value"
    >
      <section class="order-details-container fill-height">
        <v-container v-if="order" fluid class="px-10">
          <v-row>
            <v-col cols="12" class="pb-0">
              <h3>Ordered items</h3>
            </v-col>
            <v-col cols="12">
              <v-row>
                <v-col
                  cols="12"
                  v-for="item in order.fulfillmentGroups[0].items.nodes"
                >
                  <div class="order-item d-flex justify-space-between py-0">
                    <div>
                      <nuxt-link
                        class="link"
                        :to="`assets/${item.productConfiguration.productId}/variants/${item.productConfiguration.productVariantId}`"
                        target="_blank"
                      >
                        <span class="font-weight-bold">
                          {{ item.title }} -
                          <span>{{ item.variantTitle }}</span>
                        </span>
                      </nuxt-link>
                      <div class="__subtitle">
                        {{ item.attributes[0].label }}
                        {{ item.attributes[0].value }}
                      </div>
                    </div>
                    <div class="__title">
                      {{ item.quantity }} x {{ item.price.displayAmount }}
                      <div class="__subtitle font-weight-light text-right">
                        = {{ item.subtotal.displayAmount }}
                      </div>
                    </div>
                  </div>
                </v-col>
                <v-col cols="12">
                  <div
                    class="order-item py-4 d-flex justify-end"
                    style="border-top: 2px solid rgb(var(--v-theme-slate-100))"
                  >
                    <div>
                      <div class="text-right">
                        <div class="__subtitle">
                          Subtotal:
                          <span class="__title">
                            {{ order.summary.itemTotal.displayAmount }}
                          </span>
                        </div>
                      </div>
                      <div class="text-right">
                        <div class="__subtitle">
                          Fulfillment:
                          <span class="__title">
                            {{ order.summary.fulfillmentTotal.displayAmount }}
                          </span>
                        </div>
                      </div>
                      <div class="text-right">
                        <div class="__subtitle">
                          Taxes:
                          <span class="__title">
                            {{ order.summary.taxTotal.displayAmount }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="order-item pt-4 d-flex justify-space-between"
                    style="border-top: 2px solid rgb(var(--v-theme-slate-100))"
                  >
                    <div>
                      <a
                        type="button"
                        class="v-btn v-theme--customTheme text-accent v-btn--density-default v-btn--size-default v-btn--variant-text pl-0"
                        :href="`data:application/pdf;base64,${invoice}`"
                        :download="`${order.referenceId}-invoice.pdf`"
                      >
                        Invoice
                        <v-icon class="ml-2"> download </v-icon>
                      </a>
                    </div>
                    <div class="text-right">
                      <div class="__subtitle">
                        Payment by
                        <span class="font-weight-bold">
                          {{ order.payments[0].displayName }}
                          -
                        </span>
                        <v-chip label :color="isPaid ? 'green' : 'accent'">
                          <v-icon v-if="isPaid" size="small" class="mr-1 mb-1">
                            check_circle_outline
                          </v-icon>
                          <b>{{ order.summary.total.displayAmount }}</b>
                        </v-chip>
                        <span
                          v-if="isPaid"
                          class="d-block mt-1"
                          style="font-size: 0.7rem"
                        >
                          Marked as paid by customer
                        </span>
                      </div>
                      <div class="__subtitle mt-2">
                        TransactionID:
                        <v-chip label size="x-small">
                          {{ order.payments[0].transactionId }}
                        </v-chip>
                      </div>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row class="my-10">
            <v-col cols="12">
              <h3>Customer</h3>
            </v-col>
            <v-col cols="12">
              <account-card dense :account="order.account" :index="0" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <h3>Billing address</h3>
            </v-col>
            <v-col cols="12">
              <address-card :address="billingAddress" :interactive="false" />
            </v-col>
          </v-row>
          <v-container
            fluid
            class="px-0 pb-6 bg-white elevation-0"
            style="border-radius: 0 0 8px 8px"
          >
            <v-row>
              <v-col cols="12">
                <order-status
                  class="mt-6"
                  size="60px"
                  :items="orderStatusSteps"
                />
              </v-col>
              <v-col cols="12" class="mt-6">
                <v-btn
                  v-if="!isPaymentApproved"
                  variant="flat"
                  color="accent"
                  rounded="lg"
                  block
                  @click="() => approveAndCapturePayments()"
                >
                  Approve and capture payments
                </v-btn>
                <v-btn
                  v-if="isPaymentApproved"
                  :variant="isCompleted ? 'tonal' : 'flat'"
                  :color="isCompleted ? 'success' : 'accent'"
                  rounded="lg"
                  block
                  @click="toggleFulfillmentForm"
                >
                  <b v-if="!isCompleted">Fulfill order</b>
                  <b v-else>Update fulfillment</b>
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-container>
        <v-expand-x-transition>
          <v-container fluid v-if="showFulfillmentForm" class="px-10">
            <v-row>
              <v-col cols="12">
                <order-fulfillment
                  :order="order"
                  @cancel="toggleFulfillmentForm"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-expand-x-transition>
      </section>
    </data-viewer>
  </div>
</template>

<script setup lang="ts">
import DataViewer from "~/components/DataViewer.vue";
import { Address } from "~/types";
import { useToast } from "vue-toastification";
import OrderStatus from "~/components/Dashboard/Order/OrderStatus.vue";
import AddressCard from "~/components/Dashboard/AddressCard.vue";
import AccountCard from "~/components/Base/AccountCard.vue";
import OrderFulfillment from "~/components/Dashboard/Order/OrderFulfillment.vue";

const { id } = defineProps<{
  id: string;
}>();

const {
  order,
  invoice,
  load,
  approvePayments,
  capturePayments,
  updateFulfillmentOptions,
  loadInvoice,
} = useOrder(id);

const showFulfillmentForm = ref<boolean>(false);

const billingAddress = computed<Address>(
  () => order.value.payments[0].billingAddress
);
const isPaid = computed<boolean>(
  () => order.value.payments[0].userMarkedAsPaid
);
const isPaymentApproved = computed<boolean>(
  () => order.value.payments[0].status === "completed"
);
const isCompleted = computed<boolean>(
  () => order.value.status === "coreOrderWorkflow/completed"
);
const orderStatusSteps = computed(() =>
  [
    {
      title: "Ordered",
      icon: "shopping_basket",
      done: true,
    },
    {
      title: "Paid",
      icon: "paid",
      done: isPaid.value,
    },
    {
      title: "Payment approved",
      icon: "verified",
      done: isPaymentApproved.value,
    },
    {
      title: "Fulfilled",
      icon: "done_all",
      done: isCompleted.value,
    },
  ].map((step, index) => ({
    id: index,
    ...step,
  }))
);

const handleActionError = (error) =>
  useToast().error(error?.response?.data?.message);

const handleActionSuccess = () => {
  load.execute();
  useToast().success("Successfully updated!");
};
const approveAndCapturePayments = () => {
  approvePayments
    .execute({
      orderId: order.value._id,
      paymentIds: order.value.payments.map(({ _id }) => _id),
    })
    .then(() =>
      capturePayments.execute({
        orderId: order.value._id,
        paymentIds: order.value.payments.map(({ _id }) => _id),
      })
    )
    .then(() =>
      updateFulfillmentOptions.execute({
        orderId: order.value._id,
        orderFulfillmentGroupId: order.value.fulfillmentGroups[0]._id,
      })
    )
    .then(handleActionSuccess)
    .catch(handleActionError);
};
const toggleFulfillmentForm = (completed = false) => {
  showFulfillmentForm.value = !showFulfillmentForm.value;
  if (completed) {
    load.execute();
  }
};

load.execute();
loadInvoice.execute({});
</script>

<style scoped lang="scss">
.order-details-container {
  display: grid;
  grid-template-columns: minmax(300px, 600px) 1fr;
}
.__title {
  font-weight: bold;
  color: black;
}
.__subtitle {
  color: rgb(var(--v-theme-slate-500));
}
</style>
