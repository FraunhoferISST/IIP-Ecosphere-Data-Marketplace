<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h3>Price model</h3>
      </v-col>
      <v-col cols="12">
        <v-select
          :items="priceModelTypes"
          label="Model type"
          variant="outlined"
          persistent-hint
          density="comfortable"
          item-value="type"
          v-model.number="patch.priceModel.type"
          :hint="priceModelTypeHint"
        >
        </v-select>
      </v-col>
      <v-col cols="12" v-if="patch.priceModel.type === 'subscription'">
        <v-select
          :items="subscriptionPeriods"
          label="Payment period"
          variant="outlined"
          persistent-hint
          density="comfortable"
          v-model.number="patch.priceModel.paymentPeriod"
          :hint="priceModelTypeHint"
        >
        </v-select>
      </v-col>
      <v-col cols="12">
        <h4 class="text-slate-600 font-weight-regular">Usage restrictions</h4>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          type="text"
          label="By volume"
          variant="outlined"
          density="comfortable"
          persistent-hint
          hint="Restricted to specific volume units"
          v-model="patch.priceModel.volume"
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          type="text"
          label="By quantity"
          variant="outlined"
          density="comfortable"
          persistent-hint
          hint="Restricted to specific quantity"
          v-model="patch.priceModel.quantity"
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          type="text"
          label="By time range"
          variant="outlined"
          density="comfortable"
          persistent-hint
          hint="Payment allows usage of an asset in the specified time range"
        />
      </v-col>
    </v-row>
    <v-row
      v-if="
        patch.priceModel.type === 'once' ||
        patch.priceModel.type === 'subscription'
      "
    >
      <v-col cols="12">
        <h3>Price information</h3>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          type="number"
          label="Current price"
          persistent-hint
          hint="Current price displayed as an offer. Mostly lower than the Original price"
          variant="outlined"
          density="comfortable"
          v-model.number="patch.pricing.price"
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          type="number"
          label="Original price"
          variant="outlined"
          hint="This price is displayed as the original price, also known as MSRP"
          persistent-hint
          density="comfortable"
          v-model.number="patch.pricing.compareAtPrice.amount"
        />
      </v-col>
    </v-row>
    <details-save-changes :show="hasChanges" @discard="onDiscardChanges">
      <template #default="{ close }">
        <v-btn
          class="ml-4"
          flat
          color="success"
          variant="flat"
          rounded="lg"
          @click="saveChanges"
        >
          Save changes
        </v-btn>
      </template>
    </details-save-changes>
  </v-container>
</template>

<script setup lang="ts">
import type { ProductVariant } from "@/types";
import DetailsSaveChanges from "~/components/Dashboard/DetailsSaveChanges.vue";
import { useToast } from "vue-toastification";
import { inject } from "vue";

const { data } = defineProps<{
  data: ProductVariant;
}>();

const triggerReload: () => void = inject("triggerReload");

const { update } = useProductVariant(data._id);
const { state, patch, sync, hasChanges, reset } = useEditState<
  Pick<ProductVariant, "pricing" | "priceModel">
>({
  priceModel: data.priceModel,
  pricing: data.pricing,
});

const priceModelTypes: { type: string; title: string; hint: string }[] = [
  {
    type: "free",
    title: "Free",
    hint: "Distribute at no costs",
  },
  {
    type: "once",
    title: "Once",
    hint: "One time payment",
  },
  {
    type: "subscription",
    title: "Subscription",
    hint: "One time payment",
  },
  {
    type: "customQuotes",
    title: "Custom quotes",
    hint: "Individual quotes for customers",
  },
];
const subscriptionPeriods: string[] = [
  "yearly",
  "monthly",
  "weekly",
  "daly",
  "hourly",
];

const priceModelTypeHint = computed<string>(
  () => priceModelTypes.find(({ type }) => type === data.priceModel?.type)?.hint
);

const onDiscardChanges = () => reset();
const saveChanges = () => {
  const priceNotFixed = ["free", "customQuotes"].includes(
    patch.value.priceModel.type
  );
  const pricingPatch = {
    ...patch.value.pricing,
  };
  // should be  0 instead of 1, but reaction backend internal calculations crashes wi Infinity errors
  pricingPatch.price = priceNotFixed ? 0.0001 : patch.value.pricing.price;
  pricingPatch.compareAtPrice.amount = priceNotFixed
    ? 0.0001
    : patch.value.pricing.compareAtPrice.amount;
  return update
    .execute({ ...patch.value, pricing: pricingPatch })
    .then(triggerReload)
    .then(() => {
      sync();
    })
    .then(() => useToast().success("Pricing data updated!"))
    .catch(useError().notify);
};
</script>

<style scoped></style>
