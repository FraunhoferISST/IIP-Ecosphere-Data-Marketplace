<template>
  <data-viewer :loading="loading" :error="error">
    <v-tabs
      v-model="tab"
      background-color="transparent"
      show-arrows
      slider-color="primary"
    >
      <v-tab v-for="(option, i) in orderFulfillmentOptions" :key="i">
        {{ option.variantTitle ?? "SUka" }}
      </v-tab>
    </v-tabs>
    <v-alert v-if="selectedOption" class="my-8 text-slate-500" variant="tonal">
      The variant <b>{{ selectedOption.variantTitle }}</b> was ordered
      {{ selectedOption?.quantity }} times and has
      {{ selectedOption.distributionsGroups?.length }} distribution.
      <b>
        At least
        {{
          selectedOption?.quantity * selectedOption.distributionsGroups?.length
        }}
      </b>
      distributions with corresponding access credentials need to be provided to
      fulfill the order!
    </v-alert>
    <v-window v-model="tab">
      <v-window-item v-for="(config, i) in orderFulfillmentOptions" :key="i">
        <v-container fluid class="pa-0">
          <v-row
            class="mb-6"
            v-for="(group, n) in config.distributionsGroups"
            :key="i"
          >
            <v-col cols="12">
              <h4>
                {{ group.title }}
              </h4>
            </v-col>
            <v-col cols="12">
              <v-row dense>
                <v-col
                  cols="12"
                  md="4"
                  v-for="(dist, m) in group.distributions"
                  :key="i"
                >
                  <distribution-card :distribution="dist">
                    <template #action="{ distribution, valid, close }">
                      <v-btn
                        size="large"
                        color="primary"
                        variant="flat"
                        rounded="lg"
                        flat
                        :disabled="!valid"
                        @click="
                          () =>
                            saveFulfillmentDistribution(
                              distribution,
                              i,
                              n,
                              m,
                              close
                            )
                        "
                      >
                        Save distribution
                      </v-btn>
                    </template>
                    <template #remove><span></span></template>
                    <template #clone><span></span></template>
                  </distribution-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-window-item>
    </v-window>
    <v-container class="pa-0">
      <v-row>
        <v-col cols="12" class="d-flex justify-end">
          <v-btn
            class="mr-6"
            variant="flat"
            rounded="lg"
            size="large"
            :loading="createFulfillment.loading.value"
            @click="() => emit('cancel')"
          >
            close
          </v-btn>
          <v-menu>
            <template #activator="{ props }">
              <v-btn
                variant="flat"
                color="primary"
                rounded="lg"
                size="large"
                v-bind="props"
                :loading="createFulfillment.loading.value"
                append-icon="expand_more"
              >
                {{ fulfillment ? "update fulfillment" : "create fulfillment" }}
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="() => createOrderFulfillment(true)">
                <v-list-item-title>Save and complete</v-list-item-title>
              </v-list-item>
              <v-list-item @click="() => createOrderFulfillment(false)">
                <v-list-item-title>Save as draft</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
    </v-container>
  </data-viewer>
</template>

<script setup lang="ts">
import type {
  Distribution,
  FulfillmentDistribution,
  Order,
  OrderFulfilmentOption,
  ProductVariant,
} from "~/types";
import DataViewer from "~/components/DataViewer.vue";
import DistributionCard from "~/components/Dashboard/DistributionCard.vue";
import { useToast } from "vue-toastification";

const { order } = defineProps<{
  order: Order;
}>();

const emit = defineEmits<{
  (e: "cancel", completed: boolean): void;
}>();

const { update, fulfillment, loadFulfillment, createFulfillment } = useOrder(
  order._id,
  order.referenceId
);

interface OrderFulfilmentOptionLocal extends OrderFulfilmentOption {
  variant?: ProductVariant;
}

const orderFulfillmentOptions = ref<OrderFulfilmentOptionLocal[]>([]);
const tab = ref<number>(0);
const loading = ref<boolean>(true);
const error = ref<unknown>(null);

const selectedOption = computed(() => orderFulfillmentOptions.value[tab.value]);

onMounted(() =>
  initForm()
    .catch((e) => (error.value = e))
    .finally(() => (loading.value = false))
);

const initForm = async () => {
  await loadFulfillment.execute();
  if (fulfillment.value) {
    orderFulfillmentOptions.value = fulfillment.value;
  } else {
    const orderedVariants = order.fulfillmentGroups[0].items.nodes;
    for (const orderVariant of orderedVariants) {
      const orderedQuantity: number = orderVariant.quantity;

      const { product, load } = useProduct(
        orderVariant.productConfiguration.productId
      );
      await load.execute();

      const { variant, load: loadVariant } = useProductVariant(
        orderVariant.productConfiguration.productVariantId,
        orderVariant.productConfiguration.productVariantId
      );
      await loadVariant.execute(product.value);

      orderFulfillmentOptions.value.push({
        variant: variant.value,
        variantId: variant.value._id,
        productId: product.value._id,
        variantTitle: variant.value.title,
        quantity: orderedQuantity,
        distributionsGroups: variant.value.distributions.map(
          (dist: Distribution) => ({
            title: dist.title,
            distributions: [...Array(orderedQuantity).keys()].map(
              () => ({ ...dist, accessUrl: "" } as FulfillmentDistribution)
            ),
          })
        ),
      });
    }
  }
};
const saveFulfillmentDistribution = (
  distribution: FulfillmentDistribution,
  i: number,
  n: number,
  m: number,
  close
) => {
  orderFulfillmentOptions.value[i].distributionsGroups[n].distributions[m] = {
    ...distribution,
  };
  close();
};
const createOrderFulfillment = (completed = false) => {
  createFulfillment
    .execute({
      orderId: order._id,
      fulfillment: orderFulfillmentOptions.value.map(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ({ variant, ...rest }) => rest
      ),
    })
    .then(async () => {
      if (completed) {
        await update.execute({ status: "coreOrderWorkflow/completed" });
        useToast().success("Fulfillment successfully created! Order completed");
        return emit("cancel", completed);
      }
      return useToast().success("Fulfillment successfully saved as draft!");
    });
};
</script>

<style scoped></style>
